import { Alert } from "react-native";

export default notificationHandler = notification => {
  const {
    data: { text },
    origin
  } = notification;

  // Validate that this isn't a service/error message
  if (origin === "received" && text) {
    console.log("Go for captain...");
    return Alert.alert("New Push Notification", text, [{ text: "Ok." }]);
  }
};
