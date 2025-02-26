import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useStyles} from './styles';
import {useNavigation} from '@react-navigation/native';

const ContactScreen = () => {
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
        <Text style={styles.headerTitle}>Contact Us</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Let's Get In Touch</Text>
        <Text style={styles.content}>
          If you have any questions or need support regarding our eBook reader
          app, feel free to contact us.
        </Text>
        <TextInput style={styles.input} placeholder="Enter your name" />
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your message"
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.content}>support@ebookreader.com</Text>
        <Text style={styles.content}>+1 234 567 890</Text>
      </View>
    </View>
  );
};

export default ContactScreen;
