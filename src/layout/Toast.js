import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "native-base";
import { EvilIcons } from "@expo/vector-icons";

const Toast = ({ visible, message }) => {
  return visible ? (
    <View style={styles.toastContainer}>
      <Text style={styles.message}>Oh no!</Text>

      <TouchableOpacity style={styles.iconContainer}>
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
    fontSize: 16
  },
  iconContainer: {},
  icon: { color: "white", fontSize: 22 }
});
export default Toast;
