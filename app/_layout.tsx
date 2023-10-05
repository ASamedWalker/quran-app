import React, { useState } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Drawer } from "expo-router/drawer";

const queryClient = new QueryClient();

const HomeLayout = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#e6dbc8",
          },
          headerTintColor: "#e6dbc8",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => (
            <Pressable>
              <Ionicons
                name="ios-menu-outline"
                size={34}
                color="black"
                style={{ marginLeft: 10, marginTop: 2 }}
              />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => {
                /* Your action for the right icon */
              }}
            >
              <Ionicons
                name="search-outline"
                size={32}
                color="black"
                style={{ marginRight: 5, marginTop: 2 }}
              />
            </Pressable>
          ),
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{ title: "Home", headerTitle: "" }}
        />
        <Stack.Screen
          name="modal"
          options={{
            title: "Modal Screen",
            presentation: "modal",
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
};


export default HomeLayout;
