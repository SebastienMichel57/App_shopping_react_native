import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "./components/Header";
import InputForm from "./components/InputForm";
import CategoryList from "./components/CategoryList";
import ToastMessage from "./components/ToastMessage";
import DeleteAllList from "./components/DeleteAllList";
import RemoveItem from "./components/RemoveItem";
import AvailableItemsList from "./components/AvailableItemsList";

// Item interface
interface Item {
  id: string;
  text: string;
}

const AppContainer = styled.View`
  flex: 1;
  background-color: #f5f5f5;
  padding: 16px;
`;

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [input, setInput] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastVisible, setToastVisible] = useState<boolean>(false);

  // Load items from AsyncStorage
  useEffect(() => {
    const loadItems = async () => {
      try {
        const savedItems = await AsyncStorage.getItem("shopping_list");
        if (savedItems) {
          setItems(JSON.parse(savedItems));
        }
      } catch (error) {
        console.error("Erreur lors du chargement des articles :", error);
      }
    };
    loadItems();
  }, []);

  // Save items to AsyncStorage
  const saveItems = async (newItems: Item[]) => {
    try {
      await AsyncStorage.setItem("shopping_list", JSON.stringify(newItems));
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des articles :", error);
    }
  };

  // Add an item
  const addItem = async () => {
    if (input.trim()) {
      const newItem: Item = { id: Date.now().toString(), text: input };
      if (items.some((item) => item.text.toLowerCase() === newItem.text.toLowerCase())) {
        setInput(""); // Clear input
        showToastMessage("Cet article est déjà dans la liste !");
        return;
      }
      const newItems = [...items, newItem];
      setItems(newItems);
      await saveItems(newItems);
      setInput(""); 
      showToastMessage("Article ajouté !");
    }
  };

  // Add an item from a category
  const addItemFromCategory = async (article: string) => {
    const newItem: Item = { id: Date.now().toString(), text: article };
  
    if (items.some((item) => item.text.toLowerCase() === newItem.text.toLowerCase())) {
      showToastMessage("Cet article est déjà dans la liste !");
      return; 
    }
  
    const newItems = [...items, newItem];
    setItems(newItems);
    await saveItems(newItems);
  
    showToastMessage("Article ajouté !");
  };

  // Delete an item
  const removeItem = async (article: string) => {
    const newItems = items.filter((item) => item.text !== article);
    setItems(newItems);
    await saveItems(newItems);
    showToastMessage("Article supprimé !");
  };

  // Vider la liste
  const deleteAll = async () => {
    await AsyncStorage.removeItem("shopping_list");
    setItems([]);
  };

  // Show toast message
  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  const categories = [
    { name: "Produits laitiers", items: ["Lait", "Beurre", "Yaourt"] },
    { name: "Fruits", items: ["Pomme", "Banane", "Orange", "Poire", "Cerise", "Raisins", "Citron", "Fraise", "Kiwi", "Ananas"] },
    { name: "Légumes", items: ["Carotte", "Courgette", "Tomate"] },
    { name: "Viandes", items: ["Poulet", "Boeuf", "Porc"] },
    { name: "Poissons", items: ["Saumon", "Cabillaud", "Sardine"] },
    { name: "Surgelés", items: ["Pizza", "Frites", "Nuggets", "Glace"] },
    { name: "Boissons", items: ["Eau", "Jus d'orange", "Soda", "Limonade"] },
    { name: "Hygiène", items: ["Dentifrice", "Shampoing", "Gel douche", "Rasoir"] },
    { name: "Entretien", items: ["Lessive", "Liquide vaisselle", "Nettoyant ménager"] },
    { name: "Boulangerie", items: ["Pain", "Croissant", "Pain au chocolat"] },
    // Ajoutez d'autres catégories ici...
  ];

  return (
    <AppContainer>
      <Header />
      <InputForm input={input} setInput={setInput} addItem={addItem} />
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {selectedCategory && (
        <AvailableItemsList 
        selectedCategory={selectedCategory}
        categories={categories}
        addItemFromCategory={addItemFromCategory}
      />
      )}
      <RemoveItem items={items} removeItemFromCategory={removeItem} />
      <ToastMessage message={toastMessage} visible={toastVisible} />
      <DeleteAllList deleteAllList={deleteAll} />
    </AppContainer>
  );
}
