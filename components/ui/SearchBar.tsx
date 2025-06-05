import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  DimensionValue,
} from "react-native";
import { Search, SlidersHorizontal } from "lucide-react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from "react-native-reanimated";

export default function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const inputWidth = useSharedValue("100%");

  const handleFocus = () => {
    setIsFocused(true);
    inputWidth.value = withTiming("85%", { duration: 200 });
  };

  const handleBlur = () => {
    setIsFocused(false);
    inputWidth.value = withTiming("100%", { duration: 200 });
  };

  const inputStyle = useAnimatedStyle(() => {
    return {
      width: inputWidth.value as DimensionValue,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.inputContainer, inputStyle]}>
        <Search size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search for any event"
          placeholderTextColor="#888"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  filterButton: {
    padding: 12,
  },
});
