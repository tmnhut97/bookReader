import {StyleSheet} from 'react-native';
import { theme } from '../theme';

export const useStyles = () => {
  const styles = StyleSheet.create({
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    modalView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 10,
    },
    closeButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 20,
    },
  });
  return styles;
};
