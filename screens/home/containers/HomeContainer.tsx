import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import InformationLabels from "../components/InformationLabels";
import RingProgress from "../components/RingProgress";
import { Accelerometer, Pedometer } from "expo-sensors";
import useStore from "@/store/store";
import GoalInput from "../components/GoalInput";

const HomeContainer = () => {
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState(false);
  const [isAccelerometerAvailable, setIsAccelerometerAvailable] =
    useState(false);

  const dailyGoal = useStore((state) => state.dailyGoal);
  const markDayAsCompleted = useStore((state) => state.markDayAsCompleted);

  const STEP_THRESHOLD = 1.2;

  useEffect(() => {
    const checkPedometer = async () => {
      const available = await Pedometer.isAvailableAsync();
      setIsPedometerAvailable(available);

      if (available) {
        const subscription = Pedometer.watchStepCount((result) => {
          setCurrentStepCount(result.steps);
        });

        return () => subscription?.remove();
      }
    };

    checkPedometer();
  }, []);

  useEffect(() => {
    if (!isPedometerAvailable) {
      const checkAccelerometer = async () => {
        const available = await Accelerometer.isAvailableAsync();
        setIsAccelerometerAvailable(available);

        if (available) {
          Accelerometer.setUpdateInterval(100);
          const subscription = Accelerometer.addListener(({ x, y, z }) => {
            const acceleration = Math.sqrt(x * x + y * y + z * z);
            if (acceleration > STEP_THRESHOLD) {
              setCurrentStepCount((prev) => prev + 1);
            }
          });

          return () => subscription.remove();
        }
      };

      checkAccelerometer();
    }
  }, [isPedometerAvailable]);

  useEffect(() => {
    if (currentStepCount >= dailyGoal) {
      const today = new Date().toISOString().split("T")[0];
      if (!useStore.getState().completedDays[today]) {
        markDayAsCompleted(today);
      }
    }
  }, [currentStepCount, dailyGoal, markDayAsCompleted]);

  const calculateDistance = (steps: number) => {
    const feetPerStep = 2.5;
    const feetPerMile = 5280;
    return Number(((steps * feetPerStep) / feetPerMile).toFixed(2));
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    >
      <View style={styles.container}>
        <RingProgress
          radius={150}
          strokeWidth={50}
          progress={currentStepCount / dailyGoal}
        />
        <View style={styles.infoContainer}>
          <InformationLabels title="Steps" value={currentStepCount} />
          <InformationLabels
            title="Distance"
            value={calculateDistance(currentStepCount)}
            type="imperial"
          />
        </View>
        <InformationLabels
          title="Flights climbed"
          value={Math.floor(currentStepCount / 20)}
          type="standard"
        />
        <GoalInput />
      </View>
    </ScrollView>
  );
};

export default HomeContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -100,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  errorText: {
    color: "red",
    marginTop: 20,
  },
});
