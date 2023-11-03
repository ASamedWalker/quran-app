import React, { useState } from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const HomeLayout = () => {
  const { surahNumber: surahNumberString, surahName } = useLocalSearchParams<{
    surahNumber: string;
    surahName: string;
  }>();
  const surahNumberInt = parseInt(surahNumberString, 10);

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
        <Stack.Screen name="surahDetails" options={{ title: "Surah Details" }} />

      </Stack>
    </QueryClientProvider>
  );
};

export default HomeLayout;
