import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Audio } from "expo-av";
import { useQuery } from "@tanstack/react-query";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { getSurahWithTranslation, Ayah } from "@/api/quranapi";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SurahDetails: React.FC = () => {
  const [sound, setSound] = useState<Audio.Sound>();
  // Access the params from the URL.
  const { surahNumber: surahNumberString, surahName } = useLocalSearchParams<{
    surahNumber: string;
    surahName: string;
  }>();
  const surahNumberInt = parseInt(surahNumberString, 10);

  const surahDetailsQuery = useQuery({
    queryKey: ["surahDetails", surahNumberInt],
    queryFn: () => getSurahWithTranslation(surahNumberInt),
    refetchOnMount: false,
    enabled: !!surahNumberInt, // only run the query if surahNumber exists
    // onSuccess: (data) => {
    //   console.log("Data fetched successfully: ", data);
    // },
    // onError: (error) => {
    //   console.error("Error fetching data: ", error);
    // },
  });

  async function playSound(url: string) {
    console.log("Attempting to play:", url);
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: url });
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  if (surahDetailsQuery.isLoading) {
    return <Text>Loading...</Text>;
  }

  if (surahDetailsQuery.isError) {
    const err = surahDetailsQuery.error as Error;
    return <Text>Error: {err.message}</Text>;
  }

  const renderItem1: ListRenderItem<Ayah> = ({ item: ayah, index }) => (
    <View
      style={[
        styles.ayahContainer,
        { backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#e6dbc8" },
      ]}
    >
      <Text style={styles.ayahText}>{ayah.text}</Text>
      {ayah.translation && (
        <Text style={styles.translationText}>{ayah.translation}</Text>
      )}
      <Text style={styles.ayahDetails}>
        Ayah: {ayah.numberInSurah} | Juz: {ayah.juz} | Page: {ayah.page}
      </Text>
      {ayah.sajda ? <Text style={styles.sajdaText}>Contains Sajda</Text> : null}
      <Button title="Play Ayah" onPress={() => ayah.audioUrl && playSound(ayah.audioUrl)} />

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
    alignItems: "center",
    justifyContent: "center",
    padding: wp("4%"),
    paddingLeft: wp("4%"), // Add horizontal padding
    paddingRight: wp("4%"), // Add horizontal padding
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  ayahText: {
    fontSize: wp("5%"),
    textAlign: "center",
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
    fontSize: wp("4%"),
    color: "#666",
    marginTop: wp("1%"),
    textAlign: "center",
  },
});

export default SurahDetails;
