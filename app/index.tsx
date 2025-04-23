import {
  Image,
  StyleSheet,
  Platform,
  Button,
  View,
  Text,
  Pressable,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";

export default function HomeScreen() {
  const [title, setTitle] = useState("Events");
  return (
    <ThemedView style={styles.page}>
      <Text style={styles.text}>
        Welcome to Evently <HelloWave />
      </Text>
      <Pressable>Get Started</Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#002147",
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#ffffff",
    fontFamily: "InstrumentSerifItalic",
    fontSize: 40,
  },
});
