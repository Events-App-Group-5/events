import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Star, Bookmark } from "lucide-react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withSequence,
  withDelay,
} from "react-native-reanimated";
import { Event } from "@/types/event";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const [isFavorite, setIsFavorite] = useState(event.isFavorite);
  const scale = useSharedValue(1);
  const bookmarkScale = useSharedValue(1);

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(0.95, { damping: 10 }),
      withDelay(100, withSpring(1))
    );
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    bookmarkScale.value = withSequence(
      withSpring(1.3, { damping: 10 }),
      withDelay(100, withSpring(1))
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const bookmarkStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: bookmarkScale.value }],
    };
  });

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <Image source={{ uri: event.imageUrl }} style={styles.image} />

        <Animated.View style={[styles.favoriteButton, bookmarkStyle]}>
          <TouchableOpacity onPress={handleFavorite}>
            <Bookmark
              size={24}
              color={isFavorite ? "#4CAF50" : "white"}
              fill={isFavorite ? "#4CAF50" : "transparent"}
            />
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.content}>
          <Text style={styles.dateLocation}>
            {event.date} • {event.location}
          </Text>
          <Text style={styles.title} numberOfLines={1}>
            {event.title}
          </Text>
          <View style={styles.ratingContainer}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={16}
                color="#FFD700"
                fill={index < event.rating ? "#FFD700" : "transparent"}
              />
            ))}
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 270,
    borderRadius: 16,
    backgroundColor: "white",
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
    height: 150,
    resizeMode: "cover",
  },
  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
    padding: 8,
  },
  content: {
    padding: 16,
  },
  dateLocation: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#181818",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
  },
});
