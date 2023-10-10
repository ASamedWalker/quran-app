import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";


interface CardProps {
  englishName: string;
  englishNameTranslation: string;
  surahNumber: number;
}

const Card = ({
  englishName,
  englishNameTranslation,
  surahNumber,
}: CardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.versetitle}>{englishName}</Text>
      <Text style={styles.versecontent}>{englishNameTranslation}</Text>
      <Text style={styles.versecontent}>Verses: {surahNumber}</Text>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#cfb893",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: hp(1),
      height: hp(1),
    },

  },
  versetitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  versecontent: {
    fontSize: 16,
  },
});
