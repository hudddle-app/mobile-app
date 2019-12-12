import React from "react";
import { Auth } from "aws-amplify";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "native-base";
import SignUpOrSignInForm from "../components/Auth/SignUpOrSignInForm";
import ConfirmationCodeModal from "../components/Auth/ConfirmationCodeModal";
import Toast from "../layout/Toast";
import { connect } from "react-redux";

class Authorization extends React.Component {
  state = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    modalVisible: false,
    isSignUpForm: false,
    submitting: false,
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

  handleToggleToast = (errorMessage = "") => {
    this.setState(state => {
      return {
        showErrorMessage: !state.showErrorMessage,
        errorMessage,
        submitting: false
      };
    });
  };

  handleToggleForm = () => {
    this.setState(state => {
      return {
        isSignUpForm: !state.isSignUpForm,
        password: "",
        confirmPassword: ""
      };
    });
  };

  handleToggleSubmit = () => {
    this.setState(state => {
      return { submitting: !state.submitting };
    });
  };

  handleConfirmCode = async confirmationCode => {
    const { email } = this.state;
    try {
      const user = await Auth.confirmSignUp(email, confirmationCode, {});
      console.log("Confirmed User: ", user);
      this.setState({ modalVisible: false });
      this.props.navigation.navigate("Dashboard");
    } catch (err) {
      this.handleToggleToast(err.message);
    }
  };

  handleSignUp = async () => {
    const { email, password, confirmPassword } = this.state;
    // Check password match
    if (password !== confirmPassword) {
      return this.handleToggleToast("Passwords do not match.");
    } else {
      // Sign up user
      try {
        this.handleToggleSubmit();
        const user = await Auth.signUp({
          username: email,
          password,
          attributes: { email }
        });
        console.log("New User: ", user);
        this.setState({ modalVisible: true, submitting: false });
      } catch (err) {
        this.handleToggleToast(err.message);
      }
    }
  };

  handleSignIn = async () => {
    const { email, password } = this.state;
    this.handleToggleSubmit();
    try {
      const user = await Auth.signIn(email, password);
      console.log("Username: ", user.sub);
      // 1e9e1250-2c57-47d0-a0e4-b4bd2985d370
      await this.handleToggleSubmit();
      this.props.navigation.navigate("Dashboard");
    } catch (err) {
      this.handleToggleToast(err.message);
    }
  };

  render() {
    const {
      isSignUpForm,
      submitting,
      showErrorMessage,
      errorMessage
    } = this.state;

    return (
      <View style={styles.outerView}>
        <Text style={styles.title}>hudddle</Text>

        <SignUpOrSignInForm
          email={this.state.email}
          password={this.state.password}
          confirmPassword={this.state.confirmPassword}
          isSignUpForm={isSignUpForm}
          submitting={submitting}
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

        <Toast
          visible={showErrorMessage}
          message={errorMessage}
          onClose={this.handleToggleToast}
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

const mapState = state => {
  return { user: state.user };
};

export default connect(mapState, null)(Authorization);
