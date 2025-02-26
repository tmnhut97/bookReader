/**
 * Define types for react native vector icon packages
 * Notes: Whenever add any new fonts here register new
 * font in iOS and Android.
 * Android: Add font name in android/app/build.gradle
    iconFontNames: ['MaterialIcons.ttf']
  iOS: Add font by xcode: https://www.npmjs.com/package/react-native-vector-icons
 */

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * Currently react-native-vector-icons not supporting
 * type prop for use different type of icons.
 * In app need to import different type of icons
 * set to use icons from different categories.
 * For overcome this importing, all types of icons
 * importing here and using type (custom prop) to identify
 * target icon set.
 */

const getIconByType = (type: string) => {
  switch (type) {
    case 'MaterialCommunityIcons':
      return MaterialCommunityIcons;
    default:
      return MaterialCommunityIcons;
  }
};

export {getIconByType};
