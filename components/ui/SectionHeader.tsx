import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ChevronRight } from "lucide-react-native";

interface SectionHeaderProps {
  title: string;
  onSeeAllPress?: () => void;
}

export default function SectionHeader({
  title,
  onSeeAllPress,
}: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        style={styles.seeAllContainer}
        onPress={onSeeAllPress}
      ></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#181818",
  },
  seeAllContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4CAF50",
    marginRight: 2,
  },
});
