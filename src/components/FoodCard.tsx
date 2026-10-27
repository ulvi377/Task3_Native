import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type FoodItem = {
  id: number;
  name: string;
  price: number;
  category: string;
};

type FoodCardProps = {
  item: FoodItem;
  onAdd: (item: FoodItem) => void;
  onRemove: (id: number) => void;
};

export default function FoodCard({ item, onAdd, onRemove }: FoodCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price} AZN</Text>
      <TouchableOpacity style={styles.btn} onPress={() => onAdd(item)}>
        <Text style={styles.btnText}>+ Əlavə et</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.removeBtn} onPress={() => onRemove(item.id)}>
        <Text style={styles.removeText}>Sil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    marginTop: 4,
  },
  btn: {
    marginTop: 10,
    backgroundColor: "#ef5350",
    padding: 8,
    borderRadius: 6,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
  },
  removeBtn: {
    marginTop: 6,
    backgroundColor: "#e0e0e0",
    padding: 6,
    borderRadius: 6,
  },
  removeText: {
    color: "#333",
    textAlign: "center",
  },
});
