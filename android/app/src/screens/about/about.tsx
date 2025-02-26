import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useStyles} from './styles';
import {useNavigation} from '@react-navigation/native';

const AboutScreen = () => {
  const styles = useStyles();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-left" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About Us</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}> eBook Reader</Text>
        <Text style={styles.content}>
          Our app allows you to seamlessly read and manage your eBooks. You can
          bookmark pages, highlight text, and navigate through your favorite
          books with ease.
        </Text>
        <Text style={styles.title}>Key Features</Text>
        <Text style={styles.content}>
          - Read PDF books with smooth scrolling and navigation.
          {'\n'}- Highlight important text for quick reference.
          {'\n'}- Bookmark pages and save your reading progress.
          {'\n'}- User-friendly interface for an enjoyable reading experience.
        </Text>
      </View>
    </View>
  );
};

export default AboutScreen;
