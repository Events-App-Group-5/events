import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SectionHeader from "@/components/ui/SectionHeader";
import EventList from "@/components/events/EventList";
import CategoryList from "@/components/categories/CategoryList";
import { database } from "@/FirebaseConfig";
import { get, ref } from "firebase/database";

export default function EventsScreen() {
  const [events, setEvents] = useState<any[] | null>(null);
  const [categories, setCategories] = useState<any[] | null>(null);
  const readEvents = async () => {
    try {
      const [eventsSnapshot, categoriesSnapshot] = await Promise.all([
        get(ref(database, "events")),
        get(ref(database, "categories")),
      ]);

      if (eventsSnapshot.exists()) {
        setEvents(Object.values(eventsSnapshot.val()).filter(Boolean));
      } else {
        console.log("No events data available");
      }

      if (categoriesSnapshot.exists()) {
        setCategories(Object.values(categoriesSnapshot.val()).filter(Boolean));
      } else {
        console.log("No categories data available");
      }
    } catch (error) {
      console.error("Error reading data:", error);
    }
  };
  useEffect(() => {
    readEvents();
  }, []);

  const today = new Date();
  const options = { weekday: "short", month: "long", day: "numeric" } as const;
  const formattedDate = today
    .toLocaleDateString("en-US", options)
    .toUpperCase();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.title}>All Events</Text>
      </View>
      {events && Array.isArray(events) && events.length > 0 && (
        <View style={styles.section}>
          <SectionHeader title="Events near you" />
          <EventList events={events} />
        </View>
      )}
      {categories && Array.isArray(categories) && categories.length > 0 && (
        <View style={styles.section}>
          <SectionHeader title="Categories" />
          <CategoryList categories={categories} />
        </View>
      )}
      {events && Array.isArray(events) && events.length > 0 && (
        <View style={styles.section}>
          <SectionHeader title="Popular Events" />
          <EventList
            events={events.filter((item) => item.isPopular === true)}
          />
        </View>
      )}
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
    gap: 40,
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
    marginBottom: 8,
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
