import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Interface for list items
interface Item {
  id: string;
  text: string;
}

export default function App() {
  const [items, setItems] = useState<Item[]>([]); // List of articles
  const [input, setInput] = useState<string>(""); // User input field

  // Load data from AsyncStorage when the app starts
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

  // Save data in asyncStorage
  const saveItems = async (newItems: Item[]) => {
    try {
      await AsyncStorage.setItem("shopping_list", JSON.stringify(newItems));
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des articles :", error);
    }
  };

  // Add a new article
  const addItem = () => {
    if (input.trim()) {
      const newItem = { id: Date.now().toString(), text: input };
      const newItems = [...items, newItem];
      setItems(newItems);
      saveItems(newItems); // Save after adding
      setInput("");
    }
  };

  // Delete an article
  const removeItem = (id: string) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
    saveItems(newItems); // Save after deleting
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ma Liste de Courses</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ajouter un article"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <Text style={styles.addButtonText}>Ajouter</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.text}</Text>
            <TouchableOpacity onPress={() => removeItem(item.id)}>
              <Text style={styles.removeButton}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
  },
  removeButton: {
    color: "red",
    fontWeight: "bold",
  },
});
