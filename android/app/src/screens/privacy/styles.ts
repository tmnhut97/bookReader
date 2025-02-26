import {StyleSheet} from 'react-native';

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
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#222',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#444',
      marginTop: 15,
    },
    content: {
      fontSize: 16,
      color: '#555',
      marginBottom: 10,
      lineHeight: 22,
    },
  });
  return styles;
};
