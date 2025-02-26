import React, {useEffect, useState, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  PanResponder, Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Pdf from 'react-native-pdf';
import {useStyles} from './styles';
import {Buffer} from 'buffer';
import {PDFDocument, rgb} from 'pdf-lib';
import Svg, {Rect} from 'react-native-svg';
import { theme } from '../../theme';

const BookScreen = ({route}) => {
  const {favoritePage, source} = route.params || {};
  const styles = useStyles();

  const [currentPage, setCurrentPage] = useState(favoritePage || 1);
  const [bookmarks, setBookmarks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [visiblePages, setVisiblePages] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [highlightMode, setHighlightMode] = useState(false);
  const [modifiedPdfUri, setModifiedPdfUri] = useState(null);

  const [start, setStart] = useState(null);
  console.log('highlights', highlights);
  useEffect(() => {
    const loadData = async () => {
      const storedBookmarks = await AsyncStorage.getItem('bookmarks');
      const storedFavorites = await AsyncStorage.getItem('favorites');
      const storedHighlights = await AsyncStorage.getItem('highlights');

      const parsedBookmarks = JSON.parse(storedBookmarks) || [];
      const parsedFavorites = JSON.parse(storedFavorites) || [];
      const parsedHighlights = JSON.parse(storedHighlights) || [];

      setBookmarks(parsedBookmarks);
      setFavorites(parsedFavorites);
      setHighlights(parsedHighlights);

      if (source === 'favorites' && parsedFavorites.length > 0) {
        const sortedFavorites = parsedFavorites.sort((a, b) => a - b);
        setVisiblePages(sortedFavorites);
        setCurrentPage(sortedFavorites[0]);
      } else if (source === 'bookmarks' && parsedBookmarks.length > 0) {
        const sortedBookmarks = parsedBookmarks.sort((a, b) => a - b);
        setVisiblePages(sortedBookmarks);
        setCurrentPage(sortedBookmarks[0]);
      } else if (source === 'highlights' && parsedHighlights.length > 0) {
        const highlightPages = [
          ...new Set(parsedHighlights.map(h => h.page)),
        ].sort((a, b) => a - b);
        setVisiblePages(highlightPages);
        setCurrentPage(highlightPages[0]);
      } else {
        const lastPage = await AsyncStorage.getItem('lastPage');
        setCurrentPage(lastPage ? parseInt(lastPage, 10) : 1);
      }
    };

    loadData();
  }, [source]);

  const saveHighlights = async newHighlight => {
    try {
      let storedHighlights = await AsyncStorage.getItem('highlights');
      let highlightsArray = storedHighlights
        ? JSON.parse(storedHighlights)
        : [];

      highlightsArray.push(newHighlight);

      await AsyncStorage.setItem('highlights', JSON.stringify(highlightsArray));
      console.log('Highlight saved successfully!');
    } catch (error) {
      console.error('Error saving highlight:', error);
    }
  };

  useEffect(() => {
    if (source === 'fullBook') {
      const saveCurrentPage = async () => {
        await AsyncStorage.setItem('lastPage', currentPage.toString());
      };
      saveCurrentPage();
    }
  }, [currentPage, source]);

  useEffect(() => {
    const saveCurrentPage = async () => {
      await AsyncStorage.setItem('lastPage', currentPage.toString());
    };

    saveCurrentPage();
  }, [currentPage]);

  const saveData = async (key, data) => {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  };

  const toggleItem = (list, setList, item) => {
    const updatedList = list.includes(item)
      ? list.filter(i => i !== item)
      : [...list, item];
    setList(updatedList);
    return updatedList;
  };

  const toggleBookmark = async () => {
    const updatedBookmarks = toggleItem(bookmarks, setBookmarks, currentPage);
    await saveData('bookmarks', updatedBookmarks);
  };

  const toggleFavorite = async () => {
    const updatedFavorites = toggleItem(favorites, setFavorites, currentPage);
    await saveData('favorites', updatedFavorites);
  };

  const goToNextPage = () => {
    if (
      source === 'favorites' ||
      source === 'bookmarks' ||
      source === 'highlights'
    ) {
      const currentIndex = visiblePages.indexOf(currentPage);
      if (currentIndex < visiblePages.length - 1) {
        setCurrentPage(visiblePages[currentIndex + 1]);
      }
    } else {
      if (currentPage < totalPages) {
        setCurrentPage(prevPage => prevPage + 1);
      }
    }
  };

  const goToPreviousPage = () => {
    if (
      source === 'favorites' ||
      source === 'bookmarks' ||
      source === 'highlights'
    ) {
      const currentIndex = visiblePages.indexOf(currentPage);
      if (currentIndex > 0) {
        setCurrentPage(visiblePages[currentIndex - 1]);
      }
    } else {
      if (currentPage > 1) {
        setCurrentPage(prevPage => prevPage - 1);
      }
    }
  };

  const pdfSource = {
    uri: 'https://icseindia.org/document/sample.pdf',
    cache: true,
  };

  const highlightText = async line => {
    try {
      const response = await fetch(pdfSource.uri);
      const pdfBytes = await response.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes, {ignoreEncryption: true});
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      firstPage.drawRectangle({
        ...line,
        color: rgb(1, 1, 0),
        opacity: 0.5,
      });
      const modifiedPdfBytes = await pdfDoc.save();
      const modifiedPdfUri = `data:application/pdf;base64,${Buffer.from(
        modifiedPdfBytes,
      ).toString('base64')}`;

      setModifiedPdfUri(modifiedPdfUri);
      await saveHighlights(line);
    } catch (error) {
      console.error('Error highlighting PDF:', error);
    }
  };
  const newHighlightTimeout = useRef(null);
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: evt => {
      const {locationX, locationY} = evt.nativeEvent;
      setStart({x: locationX, y: locationY});
    },

    onPanResponderMove: evt => {
      if (start) {
        const {locationX, locationY} = evt.nativeEvent;

        const newHighlight = {
          x: Math.min(start.x, locationX),
          y: Math.min(start.y, locationY),
          width: Math.abs(start.x - locationX),
          height: Math.abs(start.y - locationY),
          page: currentPage,
        };

        setHighlights(prev => [...prev, newHighlight]);
        if (newHighlightTimeout.current) {clearTimeout(newHighlightTimeout.current);}

        newHighlightTimeout.current = setTimeout(async () => {
          await highlightText(newHighlight);
        }, 400);
      }
    },

    onPanResponderRelease: async () => {
      setStart(null);
    },
  });

  const toggleHighlightMode = () => {
    setHighlightMode(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleBookmark}>
          <Icon
            name={
              bookmarks.includes(currentPage) ? 'bookmark' : 'bookmark-outline'
            }
            size={30}
            color="#000"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleFavorite}>
          <Icon
            name={favorites.includes(currentPage) ? 'heart' : 'heart-outline'}
            size={30}
            color="#000"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleHighlightMode}>
          <Icon
            name={'fountain-pen'}
            size={30}
            color={highlightMode ? 'black' : 'grey'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <View
        style={styles.content}
        {...(highlightMode ? panResponder.panHandlers : {})}>
        <Pdf
          trustAllCerts={false}
          page={currentPage}
          source={modifiedPdfUri ? {uri: modifiedPdfUri} : pdfSource}
          // style={styles.pdf}
          style={{
            flex: 1,
            width: Dimensions.get('window').height * 0.707,
            height: Dimensions.get('window').height,
          }}
          fitPolicy={1}
          onLoadComplete={numberOfPages => {
            console.log(`Total pages in PDF: ${numberOfPages}`);
            setTotalPages(numberOfPages);
          }}
          onPageChanged={(page, totalPages) => setTotalPages(totalPages)}
          onError={error => {
            console.log(error);
          }}
          renderActivityIndicator={() => (
            <ActivityIndicator color="black" size={'large'} />
          )}
          enableDoubleTapZoom
          scrollEnabled={false}
        />
        <Svg
          style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
          {highlights
            .filter(hl => hl.page === currentPage)
            .map((hl, index) => (
              <Rect
                key={index}
                x={hl.x}
                y={hl.y}
                width={hl.width}
                height={hl.height}
                fill={theme.colors.highlight}
                opacity={0.3}
              />
            ))}
        </Svg>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={goToPreviousPage}
          disabled={currentPage === 1}>
          <Icon
            name="chevron-left"
            size={30}
            color={currentPage === 1 ? '#ccc' : '#000'}
          />
        </TouchableOpacity>
        <Text style={styles.pageNumber}>
          {currentPage} / {totalPages}
        </Text>
        <TouchableOpacity
          onPress={goToNextPage}
          disabled={currentPage === totalPages}>
          <Icon
            name="chevron-right"
            size={30}
            color={currentPage === totalPages ? '#ccc' : '#000'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookScreen;
