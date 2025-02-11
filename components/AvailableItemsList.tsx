import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import ItemList from "./ItemList"; // Assure-toi que ItemList est bien créé

interface AvailableItemsListProps {
  selectedCategory: string | null;
  categories: { name: string; items: string[] }[];
  addItemFromCategory: (item: string) => Promise<void>;
}

const AvailableItemsList: React.FC<AvailableItemsListProps> = ({ 
  selectedCategory, 
  categories, 
  addItemFromCategory 
}) => {
  if (!selectedCategory) return null;

  return (
    <CategoryContainer>
      <CategoryTitle>Articles disponibles :</CategoryTitle>
      <ItemList
        items={categories.find((cat) => cat.name === selectedCategory)?.items.map((item) => ({
          id: item,
          text: item,
        })) || []}
        addItemFromCategory={(item) => addItemFromCategory(item)}
      />
    </CategoryContainer>
  );
};

// Styles avec Styled Components
const CategoryContainer = styled.View`
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  min-height: 300px;
  width: 100%;
  border: 1px solid #ccc;
  margin-bottom: 16px;
`;

const CategoryTitle = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
`;

export default AvailableItemsList;
