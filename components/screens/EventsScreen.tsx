import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchBar from "@/components/ui/SearchBar";
import SectionHeader from "@/components/ui/SectionHeader";
import EventList from "@/components/events/EventList";
import CategoryList from "@/components/categories/CategoryList";
import UserAvatar from "@/components/ui/UserAvatar";
import { mockEvents, mockPopularEvents } from "@/data/mockEvents";
import { mockCategories } from "@/data/mockCategories";
import { database } from "@/FirebaseConfig";
import { get, onValue, ref } from "firebase/database";

export default function EventsScreen() {
  const [events, setEvents] = useState<any>(null);
  const readEvents = async () => {
    try {
      const snapshot = await get(ref(database, "events"));
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log(data[1]);
        const newData = data.map((item: any, i: any) => {
          if (i > 0) {
            return item;
          }
        });
        setEvents(newData);
      } else {
        console.log("No data available");
        return null;
      }
    } catch (error) {
      console.error("Error reading data:", error);
      return null;
    }
  };
  useEffect(() => {
    readEvents();
  }, []);
  //console.log("Events: ", events);

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
        <EventList events={events} />
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
