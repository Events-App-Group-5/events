import { auth } from "@/FirebaseConfig";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{
            uri: "https://avatar.iran.liara.run/public/26",
          }}
          style={styles.avatar}
        />
        <Text style={styles.title}>
          {auth.currentUser?.email || "Loading..."}
        </Text>

        <TouchableOpacity
          onPress={() => {
            alert("Signing Out...");
            auth.signOut();
            router.push("/");
          }}
          style={styles.logOut}
        >
          <Text style={styles.logOutTxt}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logOut: {
    backgroundColor: "red",
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
    width: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logOutTxt: {
    color: "white",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
});
