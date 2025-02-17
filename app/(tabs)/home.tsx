import HomeContainer from "@/screens/home/containers/HomeContainer";
import { Stack } from "expo-router";
import { StatusBar, Text, View } from "react-native";

export default function Home() {
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
      <HomeContainer />
    </View>
  );
}
