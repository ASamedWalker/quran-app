import React from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { getSurah, Ayah } from "@/api/quranapi";

const SurahDetails: React.FC = () => {
  // Access the params from the URL.
  const { surahNumber: surahNumberString } = useLocalSearchParams<{
    surahNumber: string;
  }>();
  const surahNumberInt = parseInt(surahNumberString, 10);

  const surahDetailsQuery = useQuery({
    queryKey: ["surahDetails", surahNumberInt],
    queryFn: () => getSurah(surahNumberInt),
    refetchOnMount: false,
    enabled: !!surahNumberInt, // only run the query if surahNumber exists
    onSuccess: (data) => {
      console.log("Data fetched successfully: ", data);
    },
    onError: (error) => {
      console.error("Error fetching data: ", error);
    },
  });

  if (surahDetailsQuery.isLoading) {
    return <Text>Loading...</Text>;
  }

  if (surahDetailsQuery.isError) {
    const err = surahDetailsQuery.error as Error;
    return <Text>Error: {err.message}</Text>;
  }

  const renderItem1: ListRenderItem<Ayah> = ({ item: ayah }) => (
    <View>
      <Text>{ayah.text}</Text>
    </View>
  );

  // Check if surah data exists
  if (!surahDetailsQuery.data || !surahDetailsQuery.data.ayahs) {
    return <Text>No Surah Data Available</Text>;
  }

  const surah = surahDetailsQuery.data;

  return (
    <View style={{ flex: 1, minHeight: 200 }}>
      <FlashList
        data={surah.ayahs}
        renderItem={renderItem1}
        estimatedItemSize={50}
      />
    </View>
  );
};

export default SurahDetails;
