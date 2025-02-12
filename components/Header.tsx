import React from "react";
import styled from "styled-components/native";

const HeaderContainer = styled.View`
  padding: 16px;
  background-color: #6200ee;
  align-items: center;
  margin-bottom: 16px;
  margin-top: 30px;
  border-radius: 5px;
`;

const HeaderText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
`;

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <HeaderContainer>
      <HeaderText>{title}</HeaderText>
    </HeaderContainer>
  );
};

export default Header;

