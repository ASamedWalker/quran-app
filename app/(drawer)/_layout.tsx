import React from "react";
import { View, Text } from "react-native";
import { Drawer } from "expo-router/drawer";

const DrawerLayout = () => {
  return (
    <Drawer screenOptions={{ headerShown: false, swipeEdgeWidth: 0}}>
      <Drawer.Screen
        name="Home"
        options={{
          drawerLabel: "Home",
          title: "Home",
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
