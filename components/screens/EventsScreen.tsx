import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchBar from "@/components/ui/SearchBar";
import SectionHeader from "@/components/ui/SectionHeader";
import EventList from "@/components/events/EventList";
import CategoryList from "@/components/categories/CategoryList";
import UserAvatar from "@/components/ui/UserAvatar";
import { mockEvents, mockPopularEvents } from "@/data/mockEvents";
import { mockCategories } from "@/data/mockCategories";

export default function EventsScreen() {
  const today = new Date();
  const options = { weekday: "short", month: "long", day: "numeric" } as const;
  const formattedDate = today
    .toLocaleDateString("en-US", options)
    .toUpperCase();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <SearchBar />
        </View>
        <UserAvatar />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.title}>All Events</Text>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Events near you" />
        <EventList events={mockEvents} />
      </View>

      <View style={styles.section}>
        <SectionHeader title="Categories" />
        <CategoryList categories={mockCategories} />
      </View>

      <View style={styles.section}>
        <SectionHeader title="Popular Events" />
        <EventList events={mockPopularEvents} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  searchContainer: {
    flex: 1,
    marginRight: 16,
  },
  titleContainer: {
    marginBottom: 24,
  },
  date: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#181818",
  },
  section: {
    marginBottom: 32,
  },
});
