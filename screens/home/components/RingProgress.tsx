import { StyleSheet, Text, View } from "react-native";
import React, { FC, useEffect } from "react";
import { Circle, Svg } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type RingProps = {
  radius?: number;
  strokeWidth?: number;
  progress: number;
};

const RingProgress: FC<RingProps> = ({
  radius = 100,
  strokeWidth = 35,
  progress,
}) => {
  const color = "#EE0F55";
  const innerRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * innerRadius;
  const fillAmount = useSharedValue(0);

  useEffect(() => {
    fillAmount.value = withTiming(progress, { duration: 1500 });
  }, [progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDasharray: [circumference * fillAmount.value, circumference],
  }));

  return (
    <View style={[styles.container, { width: radius * 2, height: radius * 2 }]}>
      <Svg>
        <Circle
          cx={radius}
          cy={radius}
          r={innerRadius}
          fill={"transparent"}
          stroke={color}
          strokeWidth={strokeWidth}
          opacity={0.2}
        />
        <AnimatedCircle
          animatedProps={animatedProps}
          cx={radius}
          cy={radius}
          r={innerRadius}
          fill={"transparent"}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          rotation={-90}
          origin={`${radius}, ${radius}`}
        />
      </Svg>
      <AntDesign
        name="arrowright"
        size={strokeWidth * 0.8}
        color="black"
        style={{
          position: "absolute",
          alignSelf: "center",
          top: strokeWidth * 0.1,
        }}
      />
    </View>
  );
};

export default RingProgress;

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
  },
});
