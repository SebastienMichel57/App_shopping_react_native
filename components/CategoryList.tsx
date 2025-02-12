import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";

interface CategoryListProps {
  categories: { name: string }[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <ArticlesContainer>
        <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
            <CategoryButton
            selected={selectedCategory === item.name}
            onPress={() =>
                setSelectedCategory(selectedCategory === item.name ? null : item.name)
            }
            >
            <CategoryButtonText>{item.name}</CategoryButtonText>
            </CategoryButton>
        )}
        contentContainerStyle={{ paddingHorizontal: 5 }}
        showsHorizontalScrollIndicator={true}
        />
    </ArticlesContainer>
  );
};

export default CategoryList;

const CategoryButton = styled.TouchableOpacity<{ selected: boolean }>`
  background-color: ${( { selected }: { selected: boolean } ) => (selected ? "#0B6010" : "#4CAF50")};
  padding: 15px;
  border-radius: 8px;
  margin-right: 10px;
  height: 50px;
`;

const CategoryButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;

const ArticlesContainer = styled.View`
    margin-top: 10px;
    margin-bottom: 20px;
    `;