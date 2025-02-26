import React, {useEffect, useState, useRef, useMemo} from 'react';
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
import Svg, {Rect} from 'react-native-svg';
import { theme } from '../../theme';

const BookScreen = ({route}) => {
  const { source, title, pageNumber } = route.params || {};
  const styles = useStyles();
  const [currentPage, setCurrentPage] = useState(pageNumber || 1);
  const [bookmarks, setBookmarks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [visiblePages, setVisiblePages] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [highlightMode, setHighlightMode] = useState(false);
  const [modifiedPdfUri, setModifiedPdfUri] = useState(null);

  const [start, setStart] = useState(null);
  useEffect(() => {
    // AsyncStorage.removeItem('highlights');
    const loadData = async () => {
      try {
        const storedBookmarks = await AsyncStorage.getItem('bookmarks');
        const storedFavorites = await AsyncStorage.getItem('favorites');
        const storedHighlights = await AsyncStorage.getItem('highlights');

        let parsedBookmarks = JSON.parse(storedBookmarks) || [];
        let parsedFavorites = JSON.parse(storedFavorites) || [];
        let parsedHighlights = JSON.parse(storedHighlights) || [];

        console.log("title", title);
        console.log("parsedBookmarks", parsedBookmarks);
        console.log("parsedFavorites", parsedFavorites);
        console.log("parsedHighlights", parsedHighlights);


        setBookmarks(parsedBookmarks);
        setFavorites(parsedFavorites);
        setHighlights(parsedHighlights);

        if (source === 'favorites' && parsedFavorites.length > 0) {
          const sortedFavorites = parsedFavorites.sort((a, b) => a.pageNumber - b.pageNumber);
          setVisiblePages(sortedFavorites);
          setCurrentPage(sortedFavorites[0]);
        } else if (source === 'bookmarks' && parsedBookmarks.length > 0) {
          const sortedBookmarks = parsedBookmarks.sort((a, b) => a.pageNumber - b.pageNumber);
          setVisiblePages(sortedBookmarks);
          setCurrentPage(sortedBookmarks[0]);
        } else if (source === 'highlights' && parsedHighlights.length > 0) {
          const highlightPages = [
            ...new Set(parsedHighlights.map(h => h.pageNumber)),
          ].sort((a, b) => a - b);
          setVisiblePages(highlightPages);
          setCurrentPage(highlightPages[0]);
        } else {
          const lastPage = await AsyncStorage.getItem('lastPage');
          setCurrentPage(lastPage ? parseInt(lastPage, 10) : 1);
        }
      } catch (e) {
        console.log(e)
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
    try {
      if (source === 'fullBook') {
        const saveCurrentPage = async () => {
          await AsyncStorage.setItem('lastPage', currentPage.toString());
        };
        saveCurrentPage();
      }
    } catch (e) {
      console.log(e)
    }
  }, [currentPage, source]);

  useEffect(() => {
    try {
      const saveCurrentPage = async () => {
        await AsyncStorage.setItem('lastPage', currentPage.toString());
      };

      saveCurrentPage();
    } catch (e) {
      console.log(e)
    }
  }, [currentPage]);

  const saveData = async (key, data) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.log(e)
    }
  };

  const toggleItem = (list, setList, item) => {
    try {
      const updatedList = list.includes(item)
        ? list.filter(i => i !== item)
        : [...list, item];
      setList(updatedList);
      return updatedList;
    } catch (e) {
      console.log(e)
    }
  };

  const toggleBookmark = async () => {
    try {
      let updatedBookmarks = [...bookmarks];
      const item = { title, pageNumber: currentPage };
      const check = updatedBookmarks?.find(e => JSON.stringify(e) === JSON.stringify(item));
      console.log(check)
      if (!check || !updatedBookmarks.length) {updatedBookmarks = [...updatedBookmarks, item];}
      else { updatedBookmarks = updatedBookmarks.filter( e => JSON.stringify(e) !== JSON.stringify(item));}
      setBookmarks(updatedBookmarks);
      await saveData('bookmarks', updatedBookmarks);
    } catch (e) {
      console.log(e);
    }
  };

  const toggleFavorite = async () => {
    try {
      let updatedFavorites = [...favorites];
      const item = { title, pageNumber: currentPage };
      const check = updatedFavorites?.find(e => JSON.stringify(e) === JSON.stringify(item));
      if (!check || !updatedFavorites.length) {updatedFavorites = [...updatedFavorites, item];}
      else { updatedFavorites = updatedFavorites.filter( e => JSON.stringify(e) !== JSON.stringify(item));}
      setFavorites(updatedFavorites);
      await saveData('favorites', updatedFavorites);
    } catch (e) {
      console.log(e);
    }
  };

  const waitting = useRef(false)
  const goToNextPage = () => {
    try {
      if (waitting.current) return console.log("Waiting...");
      waitting.current = true
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
    } catch (e) {
      console.log(e);
    }
  };

  const goToPreviousPage = () => {
    try {
      if (waitting.current) return console.log("Waiting...");
      waitting.current = true
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
    } catch (e) {
      console.log(e)
    }
  };

  const pdfSource = {
    uri: 'https://icseindia.org/document/sample.pdf',
    cache: true,
  };
  const removeHighlight = async (x: number, y: number) => {
    try {
      const updatedHighlights = highlights.filter(h => {
        return !(
          x >= h?.x &&
          y >= h?.y &&
          x <= h?.x + h?.width &&
          y <= h?.y + h?.height &&
          h.pageNumber === currentPage
        );
      });

      console.log(updatedHighlights)
      setHighlights(updatedHighlights);
      await AsyncStorage.setItem('highlights', JSON.stringify(updatedHighlights));
    } catch (e) {
      console.log(e)
    }
  };
  const highlightText = async line => {
    try {
      // const response = await fetch(pdfSource.uri);
      // const pdfBytes = await response.arrayBuffer();
      // const pdfDoc = await PDFDocument.load(pdfBytes, {ignoreEncryption: true});
      // const pages = pdfDoc.getPages();
      // const firstPage = pages[0];
      // firstPage.drawRectangle({
      //   ...line,
      //   color: rgb(1, 1, 0.5),
      //   opacity: 0.8,
      // });
      // const modifiedPdfBytes = await pdfDoc.save();
      // const modifiedPdfUri = `data:application/pdf;base64,${Buffer.from(
      //   modifiedPdfBytes,
      // ).toString('base64')}`;
      //
      // setModifiedPdfUri(modifiedPdfUri);
      await saveHighlights(line);
    } catch (error) {
      console.error('Error highlighting PDF:', error);
    }
  };
  // const newHighlightTimeout = useRef(null);
  // const panResponder = PanResponder.create({
  //   onStartShouldSetPanResponder: () => true,
  //   onPanResponderGrant: async evt => {
  //     const {locationX, locationY} = evt.nativeEvent;
  //     if (highlightMode) {
  //       setStart({x: locationX, y: locationY});
  //     }
  //   },
  //
  //   onPanResponderMove: async evt => {
  //     const {locationX, locationY} = evt.nativeEvent;
  //     if (!highlightMode) {
  //       await removeHighlight(locationX, locationY);
  //     }
  //     if (start) {
  //       const newHighlight = {
  //         x: Math.min(start.x, locationX),
  //         y: Math.min(start.y, locationY),
  //         width: Math.abs(start.x - locationX),
  //         height: Math.abs(start.y - locationY) > 50 ? 50 : Math.abs(start.y - locationY),
  //         page: currentPage,
  //       };
  //
  //       // setHighlights(prev => [...prev, newHighlight]);
  //       if (newHighlightTimeout.current) {clearTimeout(newHighlightTimeout.current)}
  //
  //       newHighlightTimeout.current = setTimeout(async () => {
  //         setHighlights(prev => [...prev, newHighlight]);
  //         await highlightText(newHighlight);
  //       }, 300);
  //     }
  //   },
  //
  //   onPanResponderRelease: async () => {
  //     setStart(null);
  //   },
  // });
  const highlightRef = useRef(null)
  const [ highlight, setHighlight ] = useState(null)
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    // onPanResponderGrant: evt => {
    //   setStart({x: locationX, y: locationY});
    // },
    onPanResponderStart: async evt => {
      try {
        const {locationX, locationY} = evt.nativeEvent;
        setStart({x: locationX, y: locationY});
      } catch (e) {
        console.log(e)
      }
    },

    onPanResponderMove: async evt => {
      try {
        const {locationX, locationY} = evt.nativeEvent;
        if (!start) return;
        if (highlightMode) {
          highlightRef.current = {
            x: Math.min(start.x, locationX),
            y: Math.min(start.y, locationY),
            width: Math.abs(start.x - locationX),
            height: Math.abs(start.y - locationY) < 10 ? 10 : Math.abs(start.y - locationY),
            title: title,
            pageNumber: currentPage,
          };
          console.log(highlightRef.current);
          setHighlight(highlightRef.current);
        } else {
          console.log(locationX, locationY)
          await removeHighlight(locationX, locationY);
        }
      } catch (e) {
        console.log(e);
      }
    },

    onPanResponderRelease: async () => {
      try {
        if (highlightMode) {
          setHighlights(prev => [...prev, highlightRef.current]);
          await highlightText(highlightRef.current);
          setStart(null);
          setHighlight(null);
          highlightRef.current = null;
        }
      } catch (e) {
        console.log(e)
      }
    },
  });

  const toggleHighlightMode = () => {
    try {
      setHighlightMode(prev => !prev);
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleBookmark}>
          <Icon
            name={
              bookmarks?.map( e => e.pageNumber).includes(currentPage) ? 'bookmark' : 'bookmark-outline'
            }
            size={30}
            color="#000"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleFavorite}>
          <Icon
            name={favorites?.map( e => e.pageNumber).includes(currentPage) ? 'heart' : 'heart-outline'}
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
        {...panResponder.panHandlers}
      >
        <Pdf
          trustAllCerts={false}
          page={currentPage}
          source={modifiedPdfUri ? {uri: modifiedPdfUri} : pdfSource}
          style={styles.pdf}
          fitPolicy={1}
          onLoadComplete={numberOfPages => {
            console.log(`Total pages in PDF: ${numberOfPages}`);
            setTotalPages(numberOfPages);
          }}
          onPageChanged={(page, totalPages) => {
            setTotalPages(totalPages);
            setTimeout(() => {
              waitting.current = false
            }, 300)
          }}
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
          {highlights?.filter(hl => hl?.pageNumber === currentPage && hl?.title === title)
            .map((hl, index) => (
              <Line key={index} line={hl}/>
            ))}
          {
            highlight && (<Line line={highlight}/>)
          }
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

const Line = ({ line }) => {

  return useMemo(() => {
    return (
      <Rect
        x={line.x}
        y={line.y}
        width={line.width}
        height={line.height}
        fill={theme.colors.highlight}
        opacity={0.8}
      />
    );
  }, [line]);
};

export default BookScreen;
