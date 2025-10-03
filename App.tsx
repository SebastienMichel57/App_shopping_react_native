import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "./components/Header";
import InputForm from "./components/InputForm";
import CategoryList from "./components/CategoryList";
import ToastMessage from "./components/ToastMessage";
import DeleteAllList from "./components/DeleteAllList";
import RemoveItem from "./components/RemoveItem";
import AvailableItemsList from "./components/AvailableItemsList";
import { Alert } from "react-native";


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

  const addItem = async () => {
    if (!input.trim()) return; // Vérifie si l'input est vide
    
    const newItem: Item = { id: Date.now().toString(), text: input };
  
    if (items.some((item) => item.text.toLowerCase() === newItem.text.toLowerCase())) {
      setTimeout(() => {
        showToastMessage("Cet article est déjà dans la liste !");
      }, 100);
    } else {
      const newItems = [...items, newItem];
      setItems(newItems);
      
      try {
        await saveItems(newItems);
        setTimeout(() => {
          showToastMessage("Article ajouté !");
        }, 100);
      } catch (error) {
        console.error("Erreur lors de la sauvegarde des articles :", error);
        showToastMessage("Une erreur est survenue !");
      }
    }
  
    setInput(""); // Réinitialiser le champ après toutes les vérifications
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

  // confirm before deleting an item
  const confirmDeleteItem = useCallback((article: string) => {
    Alert.alert(
      "Confirmer la suppression",
      `Voulez-vous supprimer l'article "${article}" ?`,
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => removeItem(article),
        },
      ],
      { cancelable: true }
    );
  }, [removeItem]);

  // clean all items
  const deleteAll = useCallback(async () => {
    await AsyncStorage.removeItem("shopping_list");
    setItems([]);
    showToastMessage("Liste supprimée !");
  }, [setItems]);

  // Confirm before deleting all items
  const confirmDeleteAll = useCallback(() => {
  Alert.alert(
    "Confirmer la suppression",
    "Voulez-vous supprimer toute la liste ?",
    [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: async () => {
          deleteAll();
        },
      },
    ],
    { cancelable: true }
  );
  }, [deleteAll]);


  // Show toast message
  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 900);

  };

  const categories = [
    { name: "Crémerie", items: ["Lait", "Lait fermenté", "Beurre", "Yaourt", "Crème fraîche", "Fromage", "Oeufs", "Crème dessert", "Margarine", "Gruyère", "Camembert", "Parmesan", "Roquefort", "Chèvre"] },
    { name: "Fruits", items: ["Pomme", "Banane", "Orange", "Poire", "Cerise", "Raisins", "Citron", "Fraise", "Kiwi", "Ananas"] },
    { name: "Légumes", items: ["Carotte", "Courgette", "Tomate", "Salade", "Poivron", "Aubergine", "Concombre", "Champignon", "Haricot vert", "Pomme de terre", "Oignon", "Echalote", "Ail", "Radis", "Endive", "Céleri", "Brocoli", "Chou-fleur", "Potiron", "Courge", "Pois", "Petits pois", "Asperge", "Artichaut", "Betterave"] },
    { name: "Viandes", items: ["Poulet", "Boeuf", "Porc", "Dinde", "Canard", "Agneau", "Veau", "Lapin", "Lardons", "Jambon", "Charcuterie"] },
    { name: "Poissons", items: ["Saumon", "Cabillaud", "Sardine", "Bâtons de crabe", "Crevettes"] },
    { name: "Surgelés", items: ["Pizza", "Frites", "Nuggets", "Glace","Poisson panés", "Légumes", "Steaks hachés"] },
    { name: "Boissons", items: ["Eau", "Eau gazeuse", "Lait", "Jus de fruits", "Jus d'orange", "Sodas", "Sirop", "Bières", "Vin", "Apéritifs"] },
    { name: "Hygiène", items: ["Dentifrice", "Brosse à dents", "Shampoing", "Gel douche", "Rasoir", "Mousse à raser", "Coton-tige", "Mouchoirs", "Papier toilette", "Serviettes hygiéniques", "Déodorant", "Cotons", "Lingettes", "Savon", "Crème hydratante", "Dissolvant", "Démaquillant"] },
    { name: "Entretien", items: ["Lessive", "Liquide vaisselle", "Nettoyant ménager", "Eponge", "Papier absorbant", "Papier alu", "Sacs poubelle", "Désodorisant", "Produit WC", "Essuie-tout", "Pastilles lave-vaisselle", "Nettoyant vitres", "Nettoyant sol", "Nettoyant salle de bain",] },
    { name: "Boulangerie", items: ["Pain", "Croissant", "Pain au chocolat"] },
    { name: "Epicerie Sucrée", items: ["Sucre", "Farine", "Chocolat", "Confiture", "Miel", "Pâte à tartiner", "Biscuits", "Bonbons", "Gâteaux", "Compote", "Céréales", "Barres chocolatées", "Pâte à gâteau", "Levure", "Sucre vanillé", "Pépites de chocolat", "Cacao", "Noix de coco", "Amandes", "Noisettes", "Pistaches", "Raisins secs"] },
    { name: "Epicerie Salé", items: ["Riz", "Pâtes", "Sauce tomate", "Huile", "Vinaigre", "Sel", "Poivre", "Epices", "Moutarde", "Ketchup", "Mayonnaise", "Cornichons", "Olives"] },
    { name: "Petit-déjeuner", items: ["Café", "Thé", "Chocolat en poudre", "Céréales", "Lait", "Jus de fruits", "Confiture", "Pâte à tartiner", "Pain", "Beurre", "Croissant", "Pain au chocolat"] },
    { name: "Bébé", items: ["Couches", "Lait infantile", "Petits pots", "Biberons", "Tétines", "Lingettes"] },
    { name: "Animaux", items: ["Croquettes", "Pâtée", "Litière", "Jouets", "Collier", "Laisse", "Gamelle", "Arbre à chat", "Panier"] },
    { name: "Autres", items: ["Piles", "Ampoules", "Scotch", "Post-it", "Carnet", "Stylo", "Papier", "Enveloppes", "Timbres"] },
    { name: "Conserves", items: ["Thon", "Sardines", "Maïs", "Petits pois", "Haricots verts", "Champignons", "Tomates pelées", "Purée de tomates", "Raviolis", "Pâté", "Confiture", "Compote", "Fruits au sirop", "Légumes", "Soupes", "Plats cuisinés", "Cornichons"] },
    { name: "Pharmacie", items: ["Doliprane", "Ibuprofène", "Pansements", "Compresses", "Thermomètre", "Crème solaire", "Anti-moustiques", "Sérum physiologique", "Collyre", "Cotons", "Alcool", "Bétadine", "Arnica", "Homéopathie", "Huiles essentielles", "Vitamines", "Médicaments"] },
  ];

  return (
    <AppContainer style={{ flex: 1, position: 'relative' }}>
      <Header title="Mes courses facile" />
      <InputForm input={input} setInput={setInput} addItem={addItem} />
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ToastMessage message={toastMessage} visible={toastVisible} />
      {selectedCategory && (
        <AvailableItemsList 
        selectedCategory={selectedCategory}
        categories={categories}
        addItemFromCategory={addItemFromCategory}
        />
      )}
      <RemoveItem items={items} removeItemFromCategory={confirmDeleteItem} />
      <DeleteAllList deleteAllList={confirmDeleteAll} />
    </AppContainer>
  );
}
