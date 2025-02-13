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
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  align-items: center;
  padding: 5px;
  top: 275px;
  width: 260px;
  margin-top: 10px;
  margin-left: 80px;
  z-index: 1;
`;

const ToastText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
