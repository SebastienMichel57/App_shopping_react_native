import React from "react";
import styled from "styled-components/native";

interface ToastMessageProps {
  message: string;
  visible: boolean;
}

const ToastMessage: React.FC<ToastMessageProps> = ({ message, visible }) => {
  if (!visible) return null;

  return (
    <ToastContainer>
      <ToastText>{message}</ToastText>
    </ToastContainer>
  );
};

export default ToastMessage;

const ToastContainer = styled.View`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 10px;
  border-radius: 8px;
  align-items: center;
`;

const ToastText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
