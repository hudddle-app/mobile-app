import React from "react";
import { View, StyleSheet } from "react-native";
import { Input, Item, Button, Text } from "native-base";

const SignUpOrSignInForm = ({
  email,
  password,
  confirmPassword,
  isSignUpForm,
  handleInput,
  handleSignUp,
  handleSignIn
}) => {
  const formText = isSignUpForm ? "Sign Up" : "Sign In";
  const handleSubmit = isSignUpForm ? handleSignUp : handleSignIn;
  return (
    <View style={styles.container}>
      <Item regular style={{ marginVertical: 10 }}>
        <Input
          placeholder="Email"
          autoCorrect={false}
          autoCapitalize="none"
          value={email}
          onChangeText={e => handleInput(e, "email")}
        />
      </Item>
      <Item regular style={{ marginVertical: 10 }}>
        <Input
          placeholder="Password"
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry
          value={password}
          onChangeText={e => handleInput(e, "password")}
        />
      </Item>

      {isSignUpForm && (
        <Item regular style={{ marginVertical: 10 }}>
          <Input
            placeholder="Confirm Password"
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry
            value={confirmPassword}
            onChangeText={e => handleInput(e, "confirmPassword")}
          />
        </Item>
      )}

      <Button block style={styles.button} onPress={handleSubmit}>
        <Text>{formText}</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20
  },
  button: {
    backgroundColor: "black"
  }
});

export default SignUpOrSignInForm;
