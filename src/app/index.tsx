
import { useState } from "react";
import {
  Alert,
  Keyboard,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Header from "@/components/Header";
import FoodCard, { FoodItem } from "@/components/FoodCard";

const categories = ["Meyvələr", "Ət məhsulları", "Şirniyyatlar", "İçkilər"];

const initialItems: FoodItem[] = [
  { id: 1, name: "Alma", price: 2, category: "Meyvələr" },
  { id: 2, name: "Banan", price: 3, category: "Meyvələr" },
  { id: 3, name: "Toyuq əti", price: 8, category: "Ət məhsulları" },
  { id: 4, name: "Mal əti", price: 14, category: "Ət məhsulları" },
  { id: 5, name: "Şokolad", price: 4, category: "Şirniyyatlar" },
  { id: 6, name: "Peçenye", price: 2, category: "Şirniyyatlar" },
  { id: 7, name: "Su", price: 1, category: "İçkilər" },
  { id: 8, name: "Şirə", price: 3, category: "İçkilər" },
];

export default function HomeScreen() {
  const [cart, setCart] = useState<FoodItem[]>([]);
  const [foodItems, setFoodItems] = useState<FoodItem[]>(initialItems);
  const [newFood, setNewFood] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Meyvələr");

  const handleAdd = (item: FoodItem) => {
    setCart([...cart, item]);
    Alert.alert("Səbət", `${item.name} səbətə əlavə edildi!`);
  };

  const handleNewFoodSubmit = () => {
    if (!newFood.trim() || !newPrice.trim() || isNaN(Number(newPrice))) {
      Alert.alert("Diqqət", "Məhsulun adını və düzgün qiymətini daxil edin!");
      return;
    }

    const newItem: FoodItem = {
      id: Date.now(),
      name: newFood.trim(),
      price: Number(newPrice),
      category: selectedCategory,
    };

    setFoodItems([...foodItems, newItem]);
    setNewFood("");
    setNewPrice("");
    Keyboard.dismiss();
  };

  const handleRemove = (id: number) => {
    setFoodItems(foodItems.filter((item) => item.id !== id));
    setCart(cart.filter((item) => item.id !== id));
  };

  const sections = categories
    .filter((category) => category === selectedCategory)
    .map((category) => ({
      title: category,
      data: foodItems
        .filter((item) => item.category === category)
        .reduce((rows, item, index, items) => {
          if (index % 2 === 0) {
            rows.push(items.slice(index, index + 2));
          }
          return rows;
        }, [] as FoodItem[][]),
    }));

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={[styles.container, { paddingTop: StatusBar.currentHeight }]}>
      <Header />

      <View style={styles.cartInfo}>
        <Text style={styles.cartText}>
          <FontAwesome5 name="shopping-cart" size={20} color="#ef5350" />
          {` Səbətdə: ${cart.length} məhsul / ${total} AZN`}
        </Text>
      </View>

      <View style={styles.categories}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryBtn,
              selectedCategory === category && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Məhsulun adı"
          value={newFood}
          onChangeText={setNewFood}
          onSubmitEditing={handleNewFoodSubmit}
          returnKeyType="done"
        />
        <TextInput
          style={styles.priceInput}
          placeholder="Qiymət"
          value={newPrice}
          onChangeText={setNewPrice}
          keyboardType="decimal-pad"
          onSubmitEditing={handleNewFoodSubmit}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addBtn} onPress={handleNewFoodSubmit}>
          <Text style={styles.addBtnText}>Əlavə et</Text>
        </TouchableOpacity>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(items) => String(items[0].id)}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionTitle}>{section.title}</Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.columnWrapper}>
            {item.map((food) => (
              <FoodCard
                key={food.id}
                item={food}
                onAdd={handleAdd}
                onRemove={handleRemove}
              />
            ))}
          </View>
        )}
        key={selectedCategory}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Bu kateqoriyada məhsul yoxdur.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  cartInfo: {
    alignItems: "center",
    padding: 10,
  },
  cartText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    gap: 6,
    marginBottom: 10,
  },
  categoryBtn: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: "#e0e0e0",
  },
  selectedCategory: {
    backgroundColor: "#ef5350",
  },
  categoryText: {
    fontSize: 13,
    color: "#333",
  },
  selectedCategoryText: {
    color: "#fff",
  },
  inputRow: {
    flexDirection: "row",
    paddingHorizontal: 10,
    gap: 6,
    alignItems: "center",
    marginBottom: 8,
  },
  input: {
    flex: 2,
    borderWidth: 1,
    padding: 9,
    borderRadius: 6,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  priceInput: {
    flex: 1,
    borderWidth: 1,
    padding: 9,
    borderRadius: 6,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  addBtn: {
    backgroundColor: "#ef5350",
    padding: 10,
    borderRadius: 6,
  },
  addBtnText: {
    color: "#fff",
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  columnWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: "center",
    padding: 20,
    color: "#666",
  },
});
