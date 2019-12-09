import React from "react";
import styled from "styled-components";
import { Input, Item, Button, Text } from "native-base";

const Auth = () => {
  return (
    <OuterView>
      <Title>Auth View</Title>
      <Item regular style={{ marginVertical: 10 }}>
        <Input placeholder="Email" autoCorrect={false} autoCapitalize="none" />
      </Item>
      <Item regular style={{ marginVertical: 10 }}>
        <Input
          placeholder="Password"
          autoCorrect={false}
          autoCapitalize="none"
        />
      </Item>
      <Item regular style={{ marginVertical: 10 }}>
        <Input
          placeholder="Confirm Password"
          autoCorrect={false}
          autoCapitalize="none"
        />
      </Item>
      <Button>
        <Text>Sign Up</Text>
      </Button>
    </OuterView>
  );
};

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-vertical: 20;
`;

const OuterView = styled.View`
  padding-top: 30;
`;

export default Auth;
