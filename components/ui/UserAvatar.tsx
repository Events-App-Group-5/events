import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function UserAvatar() {
  const scale = useSharedValue(1);

  const handlePress = () => {
    scale.value = withSpring(1.1, {}, () => {
      scale.value = withSpring(1);
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <Image
          source={{
            uri: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
          }}
          style={styles.avatar}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 32,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
