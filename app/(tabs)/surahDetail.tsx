import React from "react";
import { View, Text } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getQuranUthmaniApi } from "@/api/quranapi";
import { RouteProp } from '@react-navigation/native';


export type RootStackParamList = {
  Home: undefined;
  SurahDetail: { surahNumber: number };
};

type SurahDetailRouteProp = RouteProp<RootStackParamList, 'SurahDetail'>;

const SurahDetail = ({route}: {route: SurahDetailRouteProp}) => {
  const { surahNumber } = route.params;

  useQuery({
    queryKey: ["quranUthmani", surahNumber],
    queryFn: () => getQuranUthmaniApi(surahNumber),
    refetchOnMount: false,
  });

  return (
    <View>
      <Text>surahDetail</Text>
    </View>
  );
};

export default SurahDetail;
