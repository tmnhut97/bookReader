import {StyleSheet} from 'react-native';
import { theme } from '../../theme';

export const useStyles = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
    },
    backButton: {
      marginRight: 10,
    },
    headerTitle: {
      fontSize: 25,
      fontWeight: 'bold',
      color: '#000',
    },
    contentContainer: {
      marginTop: 20, 
    },
    input: {
      width: '100%',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 10,
      marginVertical: 8,
      fontSize: 16,
    },
    submitButton: {
      backgroundColor: theme.colors.secondary,
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
    },
    submitButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    footer: {
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
      alignItems: 'center',
      paddingVertical: 10,
      backgroundColor: '#F8F8F8',
      borderTopWidth: 1,
      borderTopColor: '#E0E0E0',
    },
    footerText: {
      fontSize: 16,
      color: '#333',
      fontWeight: 'bold',
    },
    footerContent: {
      fontSize: 14,
      color: '#555',
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    content: {
      fontSize: 16,
      marginBottom: 20,
    },
  });
  return styles;
};
