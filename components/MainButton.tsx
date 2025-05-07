import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";

const MainButton = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}) => {
  return (
    <TouchableOpacity {...props} style={[styles.button, props.style]}>
      <LinearGradient colors={["#2F80ED", "#1C55B3"]} style={styles.gradient}>
        <Text style={styles.btnText}>{children}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 20,
  },
  gradient: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
export default MainButton;
