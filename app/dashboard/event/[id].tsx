import React from "react";
import { View } from "react-native";
import EventDetails from "@/components/events/EventDetails";
import { useLocalSearchParams } from "expo-router";

const index = () => {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5", paddingTop: 50 }}>
      <EventDetails id={Number(id)} />
    </View>
  );
};
export default index;
