import React from "react";
import styled from "styled-components";
import { View } from "react-native";

const Auth = () => {
  return (
    <View>
      <Title>Auth View</Title>
    </View>
  );
};

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-vertical: 20;
`;

export default Auth;
