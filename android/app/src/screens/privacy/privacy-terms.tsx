import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useStyles} from './styles';
import {useNavigation} from '@react-navigation/native';

const TermsScreen = () => {
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
        <Text style={styles.headerTitle}>Terms & Conditions</Text>
      </View>
      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Welcome to Our eBook Reader</Text>
        <Text style={styles.content}>
          By using this app, you agree to our terms and conditions. Please read
          them carefully.
        </Text>
        <Text style={styles.subtitle}>1. User Agreement</Text>
        <Text style={styles.content}>
          By accessing or using our app, you confirm that you accept these terms
          and conditions.
        </Text>
        <Text style={styles.subtitle}>2. License to Use</Text>
        <Text style={styles.content}>
          The app grants you a limited, non-exclusive, non-transferable license
          to use the eBook reader services.
        </Text>
        <Text style={styles.subtitle}>3. Restrictions</Text>
        <Text style={styles.content}>
          You may not modify, distribute, or attempt to reverse-engineer any
          part of the application.
        </Text>
      </ScrollView>
    </View>
  );
};

export default TermsScreen;
