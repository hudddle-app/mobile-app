import React from "react";
import { Auth } from "aws-amplify";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "native-base";
import SignUpOrSignInForm from "../components/Auth/SignUpOrSignInForm";
import ConfirmationCodeModal from "../components/Auth/ConfirmationCodeModal";
import Toast from "../layout/Toast";

class Authorization extends React.Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    modalVisible: false,
    isSignUpForm: false,
    showErrorMessage: false,
    errorMessage: ""
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

  handleSignIn = () => {
    const { email, password } = this.state;
    Auth.signIn(email, password)
      // If we are successful, navigate to Home screen
      .then(user => this.props.navigation.navigate("Dashboard"))
      // On failure, display error in console
      .catch(err => console.log(err));
  };

  render() {
    const { isSignUpForm, showErrorMessage, errorMessage } = this.state;

    return (
      <View style={styles.outerView}>
        <Toast visible={true} />
        <Text style={styles.title}>hudddle</Text>

        <SignUpOrSignInForm
          email={this.state.email}
          password={this.state.password}
          confirmPassword={this.state.confirmPassword}
          isSignUpForm={isSignUpForm}
          handleInput={this.handleInput}
          handleSignUp={this.handleSignUp}
          handleSignIn={this.handleSignIn}
        />

        <TouchableOpacity onPress={this.handleToggleForm}>
          <Text style={styles.signUpText}>
            {isSignUpForm ? "Sign In" : "Don't have an account?"}
          </Text>
        </TouchableOpacity>

        <ConfirmationCodeModal
          modalVisible={this.state.modalVisible}
          handleToggleModal={this.handleToggleModal}
          handleConfirmCode={this.handleConfirmCode}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20
  },
  signUpText: {
    alignSelf: "flex-end",
    marginRight: 25,
    marginTop: 20
  },
  outerView: {
    height: "100%",
    flex: 1,
    justifyContent: "center"
  }
});

export default Authorization;
