import React from "react";
import { Pressable } from "react-native";
import { Link, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
            <Pressable
              onPress={() => {
                /* Your action for the left icon */
              }}
            >
              <Ionicons
                name="ios-menu-outline"
                size={34}
                color="black"
                style={{ marginLeft: 15 }}
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
                style={{ marginRight: 15 }}
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
