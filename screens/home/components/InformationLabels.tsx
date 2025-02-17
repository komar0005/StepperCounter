import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { valueFormatter } from "@/lib/utils/valueFormatter";
import { ValueFormats } from "@/services/types/format";

type InformationProps = {
  title: string;
  value: number;
  type?: ValueFormats;
};

const InformationLabels: FC<InformationProps> = ({
  title,
  value,
  type = "standard",
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text_title}>{title}</Text>
      <Text style={styles.text_value}>{valueFormatter(value, type)}</Text>
    </View>
  );
};

export default InformationLabels;

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  text_title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  text_value: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#AFB3BE",
  },
});
