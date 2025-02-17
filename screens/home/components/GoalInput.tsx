"use client";

import useStore from "@/store/store";
import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const GoalInput = () => {
  const [goal, setGoal] = useState("");
  const setDailyGoal = useStore((state) => state.setDailyGoal);

  const handleSetGoal = () => {
    const numericGoal = Number.parseInt(goal, 10);
    if (!isNaN(numericGoal)) {
      setDailyGoal(numericGoal);
      setGoal(""); // Limpiar el input después de establecer la meta
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Ionicons
          name="footsteps"
          size={24}
          color="#EE0F55"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu meta diaria de pasos"
          placeholderTextColor="#666"
          keyboardType="numeric"
          value={goal}
          onChangeText={setGoal}
          maxLength={6}
          selectionColor="#EE0F55"
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSetGoal}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Establecer meta</Text>
        <Ionicons name="arrow-forward" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 15,
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 60,
    borderWidth: 1,
    borderColor: "#333",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#EE0F55",
    borderRadius: 30,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    gap: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default GoalInput;
