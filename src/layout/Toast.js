import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "native-base";
import { EvilIcons } from "@expo/vector-icons";

const Toast = ({ visible = false, message = "", onClose }) => {
  return visible ? (
    <View style={styles.toastContainer}>
      <Text style={styles.message}>
        {message || "Oops! Something went wrong."}
      </Text>

      <TouchableOpacity onPress={onClose}>
        <EvilIcons name="close" style={styles.icon} />
      </TouchableOpacity>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  toastContainer: {
    backgroundColor: "black",
    minHeight: 40,
    borderRadius: 5,
    position: "absolute",
    bottom: 20,
    width: "90%",
    alignSelf: "center",
    padding: 10,
    paddingLeft: 15,
    flexDirection: "row",
    alignItems: "center"
  },
  message: {
    color: "white",
    fontSize: 16,
    flex: 1
  },
  icon: { color: "white", fontSize: 22, marginRight: 5 }
});

export default Toast;
