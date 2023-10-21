import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Haptics from "expo-haptics";

const TabsLayout = () => {
  const renderIcon = (focused: boolean, name: string) => {
    let iconName = focused ? name : `${name}-outline` as keyof typeof Ionicons.glyphMap;

    // Trigger haptic feedback for the active tab
    if (focused) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    return (
      <Ionicons
        name={iconName}
        size={focused ? 26 : 24} // Notice the size adjustment for active tab
        color={focused ? "#e91e63" : "gray"}
        style={{ transform: [{ scale: focused ? 1.1 : 1 }] }} // Slightly scale the active icon
      />
    );
  };
  return (
    <Tabs
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => (
          <BlurView
            tint="light"
            intensity={60}
            style={StyleSheet.absoluteFill}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => renderIcon(focused, "ios-home"),
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    backgroundColor: "transparent",
    borderRadius: wp("5%"), // use wp or hp as needed
    margin: wp("2.5%"), // adjust values as needed
    padding: wp("1%"),
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: wp("0%"), height: hp("0.25%") },
    shadowOpacity: 0.25,
    shadowRadius: wp("1%"),
  },
});

export default TabsLayout;
