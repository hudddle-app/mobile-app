import React from "react";
import { AppLoading, Notifications } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import AppNavigator from "./AppNavigator";
import { Root } from "native-base";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "./src/reducers/index";
import registerForNotifications from "./src/services/push_notifications";
import notificationHandler from "./src/services/push_notification_handler";

const store = configureStore({
  reducer: rootReducer
});

export default class AppLoader extends React.Component {
  state = { isReady: false };

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });

    this.setState({ isReady: true }, this.handleNotifications);
  }

  handleNotifications = async () => {
    await registerForNotifications();
    Notifications.addListener(notificationHandler);
  };

  render() {
    return !this.state.isReady ? (
      <AppLoading />
    ) : (
      <Provider store={store}>
        <Root>
          <AppNavigator />
        </Root>
      </Provider>
    );
  }
}
