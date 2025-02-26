import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {chapters, sections} from '../../mock/home';

const Section = ({ navigation }) => {

  const renderEmptyList = () => {
    return (
      <View style={styles.emptyStateContainer}>
        <Text style={styles.emptyStateText}>No chapters added yet!</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Section <Icon name={'format-section'} size={20} color="black" />
      </Text>

      {chapters.length === 0 ? (
        renderEmptyList()
      ) : (
        <FlatList
          data={sections}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.listItem}>
              <TouchableOpacity
                style={styles.pageButton}
                // onPress={() => navigation.navigate('Book', {...item}) }
                onPress={() => navigation.navigate('Book', {favoritePage: item.pageNumber}) }
              >

                <Text style={styles.pageText}>{item.title}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

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

export default Section;
