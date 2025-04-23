import {
  Image,
  StyleSheet,
  Platform,
  Button,
  View,
  Text,
  Pressable,
  ImageBackground,
  TouchableHighlight,
  Touchable,
  TouchableOpacity,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import { ThemedView } from "@/components/ThemedView";
import React, { useState } from "react";
const image = require("../assets/images/party.jpg");
export default function HomeScreen() {
  const [title, setTitle] = useState("Events");
  return (
    <ThemedView style={styles.page}>
      <ImageBackground source={image} style={styles.image} resizeMode="cover">
        <Text style={styles.text}>Ready for your</Text>
        <Text style={styles.text}>first Event?</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={{ color: "white" }}>Get Started</Text>
        </TouchableOpacity>
      </ImageBackground>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#000000",
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#ffffff",
    fontFamily: "InstrumentSerifItalic",
    fontSize: 40,
    marginLeft: 10,
  },
  image: {
    flex: 1,
    display: "flex",
    alignItems: "flex-start",
    backgroundColor: "#000000",
    justifyContent: "center",
    objectFit: "cover",
    width: "100%",
  },
  glassCard: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  subtitle: {
    color: "#ffffff",
    fontSize: 50,
    fontFamily: "InstrumentSerifItalic",
  },
  button: {
    backgroundColor: "#000000",
    borderRadius: 5,
    padding: 12,
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 0.7,
  },
});
