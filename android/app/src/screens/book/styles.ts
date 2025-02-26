import {Dimensions, StyleSheet} from 'react-native';

export const useStyles = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    highlightBox: {
      backgroundColor: 'yellow', // Highlight effect
      opacity: 0.6,
      position: 'absolute',
      padding: 5,
      borderRadius: 5,
    },

    highlightText: {
      fontWeight: 'bold',
      color: 'black',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject, // Makes the overlay fill the entire container
      backgroundColor: 'transparent', // Transparent background for the overlay
    },
    divider: {
      height: 1,
      backgroundColor: '#ccc',
      marginVertical: 10,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 16,
      textAlign: 'justify',
      lineHeight: 24,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
    },
    pageNumber: {
      backgroundColor: '#FFFFFF',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
      color: '#000',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      elevation: 3,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 2,
      shadowOffset: {width: 0, height: 1},
    },

    pdfContainer: {
      flex: 1,
      position: 'relative',
    },
    highlight: {
      opacity: 0.5,
      borderRadius: 2,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    colorPickerContainer: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      width: '80%',
      maxWidth: 300,
    },
    colorPickerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    colorOptions: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 10,
    },
    colorOption: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#000',
    },
    pdf: {
      flex: 1,
      // width: Dimensions.get('window').width,
      width: Dimensions.get('window').height * 0.707,
      height: Dimensions.get('window').height,
    },
  });
  return styles;
};
