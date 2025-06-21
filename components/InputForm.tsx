import React from 'react';
import styled from "styled-components/native";

const InputContainer = styled.View`
  flex-direction: row;
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 8px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
  margin-top: 10px;
  position: fixed;
`;

const TextInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  font-weight: bold;
`;

const Button = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 10px 16px;
  border-radius: 8px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

interface InputFormProps {
  input: string;
  setInput: (value: string) => void;
  addItem: () => void;
}

export default function InputForm({ input, setInput, addItem }: InputFormProps) {
  return (
    <InputContainer>
      <TextInput
        placeholder="Ajouter un article"
        value={input}
        onChangeText={setInput}
        maxLength={30}
      />
      <Button onPress={addItem}>
        <ButtonText>Ajouter</ButtonText>
      </Button>
    </InputContainer>
  );
}
