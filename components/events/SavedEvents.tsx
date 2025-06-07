import React, { useState, useRef, useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import EventCard from "./EventCard";
import PaginationIndicator from "@/components/ui/PaginationIndicator";
import { Event } from "@/types/event";
import { database, auth } from "@/FirebaseConfig";
import { get, ref } from "firebase/database";
import { Text } from "react-native";

export default function SavedEvents() {
  const [savedEvents, setSavedEvents] = useState<any[] | null>(null);

  const flatListRef = useRef<FlatList>(null);
  const getSavedEventsForUser = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("No authenticated user");
      }

      const uid = user.uid;
      const userRef = ref(database, `users/${uid}`);

      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        throw new Error("User not found in database");
      }

      const userData = snapshot.val();
      const savedEvents = userData.savedEvents || [];

      readEvents(savedEvents);
    } catch (error: any) {
      console.error("Error retrieving saved events:", error.message);
      return [];
    }
  };
  const readEvents = async (savedIds: number[]) => {
    try {
      const [eventsSnapshot] = await Promise.all([
        get(ref(database, "events")),
      ]);
      if (eventsSnapshot.exists()) {
        const events = Object.values(eventsSnapshot.val()) as Event[];
        setSavedEvents(
          events.filter((event) => savedIds.includes(event.id)) || null
        );
      } else {
        console.log("No events data available");
      }
    } catch (error) {
      console.error("Error reading data:", error);
    }
  };
  getSavedEventsForUser();

  useEffect(() => {
    getSavedEventsForUser();
  }, []);
  return (
    <>
      {savedEvents && savedEvents.length > 0 ? (
        <View style={styles.container}>
          <FlatList
            ref={flatListRef}
            data={savedEvents}
            renderItem={({ item }) => (
              <View style={{ marginTop: 26 }}>
                <EventCard event={item} />
              </View>
            )}
            keyExtractor={(item) => item.imageUrl}
            showsHorizontalScrollIndicator={false}
            snapToInterval={286} // card width + marginRight
            snapToAlignment="start"
            decelerationRate="fast"
            contentContainerStyle={styles.listContent}
          />
        </View>
      ) : (
        <View>
          <Text>No events Found</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  listContent: {
    paddingVertical: 8,
    paddingLeft: 4,
    paddingRight: 16,
  },
});
