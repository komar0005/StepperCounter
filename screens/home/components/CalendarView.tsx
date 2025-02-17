import useStore from "@/store/store";
import React from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { StyleSheet } from "react-native";

LocaleConfig.locales["es"] = {
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  monthNamesShort: [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ],
  dayNames: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ],
  dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
};

LocaleConfig.defaultLocale = "es";

const CalendarView = () => {
  const completedDays = useStore((state) => state.completedDays);
  const today = new Date().toISOString().split("T")[0];

  const markedDates: {
    [key: string]: {
      selected?: boolean;
      selectedColor?: string;
      marked?: boolean;
      dotColor?: string;
      today?: boolean;
    };
  } = Object.keys(completedDays).reduce((acc: { [key: string]: any }, date) => {
    acc[date] = {
      selected: true,
      selectedColor: "#EE0F55",
    };
    return acc;
  }, {});

  markedDates[today] = {
    ...markedDates[today],
    marked: true,
    dotColor: "'blue'",
    today: true,
  };

  return (
    <Calendar
      markedDates={markedDates}
      markingType="custom"
      theme={{
        calendarBackground: "#fff",
        selectedDayBackgroundColor: "#EE0F55",
        selectedDayTextColor: "#fff",
        todayTextColor: "#EE0F55",
        dayTextColor: "#333",
        textDisabledColor: "#ccc",
        arrowColor: "#EE0F55",
        monthTextColor: "#EE0F55",
        textDayFontFamily: "Roboto",
        textMonthFontFamily: "Roboto",
        textDayHeaderFontFamily: "Roboto",
        textDayFontSize: 16,
        textMonthFontSize: 18,
        textDayHeaderFontSize: 14,
      }}
      style={styles.calendar}
    />
  );
};

export default CalendarView;

const styles = StyleSheet.create({
  calendar: {
    marginTop: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "#fff",
  },
});
