import { StatusBar, View } from "react-native";
import React from "react";
import CalendarContainer from "@/screens/calendar/containers/CalendarContainer";

const Calendar = () => {
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        justifyContent: "center",
        backgroundColor: "#25292e",
        padding: 24,
      }}
    >
      <StatusBar
        barStyle={"light-content"}
        animated
        backgroundColor={"#25292e"}
      />
      <CalendarContainer />
    </View>
  );
};

export default Calendar;
