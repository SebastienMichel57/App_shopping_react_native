import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";

interface ItemListProps {
    items: { id: string; text: string }[];
    addItemFromCategory?: (article: string) => Promise<void>;
  }

const ItemList: React.FC<ItemListProps> = ({ items, addItemFromCategory }) => {
  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ItemContainer>
          <ItemText>{item.text}</ItemText>
          {addItemFromCategory && (
            <AddbuttonList onPress={() => addItemFromCategory(item.text)}>
              <AddbuttonListText>Ajouter</AddbuttonListText>
            </AddbuttonList>
          )}
        </ItemContainer>
      )}
      style={{ flex: 1 }}
      scrollEnabled={true} 
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }} 
    />
  );
};

export default ItemList;

const ItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  border-radius: 5px;
  `;

const ItemText = styled.Text`
  font-size: 18px;
  padding: 10px 5px;
`;



const AddbuttonList = styled.TouchableOpacity`
  background-color: #4CAF50;
  padding: 12px;
  border-radius: 8px;
`;

const AddbuttonListText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;

