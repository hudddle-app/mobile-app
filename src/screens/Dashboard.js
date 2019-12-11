import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, Button } from "native-base";
import { Auth } from "aws-amplify";

const Dashboard = props => {
  const handleSignOut = () => {
    Auth.signOut()
      .then(() => props.navigation.navigate("Authentication"))
      .catch(err => console.log(err));
  };
  return (
    <View style={styles.container}>
      <Text>Welcome to Dashboard!</Text>
      <Button onPress={handleSignOut}>
        <Text black block>
          Sign Out
        </Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30
  }
});

export default Dashboard;
