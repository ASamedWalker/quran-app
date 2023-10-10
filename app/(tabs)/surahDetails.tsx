import React from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { getSurahByNumber } from "@/api/quranapi";

const SurahDetails: React.FC = () => {
  // Access the params from the URL.
  const { surahId } = useLocalSearchParams<{ surahId: string }>();

  const surahQuery = useQuery({
    queryKey: ["surah", surahId],
    queryFn: () => getSurahByNumber(Number(surahId)),
    refetchOnMount: false,
  });

  if (surahQuery.isLoading) {
    return <Text>Loading...</Text>;
  }

  if (surahQuery.isError) {
    return <Text>Error: {surahQuery.error.message}</Text>;
  }

  const surah = surahQuery.data;

  return (
    <View>
      <Text>{surah.name}</Text>
      <Text>{surah.englishName}</Text>
      <FlashList
        data={surah.ayahs}
        renderItem={({ item: ayah }) => <Text>{ayah.text}</Text>}
      />
    </View>
  );
};

export default SurahDetails;
