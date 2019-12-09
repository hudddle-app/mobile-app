import React from "react";
import styled from "styled-components";

const Dashboard = () => {
  return (
    <OuterView>
      <Title>Welcome to Dashboard!</Title>
    </OuterView>
  );
};

const OuterView = styled.View`
  padding-top: 30;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-vertical: 20;
`;

export default Dashboard;
