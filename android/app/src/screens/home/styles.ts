import {StyleSheet} from 'react-native';
import { theme } from '../../theme';

export const useStyles = () => {
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  pageInput: {
    height: 40,
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    color: 'black',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  form: {
    width: 300,
    height: 300,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },

  wpThreeDot: { marginTop: 15, borderRadius: 8, borderWidth: 1, borderColor: "#f1f1f1", padding: 10 },

  modalButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
    marginTop: 60,
    gap: 30,
  },
  card: {
    width: '40%',
    aspectRatio: 1,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 250,
    height: '100%',
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingLeft: 10,
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  sidebarText: {
    color: '#000',
    fontSize: 16,
    marginLeft: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  selectedItem: {
    backgroundColor: theme.colors.primary,
  },
  selectedText: {
    color: '#fff',
  },
  selectedCard: {
    backgroundColor:  theme.colors.primary,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  chapterItem: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  chapterText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 250,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalClose: {
    marginTop: 15,
    color: 'blue',
  },

});
  return styles;
};
