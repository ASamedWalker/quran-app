import React, { useState } from "react";
import { useLocalSearchParams, Stack } from "expo-router";
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
        }}
      >
        <Stack.Screen name="(tabs)" options={{ title: "Home" }} />
        <Stack.Screen name="surahDetails" options={{title: 'Default Title'}} />
      </Stack>
    </QueryClientProvider>
  );
};

export default HomeLayout;
