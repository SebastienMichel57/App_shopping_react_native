import React from 'react';
import styled from "styled-components/native";

const HeaderContainer = styled.View`
  background-color: #007bff;
  padding: 16px;
  margin-bottom: 16px;
  margin-top: 25px;
  border-radius: 8px;
`;

const HeaderText = styled.Text`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  padding: 15px;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderText>Ma Liste de Courses</HeaderText>
    </HeaderContainer>
  );
}

