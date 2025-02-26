/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import HomeScreen from './android/app/src/screens/home/homes';
import BookScreen from './android/app/src/screens/book/book';
import Splash from './android/app/src/screens/splash';
import {EventRegister} from 'react-native-event-listeners';
import theme from './theme/theme';
import themeContext from './theme/themeContext';
import BookmarkScreen from './android/app/src/screens/home/bookMark';
import FavouriteScreen from './android/app/src/screens/home/favourite';
import AboutScreen from './android/app/src/screens/about/about';
import TermsScreen from './android/app/src/screens/privacy/privacy-terms';
import ContactScreen from './android/app/src/screens/contact/contact';
import Chapter from './android/app/src/screens/home/Chapter';
import Section from './android/app/src/screens/home/Section';
import Highlight from './android/app/src/screens/home/Highlight';

const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const listener = EventRegister.addEventListener('ChangeTheme', data => {
      setDarkMode(data);
      console.log('data', data);
    });
    return () => {
      EventRegister.removeAllListeners(listener);
    };
  }, [darkMode]);

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <themeContext.Provider
        value={darkMode === true ? theme.dark : theme.light}>
        <NavigationContainer
          theme={darkMode === true ? DarkTheme : DefaultTheme}>
          <Stack.Navigator
            id="stack-nav"
            initialRouteName="Splash"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Book" component={BookScreen} />
            <Stack.Screen name="BookmarkScreen" component={BookmarkScreen} />
            <Stack.Screen name="FavouriteScreen" component={FavouriteScreen} />
            <Stack.Screen name="about" component={AboutScreen} />
            <Stack.Screen name="privacy" component={TermsScreen} />
            <Stack.Screen name="contact" component={ContactScreen} />

            <Stack.Screen name="Chapter" component={Chapter} />
            <Stack.Screen name="Section" component={Section} />
            <Stack.Screen name="Highlight" component={Highlight} />


          </Stack.Navigator>
        </NavigationContainer>
      </themeContext.Provider>
    </>
  );
};

export default App;
