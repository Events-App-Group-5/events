import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolateColor,
  useDerivedValue,
} from "react-native-reanimated";

interface PaginationIndicatorProps {
  total: number;
  current: number;
}

export default function PaginationIndicator({
  total,
  current,
}: PaginationIndicatorProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, index) => (
        <Indicator key={index} isActive={index === current} />
      ))}
    </View>
  );
}

interface IndicatorProps {
  isActive: boolean;
}

function Indicator({ isActive }: IndicatorProps) {
  const active = useDerivedValue(() => (isActive ? 1 : 0));

  const dotStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        active.value,
        [0, 1],
        ["#E0E0E0", "#FF9800"]
      ),
      width: isActive ? 24 : 8,
    };
  });

  return <Animated.View style={[styles.dot, dotStyle]} />;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});
