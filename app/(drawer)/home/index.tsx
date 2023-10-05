import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { DrawerToggleButton } from "@react-navigation/drawer";

import { Drawer } from "../_layout";

const Page = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24 }}>Index page of Home Drawer</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Page;
