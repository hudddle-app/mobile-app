import React, { useState } from "react";
import { Modal, View, StyleSheet } from "react-native";
import { Input, Item, Button, Text } from "native-base";

const ConfirmationCodeModal = ({
  modalVisible,
  toggleModal,
  handleConfirmCode
}) => {
  const [code, setCode] = useState("");
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={toggleModal}
    >
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
            value={code}
            onChangeText={setCode}
          />
        </Item>
        <Button primary onPress={() => handleConfirmCode(code)}>
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
    paddingTop: 30
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 10,
    textAlign: "center"
  }
});

export default ConfirmationCodeModal;
