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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Selected category


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

  const addItem = async () => {
    if (input.trim()) {
      try {
        const newItem: Item = { id: Date.now().toString(), text: input };
        if (items.some(item => item.text.toLowerCase() === newItem.text.toLowerCase())) {
          alert("Cet article est déjà dans la liste !");
          return;
        }
        const newItems = [...items, newItem];
        setItems(newItems);
        await saveItems(newItems); // Save after add
        setInput(""); // Reset the input field
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'article :", error);
      }
    }
  };

  const addItemFromCategory = async (article: string): Promise<void> => {
    try {
      const newItem: Item = { id: Date.now().toString(), text: article };
  
      if (items.some((item) => item.text.toLowerCase() === newItem.text.toLowerCase())) {
        alert("Cet article est déjà dans la liste !");
        return; // Do not add the same item twice
      }
  
      const newItems = [...items, newItem];
      setItems(newItems);
      await saveItems(newItems);
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'article :", error);
    }
  };
  

  const deleteAll = async () => {
    try {
      await AsyncStorage.removeItem("shopping_list"); // Delete the list from AsyncStorage
      setItems([]); // Empty the list
    } catch (error) {
      console.error("Erreur lors de la suppression de la liste :", error);
    }
  };

  const removeItem = async (id: string) => {
    try {
      const newItems = items.filter((item) => item.id !== id);
      setItems(newItems);
      await saveItems(newItems); // Save after delete
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article :", error);
    }
  };

  const categories = [
    {
      name: "Produits laitiers",
      items: ["Lait", "Beurre", "Yaourt","Chantilly","Crème fraîche","Fromage blanc","Lait fermenté","Lait concentré"],
    },
    {
      name: "Œufs",
      items: ["Œuf", "Oeufs de caille", "Oeufs de cane",],
    },
    {
      name: "Fromages",
      items: ["Gruyère", "Camembert", "Chèvre", "Roquefort","Mozzarella","Parmesan"],
    },
    {
      name: "Viandes",
      items: ["Poulet", "Boeuf", "Porc", "Agneau","Veau","Canard","Dinde","Lapin","Gibier"],
    },
    {
      name: "Poissons",
      items: ["Saumon", "Cabillaud", "Sardines", "Maquereau","Thon","Dorade","Bar","Truite","Carpe","Anguille"],
    },
    {
      name: "Fruits",
      items: ["Pomme", "Banane", "Poire", "Orange","Citron","Fraise","Framboise","Cerise","Pêche","Abricot","Kiwi","Ananas","Melon","Pastèque","Mangue","Papaye","Grenade","Raisin","Prune","Mirabelle","Noix","Noisette","Amande","Pistache","Châtaigne","Coco","Avocat","Fruit de la passion","Goyave","Kaki","Litchi","Mûre","Myrtille","Nectarine","Pamplemousse","Rhubarbe","Cassis","Groseille","Mûre","Myrtille","Pruneau","Carambole","Kumquat","Physalis","Pitaya","Pomme cannelle","Pomme de terre","Pomme grenade","Pomme reinette","Pomme rose","Pomme golden","Pomme granny","Pomme pink lady","Pomme royal gala","Pomme fuji","Pomme jazz","Pomme chantecler","Pomme opal","Pomme elstar","Pomme boskoop","Pomme jonagold","Pomme melrose","Pomme rubinette","Pomme gala","Pomme idared","Pomme pink kiss","Pomme envy","Pomme kanzi","Pomme rubens","Pomme tentation","Pomme jazz","Pomme chantecler","Pomme opal","Pomme elstar","Pomme boskoop","Pomme jonagold","Pomme melrose","Pomme rubinette","Pomme gala","Pomme idared","Pomme pink kiss","Pomme envy","Pomme kanzi","Pomme rubens","Pomme tentation","Pomme jazz","Pomme chantecler","Pomme opal","Pomme elstar","Pomme boskoop","Pomme jonagold","Pomme melrose","Pomme rubinette","Pomme gala","Pomme idared","Pomme pink kiss",],
    },
    {
      name: "Légumes",
      items: ["Carotte", "Courgette", "Tomate", "Poivron","Aubergine","Concombre","Salade","Chou","Céleri","Radis"],
    },
    {
      name: "Féculents",
      items: ["Pâtes", "Riz", "Semoule", "Quinoa","Boulgour","Blé","Lentilles","Pois chiches","Haricots rouges"],
    },
    {
      name: "Conserves",
      items: ["Haricots verts", "Petits pois", "Maïs", "Thon","Sardines","Miettes de crabe","Ravioli","Pâté"],
    },
    {
      name: "Surgelés",
      items: ["Pizza", "Frites", "Nuggets", "Légumes","Fruits","Poisson","Viande","Glace","Sorbet",],
    },
    {
      name: "Boissons",
      items: ["Eau","Eau gazeuse","Jus de fruit", "Soda", "Lait d'amande","Lait de soja","Lait de coco","yaourt à boire"],
    },
    {
      name: "Alcool",
      items: ["Vin", "Bière", "Whisky", "Vodka","Rhum","Gin","Tequila","Champagne","Martini","Pastis","Ricard"],
    },
    {
      name: "Hygiène",
      items: ["Dentifrice", "Shampoing", "Gel douche", "Mouchoirs","Coton-tige","Rasoir","Déodorant","Papier toilette","Serviette hygiénique","Tampon"],
    },
    {
      name: "Bébé",
      items: ["Couches", "Lingettes", "Biberon", "Lait infantile","Petit pot","Compote","Yaourt bébé","Petit suisse","Céréales bébé"],
    },
    {
      name: "Ménage",
      items: ["Lessive", "Liquide vaisselle", "Éponge", "Papier absorbant","Nettoyant multi-usage","Désinfectant","Détartrant","Désodorisant","Sacs poubelle","Gants"],
    },
    {
      name: "Outils",
      items: ["Tournevis", "Marteau", "Pince", "Scie","Clé","Perceuse","Pinceau","Cutter","Mètre","Niveau à bulle"],
    },
    {
      name: "Papeterie",
      items: ["Stylo", "Cahier", "Feuilles", "Crayon","Gomme","Taille-crayon","Ciseaux","Colle","Agrafeuse","Ruban adhésif"],
    },
    {
      name: "Epicerie salée",
      items: ["Sel", "Poivre", "Huile", "Vinaigre","Moutarde","Ketchup","Mayonnaise","Sauce soja","Sauce tomate","Sauce piquante","Sauce barbecue"],
    },
    {
      name: "Epicerie sucrée",
      items: ["Sucre", "Sucre vanillé", "Farine", "Levure","Chocolat","Cacao","Confiture","Nutella","Miel","Sirop d'érable","Pâte à tartiner"],
    },
    {
      name: "Petit-déjeuner",
      items: ["Céréales", "Pain", "Beurre", "Confiture","Pâte à tartiner","Miel","Yaourt","Compote","Jus de fruit","Lait"],
    },
    {
      name: "Apéritif",
      items: ["Chips", "Cacahuètes", "Olives", "Saucisson","Fromage","Biscuits apéritif","Crudités","Charcuterie"],
    },
    {
      name: "Dessert",
      items: ["Gâteau", "Tarte", "Flan", "Crème dessert","Mousse","Compote","Yaourt","Glace","Sorbet","Fruits"],
    },
  ]
  

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
      <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>Catégories</Text>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.name}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  selectedCategory === item.name && styles.selectedCategoryButton,
                ]}
                onPress={() =>
                  setSelectedCategory(selectedCategory === item.name ? null : item.name)
                }
              >
                <Text style={styles.categoryButtonText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
              {selectedCategory && (
        <View style={styles.articleContainer}>
          <Text style={styles.articleTitle}>Articles disponibles : Ajouter à la liste</Text>
          <FlatList
            data={categories.find((cat) => cat.name === selectedCategory)?.items || []}
            keyExtractor={(item: string, index: number) => `${item}-${index}`}  
            renderItem={({ item }: { item: string }) => (
              <TouchableOpacity
                style={styles.articleButton}
                onPress={() => addItemFromCategory(item)}
              >
                <Text style={styles.articleButtonText}>{item}</Text>
                <Text>➕   Ajouter</Text>
              </TouchableOpacity>
              
            )}
          />
        </View>
      )}
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
        <TouchableOpacity style={styles.deleteAllButton} onPress={deleteAll}>
          <Text style={styles.addButtonText}>Supprimer tous les articles</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5", 
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  addButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteAllButton: {
    backgroundColor: "red",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
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
  categoryContainer: {
    marginBottom: 15,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  categoryButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginRight: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCategoryButton: {
    backgroundColor: "#0B6010",
  },
  categoryButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  articleContainer: {
  backgroundColor: "#fff",
  borderRadius: 8,
  padding: 10,
  marginBottom: 10,
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
  height: 415,
},
articleTitle: {
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 5,
  color: "#333",
},
articleButton: {
  backgroundColor: "#eee",
  padding: 10,
  borderRadius: 5,
  marginBottom: 5,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},
articleButtonText: {
  fontSize: 16,
},
});
