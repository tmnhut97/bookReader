import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TextStyle,
} from 'react-native';
import { IconProps as RNIconProps } from 'react-native-vector-icons/Icon';
import { getIconByType } from './icon-types';

export type IconProps = Omit<RNIconProps, 'name'> & {
  type?: 'MaterialCommunityIcons';
  source?: ImageSourcePropType;
  name?: string;
  style?: StyleProp<TextStyle> | StyleProp<ImageStyle>;
};

const Icon: React.FC<IconProps> = (props) => {
  const {
    type = 'MaterialCommunityIcons',
    source,
    name,
    style,
    ...iconProps
  } = props;

  if (source) {
    return <Image source={source} style={style as ImageStyle} />;
  }

  if (name) {
    const IconComponent = getIconByType(type);
    return <IconComponent name={name} style={style} {...iconProps}  />;
  }

  return null;
};

export { Icon };