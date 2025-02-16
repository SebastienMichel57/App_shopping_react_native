import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";

interface RemoveItemProps {
  items: { id: string; text: string }[];
  removeItemFromCategory?: (article: string) => Promise<void>;
}


const RemoveItem: React.FC<RemoveItemProps> = ({ items, removeItemFromCategory }) => {
    return (
        <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
        <ItemContainer>
          <ItemText>{item.text}</ItemText>
          {removeItemFromCategory && (
              <RemoveItemListButton onPress={() => removeItemFromCategory(item.text)}>
              <RemoveItemListText>Supprimer</RemoveItemListText>
            </RemoveItemListButton>
          )} 
        </ItemContainer>
      )}
      />
    );
};

export default RemoveItem;

const ItemContainer = styled.View`
display: flex;
align-items: center;
flex-direction: row;
justify-content: space-between;
padding: 8px;
background-color: #fff;
border-bottom-width: 1px;
border-bottom-color: #ccc;
border-radius: 10px;
margin-bottom: 8px;
`;

const ItemText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const RemoveItemListButton = styled.TouchableOpacity`
  background-color: #f44336;
  padding: 12px;
  border-radius: 8px;
`;

const RemoveItemListText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;