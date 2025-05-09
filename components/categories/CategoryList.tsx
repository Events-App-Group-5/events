import React, { useState, useRef } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import CategoryCard from "./CategoryCard";
import PaginationIndicator from "@/components/ui/PaginationIndicator";
import { Category } from "@/types/category";

interface CategoryListProps {
  categories: Category[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / 196); // card width + marginRight
    if (index !== currentIndex && index >= 0 && index < categories.length) {
      setCurrentIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={categories}
        renderItem={({ item }) => <CategoryCard category={item} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        snapToInterval={196} // card width + marginRight
        snapToAlignment="start"
        decelerationRate="fast"
        contentContainerStyle={styles.listContent}
      />
      <PaginationIndicator total={categories.length} current={currentIndex} />
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
