import React, {useState, useRef, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  TextInput,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Animated} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useStyles} from './styles';
import themeContext from '../../../../../theme/themeContext';

const HomeScreen = ({navigation}) => {
  const styles = useStyles();

  const menuItems = [
    {title: 'Resume', icon: 'book-open-page-variant-outline'},
    {title: 'Chapter', icon: 'file-document-outline'},
    {title: 'Page', icon: 'page-next-outline'},
    {title: 'Section', icon: 'format-section'},
    {title: 'Bookmark', icon: 'bookmark-outline'},
    {title: 'Favorite', icon: 'heart-outline'},
    {title: 'Highlight', icon: 'format-color-highlight'},
  ];
  const theme: any = useContext(themeContext);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedDrawerItem, setSelectedDrawerItem] = useState(null);
  const slideAnim = useRef(new Animated.Value(-250)).current;
  const [chapterModalVisible, setChapterModalVisible] = useState(false);
  const [sectionModalVisible, setSectionModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [pageNumber, setPageNumber] = useState('');
  const [selectedButton, setSelectedButton] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSelect = item => {
    setSelectedDrawerItem(item);
  };
  const toggleSidebar = () => {
    if (sidebarVisible) {
      Animated.timing(slideAnim, {
        toValue: -250,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setSidebarVisible(false));
    } else {
      setSidebarVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  const handleMenuPress = itemName => {
    handleSelect(itemName);
    toggleSidebar();
    if (itemName === 'Home') {
      navigation.navigate('Book', {source: 'fullBook'});
    }
    if (itemName === 'About') {
      navigation.navigate('about');
    }
    if (itemName === 'Contact') {
      navigation.navigate('contact');
    }
    if (itemName === 'Privacy Policy') {
      navigation.navigate('privacy');
    }
  };

  const handlePress = async title => {
    setSelectedButton(title);
    switch (title) {
      case 'Resume':
        try {
          const lastVisitedPage = await AsyncStorage.getItem('lastPage');
          console.log('lastVisitedPage', lastVisitedPage);
          if (lastVisitedPage) {
            navigation.navigate('Book', {
              favoritePage: parseInt(lastVisitedPage, 10),
            });
          } else {
            Alert.alert(
              'No previous page found',
              'You have no page to resume.',
            );
          }
        } catch (error) {
          console.error('Error retrieving last visited page', error);
        }
        break;
      case 'Chapter':
        setChapterModalVisible(true);
        navigation.navigate("Chapter")
        break;
      case 'Page':
        setModalVisible(true);
        break;
      case 'Section':
        setSectionModalVisible(true);
        navigation.navigate("Section")
        break;
      case 'Bookmark':
        navigation.navigate('BookmarkScreen');
        break;
      case 'Favorite':
        navigation.navigate('FavouriteScreen');
        break;
      case 'Highlight':
        try {
          return navigation.navigate('Highlight');
          // const storedHighlights = await AsyncStorage.getItem('highlights');
          // const parsedHighlights = JSON.parse(storedHighlights) || [];
          //
          // if (parsedHighlights.length > 0) {
          //   const highlightPages = [
          //     ...new Set(parsedHighlights.map(h => h.page)),
          //   ].sort((a, b) => a - b);
          //
          //   if (highlightPages.length > 0) {
          //     navigation.navigate('Book', {
          //       favoritePage: highlightPages[0],
          //       source: 'highlights',
          //       visiblePages: highlightPages,
          //     });
          //   }
          // } else {
          //   Alert.alert('No Highlights', 'You have no highlighted pages.');
          // }
        } catch (error) {
          console.error('Error retrieving highlights:', error);
        }
        break;
      default:
        console.log('Unknown button clicked');
    }
  };
  const handleChapterSelect = chapter => {
    navigation.navigate('Book', {favoritePage: chapter.pageNumber});
    setChapterModalVisible(false);
  };
  const handleSectionSelect = section => {
    navigation.navigate('Book', {favoritePage: section.pageNumber});
    setSectionModalVisible(false);
  };
  const handlePageSubmit = () => {
    const page = parseInt(pageNumber, 10);
    if (isNaN(page) || page < 1) {
      Alert.alert('Invalid Page', 'Please enter a valid page number.');
    } else {
      navigation.navigate('Book', {favoritePage: page});
      setModalVisible(false);
    }
  };

  const [themeModalVisible, setThemeModalVisible] = useState(false);

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={30} color={theme.color}onPress={handleMenuPress} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setThemeModalVisible(true)}>
          <Icon name="dots-vertical" size={30} color={theme.color} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.gridContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.card,
              selectedButton === item.title && styles.selectedCard,
            ]}
            onPress={() => handlePress(item.title)}>
            <Icon
              name={item.icon}
              size={50}
              color={selectedButton === item.title ? '#fff' : 'black'}
            />
            <Text
              style={[
                styles.cardText,
                {color: selectedButton === item.title ? '#fff' : 'black'},
              ]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {sidebarVisible && <View style={styles.overlay} />}
      <Animated.View
        style={[styles.sidebar, {transform: [{translateX: slideAnim}]}]}>
        <View style={styles.sidebarHeader}>
          <Icon name="book-open-page-variant-outline" size={40} color="#000" />
          <Text style={styles.title}>E-Book</Text>
          <TouchableOpacity onPress={toggleSidebar}>
            <Icon name="close" size={25} color="#000" />
          </TouchableOpacity>
        </View>
        {[
          {name: 'Home', icon: 'home'},
          // {name: 'About', icon: 'information-outline'},
          // {name: 'Contact', icon: 'phone-outline'},
          {name: "More's Apps", icon: 'location-enter'},
          {name: 'Share', icon: 'share'},
          {name: 'Rate App', icon: 'star'},
          // {name: 'Privacy Policy', icon: 'phone'},
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.sidebarItem,
              selectedDrawerItem === item.name && styles.selectedItem,
            ]}
            onPress={() => handleMenuPress(item.name)}>
            <Icon
              name={item.icon}
              size={24}
              color={selectedDrawerItem === item.name ? '#fff' : '#000'}
            />
            <Text
              style={[
                styles.sidebarText,
                selectedDrawerItem === item.name && styles.selectedText,
              ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </Animated.View>

      {/*<CustomModal*/}
      {/*  visible={chapterModalVisible}*/}
      {/*  onClose={() => setChapterModalVisible(false)}*/}
      {/*  title="Select a Chapter">*/}
      {/*  {chapters.map((chapter, index) => (*/}
      {/*    <TouchableOpacity*/}
      {/*      key={index}*/}
      {/*      style={styles.chapterItem}*/}
      {/*      onPress={() => handleChapterSelect(chapter)}>*/}
      {/*      <Text style={styles.chapterText}>{chapter.title}</Text>*/}
      {/*    </TouchableOpacity>*/}
      {/*  ))}*/}
      {/*</CustomModal>*/}
      {/*<CustomModal*/}
      {/*  visible={sectionModalVisible}*/}
      {/*  onClose={() => setSectionModalVisible(false)}*/}
      {/*  title="Select a Chapter">*/}
      {/*  {sections.map((chapter, index) => (*/}
      {/*    <TouchableOpacity*/}
      {/*      key={index}*/}
      {/*      style={styles.chapterItem}*/}
      {/*      onPress={() => handleSectionSelect(chapter)}>*/}
      {/*      <Text style={styles.chapterText}>{chapter.title}</Text>*/}
      {/*    </TouchableOpacity>*/}
      {/*  ))}*/}
      {/*</CustomModal>*/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <View style={styles.form}>
            <Text style={styles.modalTitle}>Enter Page Number</Text>
            <TextInput
              style={styles.pageInput}
              placeholder="Page number"
              keyboardType="numeric"
              value={pageNumber}
              onChangeText={setPageNumber}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handlePageSubmit}>
              <Text style={styles.buttonText}>Go</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={themeModalVisible}
        onRequestClose={() => setThemeModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent]}>
            {/*<Text style={styles.modalTitle}>Dark Theme</Text>*/}
            {/*<Switch*/}
            {/*  value={isDarkMode}*/}
            {/*  onValueChange={value => {*/}
            {/*    setIsDarkMode(value);*/}
            {/*    EventRegister.emit('ChangeTheme', value);*/}
            {/*  }}*/}
            {/*/>*/}
            <View style={styles.wpThreeDot}>
              {[
                {name: 'About', icon: 'information-outline'},
                {name: 'Contact', icon: 'phone-outline'},
                {name: 'Privacy Policy', icon: 'book'}
              ].map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.sidebarItem, { backgroundColor: theme.backgroundColor},
                    // selectedDrawerItem === item.name && styles.selectedItem,
                  ]}
                  onPress={() => handleMenuPress(item.name)}>
                  <Icon
                    name={item.icon}
                    size={24}
                    // color={selectedDrawerItem === item.name ? '#fff' : '#000'}
                  />
                  <Text
                    style={[
                      styles.sidebarText,
                      // selectedDrawerItem === item.name && styles.selectedText,
                    ]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity onPress={() => setThemeModalVisible(false)}>
              <Text style={styles.modalClose}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
