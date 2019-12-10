import React from "react";
import styled from "styled-components";
import { Auth } from "aws-amplify";
import SignUpOrSignInForm from "../components/Auth/SignUpOrSignInForm";
import ConfirmationCodeModal from "../components/Auth/ConfirmationCodeModal";
import { Text } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";

class Authorization extends React.Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    modalVisible: false,
    isSignUpForm: false
  };

  handleInput = (e, item) => {
    this.setState({ [item]: e });
  };

  handleToggleModal = () => {
    this.setState(state => {
      return { modalVisible: !state.modalVisible };
    });
  };

  handleToggleForm = () => {
    this.setState(state => {
      return { isSignUpForm: !state.isSignUpForm };
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
          console.log("Response: ", response); // <== {userId}
          this.setState({ modalVisible: true });
        })
        // On failure, display error in console
        .catch(err => console.log(err));
    } else {
      alert("Passwords do not match.");
    }
  };

  render() {
    const { isSignUpForm } = this.state;
    return (
      <OuterView>
        <Title>Hudddle</Title>
        <SignUpOrSignInForm
          email={this.state.email}
          password={this.state.password}
          confirmPassword={this.state.confirmPassword}
          isSignUpForm={isSignUpForm}
          handleInput={this.handleInput}
          handleSignUp={this.handleSignUp}
        />

        <TouchableOpacity onPress={this.handleToggleForm}>
          <SignUpText>
            {isSignUpForm ? "Sign In" : "Don't have an account?"}
          </SignUpText>
        </TouchableOpacity>

        <ConfirmationCodeModal
          modalVisible={this.state.modalVisible}
          toggleModal={this.handleToggleModal}
          handleConfirmCode={this.handleConfirmCode}
        />
      </OuterView>
    );
  }
}

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-vertical: 20;
`;

const SignUpText = styled.Text`
  align-self: flex-end;
  margin-right: 25;
  margin-top: 20;
`;

const OuterView = styled.View`
  height: 100%;
  flex: 1;
  justify-content: center;
`;

export default Authorization;
