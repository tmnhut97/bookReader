import React from 'react';
import {Modal, View, Text, TouchableOpacity} from 'react-native';
import {useStyles} from './styles';

const CustomModal = ({visible, onClose, title, children}) => {
  const styles = useStyles();

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>{title}</Text>
        {children}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CustomModal;
