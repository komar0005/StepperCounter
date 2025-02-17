import { Tabs } from "expo-router";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  type ViewStyle,
  type TouchableOpacityProps,
} from "react-native";
import type React from "react";
import { useRef, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import type { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";

type TabBarIconProps = {
  name: string;
  color: string;
  size: number;
  focused: boolean;
  index: number;
};

export default function Layout() {
  const tabAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(tabAnimation, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  }, [tabAnimation]);

  const animateTab = (index: number) => {
    Animated.sequence([
      Animated.timing(tabAnimation, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(tabAnimation, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }),
    ]).start();
  };

  const TabBarIcon: React.FC<TabBarIconProps> = ({
    name,
    color,
    size,
    focused,
    index,
  }) => {
    const scale = tabAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1],
    });

    const translateY = tabAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [10, focused ? -30 : 0],
    });

    return (
      <Animated.View
        style={[
          styles.iconContainer,
          {
            transform: [{ scale }, { translateY }],
          },
        ]}
      >
        <View
          style={[
            styles.iconBackground,
            focused && styles.activeIconBackground,
          ]}
        >
          {name === "footsteps" ? (
            <Ionicons
              name="footsteps"
              size={focused ? size + 8 : size}
              color={color}
            />
          ) : (
            <FontAwesome5
              name={name as any}
              size={focused ? size + 8 : size}
              color={color}
            />
          )}
        </View>
      </Animated.View>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          freezeOnBlur: true,
          headerShown: false,
          tabBarStyle: styles.footer as ViewStyle,
          tabBarInactiveTintColor: "#fff",
          tabBarActiveTintColor: "#fff",
          tabBarButton: (props: BottomTabBarButtonProps) => (
            <TouchableOpacity {...(props as TouchableOpacityProps)} />
          ),
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: (props) => (
              <TabBarIcon {...props} name="footsteps" index={0} />
            ),
          }}
          listeners={{
            tabPress: () => animateTab(0),
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            tabBarIcon: (props) => (
              <TabBarIcon {...props} name="calendar-alt" index={1} />
            ),
          }}
          listeners={{
            tabPress: () => animateTab(1),
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 20,
    height: 60,
    backgroundColor: "#EE0F55",
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginHorizontal: 20,
    paddingBottom: 10,
  },
  iconContainer: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 1,
    marginBottom: 20,
  },
  iconBackground: {
    backgroundColor: "transparent",
    borderRadius: 32,
    padding: 15,
    position: "relative",
  },
  activeIconBackground: {
    backgroundColor: "#EE0F55",
    marginBottom: -20,
  },
});
