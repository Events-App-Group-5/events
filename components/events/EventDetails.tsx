import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { database } from "@/FirebaseConfig";
import { get, ref } from "firebase/database";
import { Event } from "@/types/event";
import RsvpBtn from "./RsvpBtn";

type EventDetailsProps = {
  // Hero section props
  heroImage?: string;
  id: number;
  eventDate?: string;
  eventLocation?: string;
  eventTitle?: string;
  rating?: number;
  maxRating?: number;
  userAvatar?: string;

  // Details section props
  description?: string;
  fullDescription?: string;

  // Event details props
  eventDateTime?: string;
  eventTime?: string;
  venueName?: string;
  venueAddress?: string;

  // Handlers
  onReadMore?: () => void;
  onRSVP?: () => void;
};

const EventDetails: React.FC<EventDetailsProps> = ({ id }) => {
  const [event, setEvent] = useState<Event | null>(null);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= rating; i++) {
      stars.push(
        <Text
          key={i}
          style={[styles.star, { color: i <= rating ? "#FFD700" : "#E0E0E0" }]}
        >
          ★
        </Text>
      );
    }
    return stars;
  };

  const readEvents = async () => {
    try {
      const [eventsSnapshot] = await Promise.all([
        get(ref(database, "events")),
      ]);
      if (eventsSnapshot.exists()) {
        const events = Object.values(eventsSnapshot.val()) as Event[];
        setEvent(events.find((event) => event.id === id) || null);
      } else {
        console.log("No events data available");
      }
    } catch (error) {
      console.error("Error reading data:", error);
    }
  };
  useEffect(() => {
    readEvents();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {event ? (
          <View>
            {/* Hero Section */}
            <ImageBackground
              source={{ uri: event?.imageUrl }}
              style={styles.heroSection}
              imageStyle={styles.heroImage}
            >
              <View style={styles.heroOverlay}>
                <View style={styles.heroContent}>
                  <View style={styles.eventInfo}></View>
                  <Text style={styles.eventDate}>{event.date}</Text>
                  <Text style={styles.eventLocation}>{event?.location}</Text>
                </View>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <View style={styles.ratingContainer}>
                  {renderStars(event?.rating!)}
                </View>
              </View>

              {/* </View> */}
            </ImageBackground>

            {/* Content Section */}
            <View style={styles.contentSection}>
              <Text style={styles.contentTitle}>{event.title}</Text>
              <Text style={styles.description}>{event.description}</Text>

              {/* Event Details */}
              <Text style={styles.sectionTitle}>Event Details</Text>
              <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                  <View style={styles.iconContainer}>
                    <Text style={styles.icon}>📅</Text>
                  </View>
                  <View style={styles.detailContent}>
                    <Text style={styles.detailTitle}>{event.date}</Text>
                  </View>
                </View>
                <View style={styles.detailItem}>
                  <View style={styles.iconContainer}>
                    <Text style={styles.icon}>📍</Text>
                  </View>
                  <View style={styles.detailContent}>
                    <Text style={styles.detailTitle}>{event.location}</Text>
                  </View>
                </View>
              </View>

              {/* RSVP Button */}
              <RsvpBtn eventId={event.id} />
            </View>
          </View>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Loading...</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  heroSection: {
    height: 300,
    width: "100%",
  },
  heroImage: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 20,
    justifyContent: "space-between",
  },
  heroContent: {
    flex: 1,
    justifyContent: "flex-end",
  },
  eventInfo: {
    marginBottom: 8,
  },
  eventDate: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
    opacity: 0.9,
  },
  eventLocation: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.8,
  },
  eventTitle: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 12,
    lineHeight: 42,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    fontSize: 20,
    marginRight: 2,
  },
  avatarContainer: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "#fff",
  },
  contentSection: {
    padding: 24,
  },
  contentTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666",
    marginBottom: 16,
  },
  readMoreButton: {
    alignSelf: "flex-start",
    marginBottom: 32,
  },
  readMoreText: {
    fontSize: 16,
    color: "#00C851",
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 24,
  },
  detailsContainer: {
    marginBottom: 32,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#E9ECEF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  icon: {
    fontSize: 18,
  },
  detailContent: {
    flex: 1,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  detailSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  rsvpButton: {
    backgroundColor: "#00C851",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  rsvpText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});

export default EventDetails;
