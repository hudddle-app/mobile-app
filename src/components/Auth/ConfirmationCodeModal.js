import React, { useState } from "react";
import { Modal, View, StyleSheet } from "react-native";
import { Input, Item, Button, Text } from "native-base";
import { EvilIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const ConfirmationCodeModal = ({
  modalVisible,
  handleToggleModal,
  handleConfirmCode
}) => {
  const [code, setCode] = useState("");
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={handleToggleModal}
      style={{ position: "relative" }}
    >
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleToggleModal}
      >
        <EvilIcons name="close" style={styles.closeButton} />
      </TouchableOpacity>

      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>Confirmation Code</Text>

        <Item
          regular
          style={{
            marginVertical: 10
          }}
        >
          <Input
            placeholder="Code"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="numeric"
            value={code}
            onChangeText={setCode}
          />
        </Item>
        <Button dark block onPress={() => handleConfirmCode(code)}>
          <Text>Submit</Text>
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "#EDEDED",
    height: "100%",
    paddingHorizontal: 20,
    paddingBottom: 100,
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 10,
    textAlign: "center"
  },
  buttonContainer: {
    position: "absolute",
    zIndex: 1,
    top: 20,
    right: 20
  },
  closeButton: {
    fontSize: 28,
    justifyContent: "flex-end"
  }
});

export default ConfirmationCodeModal;
