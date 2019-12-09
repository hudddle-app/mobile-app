import React, { useState } from "react";
import styled from "styled-components";
import { Input, Item, Button, Text } from "native-base";
import { Auth } from "aws-amplify";
import ConfirmationCodeModal from "../components/Auth/ConfirmationCodeModal";

class Authorization extends React.Component {
  state = { email: "", password: "", confirmPassword: "", modalVisible: false };

  handleInput = (e, item) => {
    this.setState({ [item]: e });
  };

  toggleModal = () => {
    this.setState(state => {
      return { modalVisible: !state.modalVisible };
    });
  };

  handleConfirmCode = confirmationCode => {
    const { email } = this.state;
    Auth.confirmSignUp(email, confirmationCode, {})
      .then(() => {
        this.setState({ modalVisible: false });
        this.props.navigation.navigate("Dashboard");
      })
      .catch(err => console.log(err));
  };

  handleSignUp = () => {
    // alert(JSON.stringify(this.state));
    const { email, password, confirmPassword } = this.state;
    // Make sure passwords match
    if (password === confirmPassword) {
      Auth.signUp({
        username: email,
        password,
        attributes: { email }
      })
        // On success, show Confirmation Code Modal
        .then(response => {
          console.log("Response: ", response);
          this.setState({ modalVisible: true });
        })
        // On failure, display error in console
        .catch(err => console.log(err));
    } else {
      alert("Passwords do not match.");
    }
  };

  render() {
    return (
      <OuterView>
        <Title>Auth View</Title>
        <Item regular style={{ marginVertical: 10 }}>
          <Input
            placeholder="Email"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={e => this.handleInput(e, "email")}
          />
        </Item>
        <Item regular style={{ marginVertical: 10 }}>
          <Input
            placeholder="Password"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={e => this.handleInput(e, "password")}
          />
        </Item>
        <Item regular style={{ marginVertical: 10 }}>
          <Input
            placeholder="Confirm Password"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={e => this.handleInput(e, "confirmPassword")}
          />
        </Item>
        <Button primary block onPress={this.handleSignUp}>
          <Text>Sign Up</Text>
        </Button>

        <ConfirmationCodeModal
          modalVisible={this.state.modalVisible}
          toggleModal={this.toggleModal}
          handleConfirmCode={this.handleConfirmCode}
        />
      </OuterView>
    );
  }
}

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-vertical: 20;
`;

const OuterView = styled.View`
  padding-top: 30;
  align-items: center;
`;

export default Authorization;
