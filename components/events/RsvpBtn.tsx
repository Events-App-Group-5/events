import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { database, auth } from "@/FirebaseConfig";
import { ref, get, update } from "firebase/database";
const RsvpBtn = ({ eventId }: { eventId: number }) => {
  const saveEventForUser = async (eventId: number) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("No authenticated user");
      }

      const uid = user.uid;
      const userRef = ref(database, `users/${uid}`);

      // Get current user data
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        throw new Error("User not found in database");
      }

      const userData = snapshot.val();
      const savedEvents = userData.savedEvents || [];

      if (!savedEvents.includes(eventId)) {
        savedEvents.push(eventId);

        // Update the savedEvents array
        await update(userRef, { savedEvents });
        console.log("Event saved!");
        alert("Event Saved");
      } else {
        console.log("Event already saved.");
        alert("Event Already Saved");
      }
    } catch (error: any) {
      console.error("Error saving event:", error.message);
    }
  };
  const userEmail = auth.currentUser?.email;
  if (!userEmail) {
    console.error("No user is currently signed in");
    return;
  }
  return (
    <TouchableOpacity
      style={styles.rsvpButton}
      onPress={() => saveEventForUser(eventId)}
    >
      <Text style={styles.rsvpText}>RSVP</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
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
export default RsvpBtn;
