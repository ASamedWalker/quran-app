import React, { useState } from "react";
import { Link } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  Pressable,
} from "react-native";
// import { useFonts } from "expo-font";
// import * as SplashScreen from 'expo-splash-screen';
import { useQuery } from "@tanstack/react-query";
import { getSurahList, Surah } from "@/api/quranapi";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Animated } from "react-native";

import Card from "@/components/Card";
import { categoryData } from "@/constants";

const Home = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);

  // Fetching the list of Surahs
  const surahListQuery = useQuery({
    queryKey: ["surahList"],
    queryFn: getSurahList,
    refetchOnMount: false,
  });

  const renderItem1: ListRenderItem<Surah> = ({ item }) => (
    <Card
      englishName={item?.englishName ?? ""}
      englishNameTranslation={item?.englishNameTranslation ?? ""}
      surahNumber={item?.number ?? 0}
    />
  );

  // const scale = useRef(new Animated.Value(1)).current;

  // const surahPressIn = () => {
  //   Animated.timing(scale, {
  //     toValue: 0.97,
  //     duration: 200,
  //     useNativeDriver: true,
  //   }).start();
  // };

  // const surahPressOut = () => {
  //   Animated.timing(scale, {
  //     toValue: 1,
  //     duration: 200,
  //     useNativeDriver: true,
  //   }).start();
  // };

  const renderItem2: ListRenderItem<Surah> = ({ item: surah }) => (
    <Link
      href={
        {
          pathname: `/surahDetails?surahNumber=${surah.number}`,
          searchParams: {
            surahNumber: surah.number.toString(),
            surahName: surah.englishName,
          },
        } as any
      }
      asChild
    >
      <Pressable>
        <Animated.View style={[styles.surahContainer]}>
          <View style={styles.surahMain}>
            <View style={styles.numberIconWrapper}>
              <MaterialCommunityIcons
                name="octagram-outline"
                size={wp(10)}
                color="black"
              />
              <Text style={styles.surahNumber}>{surah.number}</Text>
            </View>
            <View style={styles.surahTextContainer}>
              <Text style={[styles.surahEnglishName, { fontFamily: "" }]}>
                {surah.englishName}
              </Text>

              <Text style={styles.surahDetails}>
                {surah.number} Ayahs | {surah.revelationType}
              </Text>
            </View>
            <Text style={styles.surahName}>{surah.name}</Text>
          </View>
        </Animated.View>
      </Pressable>
    </Link>
  );

  if (surahListQuery.isLoading) {
    return <ActivityIndicator />;
  }

  if (surahListQuery.isError) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error fetching data</Text>
        <Pressable
          onPress={() => surahListQuery.refetch()}
          style={styles.retryButton}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        scrollEventThrottle={16} // for better performance
      >
        <View style={styles.container}>
          <View style={styles.textWrapper}>
            {/* Title head for last read*/}
            <Text style={styles.itemText}>Last Read</Text>
            {/* <Link href="modal">Present Modal</Link> */}
          </View>

          {/* <Card title="Quran" content="Nice things." /> */}
          <View style={styles.flashListWrapper}>
            <FlashList
              data={surahListQuery.data || []}
              renderItem={renderItem1}
              horizontal={true}
              estimatedItemSize={200}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.number.toString()}
            />
          </View>
          {/* Title head for categories*/}
          <View style={styles.headerBar}>
            {categoryData.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.categoryContainer,
                  index === activeCategoryIndex && styles.activeCategory,
                ]}
              >
                <Pressable
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? 0.7 : 1,
                      flex: 1, // Ensure it takes up all space within the outer View
                      backgroundColor: pressed ? "#A37C2770" : "transparent",
                    },
                  ]}
                  onPress={() => setActiveCategoryIndex(index)}
                >
                  <Text style={styles.categoryItemText}>{item.name}</Text>
                </Pressable>
              </View>
            ))}
          </View>
          <View style={styles.flashListContainer}>
            <FlashList
              data={surahListQuery.data || []}
              renderItem={renderItem2}
              horizontal={false}
              estimatedItemSize={200}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.number.toString()}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Ensures the content fills the scroll view
    paddingBottom: hp(5),
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F1E8", // Updated background color
    alignItems: "center",
    minHeight: hp(100),
    minWidth: wp(100),
  },
  textWrapper: {
    width: wp(95),
    marginTop: hp(5),
    marginBottom: hp(2.5), // Added margin bottom
  },
  itemText: {
    fontSize: wp(5),
    fontWeight: "bold",
    color: "#3D3D3D", // Darker text color for better readability
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  headerBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#A3875B", // Updated to the primary color
    borderRadius: 10,
    width: wp(95),
    marginTop: 10,
    padding: 10,
  },
  categoryItemText: {
    color: "#5B3E28", // Surface color (almost white) for text on primary background
    fontSize: hp(2.5),
  },
  flashListWrapper: {
    height: hp("15%"), // this will take up 30% of the screen's height
    width: wp("100%"), // this ensures it takes up the full width
    marginBottom: hp("2%"), // adding some bottom margin for separation
  },
  surahContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: wp(100), // Assuming you want it to take the full width
    padding: wp(3),
    marginBottom: wp(2),
    borderBottomWidth: wp(0.1), // Add this line for the bottom border
    borderBottomColor: "#ccc", // This specifies the border color. Adjust as needed.
    borderRadius: wp(1),
  },
  surahTextContainer: {
    flexDirection: "column",
    width: wp(60),
    marginRight: wp(2),
  },
  surahNumber: {
    fontSize: wp(4),
    position: "absolute",
    color: "black",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -wp(2.5) }, { translateY: -wp(2.5) }],
  },
  surahMain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: wp(95),
  },
  surahEnglishName: {
    fontSize: wp(4),
    color: "#3D3D3D",
    width: wp(55),
    marginBottom: wp(1),
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7ede2", // Customize the error container style
  },
  surahName: {
    fontSize: wp(5),
    fontWeight: "bold",
    flex: 1,
    overflow: "hidden",
  },
  surahDetails: {
    fontSize: wp(3.5),
    color: "#A3875B",
    width: wp(55),
  },
  surahAyahs: {
    fontSize: wp(5),
  },
  surahRevelationType: {
    fontSize: wp(4),
  },
  flashListContainer: {
    width: wp(100),
    minHeight: hp(100), // This will make it span the entire height
  },
  numberIconWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: wp(10),
    height: wp(10),
    position: "relative",
    marginRight: wp(2), // Spacing between icon and text
  },
  categoryContainer: {
    paddingVertical: 5, // Padding to give pill effect
    paddingHorizontal: 10, // Padding to give pill effect
    marginHorizontal: 5, // Spacing between categories
    borderRadius: 15, // Rounded corners
    backgroundColor: "transparent", // Default background
  },
  activeCategory: {
    backgroundColor: "#FEF3E0",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

  fontPicker: {
    position: "absolute",
    width: "100%",
    height: "50%",
    backgroundColor: "white",
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1000, // This ensures the modal appears above all other content.
  },
  fontOption: {
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  retryButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#A37C27",
    borderRadius: 8,
    elevation: 3,
  },
  retryButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  scrollTopButton: {
    position: "absolute",
    right: 15,
    bottom: 15,
    backgroundColor: "#A37C27",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
