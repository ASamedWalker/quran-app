import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { getSurahWithTranslation, Ayah } from "@/api/quranapi";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SurahDetails: React.FC = () => {
  // Access the params from the URL.
  const { surahNumber: surahNumberString } = useLocalSearchParams<{
    surahNumber: string;
  }>();
  const surahNumberInt = parseInt(surahNumberString, 10);

  const surahDetailsQuery = useQuery({
    queryKey: ["surahDetails", surahNumberInt],
    queryFn: () => getSurahWithTranslation(surahNumberInt),
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
    <View style={styles.ayahContainer}>
      <Text style={styles.ayahText}>{ayah.text}</Text>
      {ayah.translation && (
        <Text style={styles.translationText}>{ayah.translation}</Text>
      )}
      <Text style={styles.ayahDetails}>
        Ayah: {ayah.numberInSurah} | Juz: {ayah.juz} | Page: {ayah.page}
      </Text>
      {ayah.sajda ? <Text style={styles.sajdaText}>Contains Sajda</Text> : null}
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

const styles = StyleSheet.create({
  ayahContainer: {
    padding: wp("2%"),
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  ayahText: {
    fontFamily: "UthmanicHafs",
    fontSize: wp("5%"),
    textAlign: "right",
  },
  ayahDetails: {
    fontSize: wp("3%"),
    color: "#888",
    marginTop: wp("1%"),
  },
  sajdaText: {
    color: "#D9534F",
    marginTop: wp("1%"),
  },
  translationText: {
    fontFamily: "Roboto",
    fontSize: wp("4%"),
    color: "#666",
    marginTop: wp("1%"),
  },
});

export default SurahDetails;

