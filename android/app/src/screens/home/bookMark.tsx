import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const BookmarkScreen = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const storedBookmarks = JSON.parse(await AsyncStorage.getItem('bookmarks')) || [];
      setBookmarks(storedBookmarks);
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    }
  };

  // const removeBookmark = async (pageNumber) => {
  //   try {
  //     const updatedBookmarks = bookmarks.filter(item => item !== pageNumber);
  //     await AsyncStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  //     setBookmarks(updatedBookmarks);
  //   } catch (error) {
  //     console.error('Error removing bookmark:', error);
  //   }
  // };

  const removeBookmark = async (itemRemove) => {
    try {
      const updatedBookmarks = bookmarks.filter(item => JSON.stringify(item) !== JSON.stringify(itemRemove));
      await AsyncStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      setBookmarks(updatedBookmarks);
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  const handleNavigate = (item: object) => {
    try {
      console.log('Navigating to page:', JSON.stringify(item));
      navigation.navigate("Book", {...item});
    } catch (e) {
      console.log(e);
    }
  };
   const renderEmptyList = () => {
      return (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>No bookmark added yet!</Text>
        </View>
      );
    };

  return (
    <View style={styles.container}>
         <Text style={styles.title}>Bookmarks  <Icon name={'bookmark'} size={20} color="black" /></Text>
         {bookmarks.length === 0 ? renderEmptyList() : (
           <FlatList
             data={bookmarks}
             keyExtractor={(item, index) => index.toString()}
             renderItem={({ item }) => (
               <View style={styles.listItem}>
                 <TouchableOpacity style={styles.pageButton} onPress={() => handleNavigate(item)}>
                   <Text style={styles.pageText}>{item?.title} - Page {item?.pageNumber}</Text>
                 </TouchableOpacity>
                 <TouchableOpacity onPress={() => removeBookmark(item)} style={styles.deleteButton}>
                   <Icon name="delete" size={24} color="white" />
                 </TouchableOpacity>
               </View>
             )}
           />
         )}
       </View>
  );
};

export default BookmarkScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 8,
  },
  pageButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  pageText: {
    fontSize: 18,
    color: '#333',
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e63946',
    padding: 8,
    borderRadius: 50,
  },
  emptyStateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#888',
  },
});

