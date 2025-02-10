import React from "react";
import styled from "styled-components/native";


const DeleteAllList: React.FC<{ deleteAllList: () => void }> = ({ deleteAllList }) => {
  return (
    <DeleteAllListButton onPress={deleteAllList}>
      <DeleteAllListText>Supprimer la liste</DeleteAllListText>
    </DeleteAllListButton>
  );
};

export default DeleteAllList;

const DeleteAllListButton = styled.TouchableOpacity`
  background-color: #f44336;
  padding: 15px;
  border-radius: 8px;
  margin-top: 10px;
`;

const DeleteAllListText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
`;

const ToastMessage = styled.Text`
    position: absolute;
    bottom: 20px;
    left: 20px;
    right: 20px;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 10px;
    border-radius: 8px;
    align-items: center;
`;  
