import React from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import AppNavigator from "./AppNavigator";
import { Root } from "native-base";
export default class AppLoader extends React.Component {
  state = { isReady: false };

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });

    this.setState({ isReady: true });
  }

  render() {
    return !this.state.isReady ? (
      <AppLoading />
    ) : (
      <Root>
        <AppNavigator />
      </Root>
    );
  }
}
