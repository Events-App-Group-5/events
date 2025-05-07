import { Link, useRouter } from "expo-router";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";

export default function Example() {
  const router = useRouter();
  const image = require("../assets/images/friends.jpg");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <View style={styles.hero}>
            <Image source={image} style={styles.heroImage} resizeMode="cover" />
          </View>
          <Text style={styles.title}>Ready to meet your tribe?</Text>
          <Text style={styles.text}>
            Keep track of the hottest and greatest events in your location so
            you can sourround yourself with your tribe
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            router.push("/sign-in");
          }}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 48,
    fontWeight: "500",
    fontFamily: "InstrumentSerifItalic",
    color: "#281b52",
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 50,
  },
  text: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "400",
    color: "#9992a7",
    textAlign: "center",
    fontFamily: "SpaceMonoRegular",
  },
  /** Hero */
  hero: {
    margin: 12,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  heroImage: {
    width: 250,
    height: 250,
    borderRadius: 10,
    transform: "rotate(-5deg)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  /** Content */
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  contentHeader: {
    paddingHorizontal: 24,
    gap: 30,
  },
  appName: {
    backgroundColor: "#fff2dd",
    paddingHorizontal: 6,
  },
  appNameText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#281b52",
  },
  /** Button */
  button: {
    backgroundColor: "#075eec",
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#fff",
  },
});
