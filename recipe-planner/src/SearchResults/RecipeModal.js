import React from "react";
import { Modal, View, Text, Button, StyleSheet } from "react-native";

const RecipeModal = ({ recipe, visible, onClose, onSave }) => {
  if (!recipe) return null;
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>{recipe.title}</Text>
        {/* Add more recipe details here as needed */}
        <Button title="Save this recipe" onPress={onSave} />
        <Button title="Go back" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    marginTop: 50,
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
  },
  // Add more styles as needed
});

export default RecipeModal;
