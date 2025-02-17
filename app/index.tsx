import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

const StartPage = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.replace("/(tabs)/home");
    }, 2000);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <ActivityIndicator size="large" color="#4E148CAD" />
    </View>
  );
};

export default StartPage;
