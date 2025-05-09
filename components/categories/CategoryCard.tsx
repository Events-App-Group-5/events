import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Category } from "@/types/category";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const scale = useSharedValue(1);
  const brightness = useSharedValue(0.6);

  const handlePressIn = () => {
    scale.value = withSpring(0.96);
    brightness.value = withTiming(0.8);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    brightness.value = withTiming(0.6);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const overlayStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: `rgba(0,0,0,${brightness.value})`,
    };
  });

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.container, animatedStyle]}>
        <ImageBackground
          source={{ uri: category.imageUrl }}
          style={styles.image}
          imageStyle={styles.imageStyle}
        >
          <Animated.View style={[styles.overlay, overlayStyle]}>
            <Text style={styles.title}>{category.name}</Text>
          </Animated.View>
        </ImageBackground>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 120,
    borderRadius: 16,
    overflow: "hidden",
    marginRight: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageStyle: {
    borderRadius: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
