import React from "react";
import { View, StyleSheet } from "react-native";
import { Input, Item, Button, Text, Spinner } from "native-base";

const SignUpOrSignInForm = ({
  displayName,
  email,
  password,
  confirmPassword,
  isSignUpForm,
  submitting,
  handleInput,
  handleSignUp,
  handleSignIn
}) => {
  const formText = isSignUpForm ? "Sign Up" : "Sign In";
  const handleSubmit = isSignUpForm ? handleSignUp : handleSignIn;
  return (
    <View style={styles.container}>
      {isSignUpForm && (
        <Item regular style={{ marginVertical: 10 }}>
          <Input
            placeholder="Display Name"
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry
            value={displayName}
            onChangeText={e => handleInput(e, "displayName")}
          />
        </Item>
      )}
      <Item regular style={{ marginVertical: 10 }}>
        <Input
          placeholder="Email"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
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

      <Button dark block onPress={handleSubmit}>
        {submitting ? <Spinner color="white" /> : <Text>{formText}</Text>}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20
  }
});

export default SignUpOrSignInForm;
