import React, { useState, useRef } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import EventCard from "./EventCard";
import PaginationIndicator from "@/components/ui/PaginationIndicator";
import { Event } from "@/types/event";

interface EventListProps {
  events: Event[];
}

export default function EventList({ events }: EventListProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / 286); // card width + marginRight
    if (index !== currentIndex && index >= 0 && index < events.length) {
      setCurrentIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={events}
        renderItem={({ item }) => <EventCard event={item} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        snapToInterval={286} // card width + marginRight
        snapToAlignment="start"
        decelerationRate="fast"
        contentContainerStyle={styles.listContent}
      />
      <PaginationIndicator total={events.length} current={currentIndex} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  listContent: {
    paddingLeft: 0,
    paddingRight: 16,
  },
});
