import React from "react";
import styled from "styled-components/native";
import ItemList from "./ItemList";

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
        items={(categories.find((cat) => cat.name === selectedCategory)?.items || []).map((item) => ({
          id: item,
          text: item,
        }))}
        addItemFromCategory={addItemFromCategory}
      />
    </CategoryContainer>
  );
};

export default AvailableItemsList;

// Styles avec Styled Components
const CategoryContainer = styled.View`
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  min-height: 350px;
  width: 100%;
  border: 1px solid #ccc;
  margin-bottom: 16px;
  margin-top: 10px;
  border-bottom-width: 2px;
`;

const CategoryTitle = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
`;


