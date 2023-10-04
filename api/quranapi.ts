// Purpose: API for fetching Quran data from http://api.alquran.cloud/v1/surah
import axios from "axios";
interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  surah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
  // Add other Ayah properties if needed
}

export interface QuranApi {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  ayahs: Ayah[];
  // Add other Surah properties if needed
}

export const getQuranApi = async (): Promise<{ surahs: QuranApi[] }> => {
  await delay(200 + Math.floor(Math.random() * 2000));
  try {
    const response = await axios.get("http://api.alquran.cloud/v1/surah");
    const responseData = response.data;

    // Check if the required properties are present in the API response
    if (!responseData?.data) {
      throw new Error("Invalid data: 'data' property is missing or undefined");
    }

    // The response appears to be an array of Surahs directly, so you can map it to QuranApi
    const surahs: QuranApi[] = responseData.data.map((surah: any) => ({
      number: surah.number,
      name: surah.name,
      englishName: surah.englishName,
      englishNameTranslation: surah.englishNameTranslation,
      numberOfAyahs: surah.numberOfAyahs,
      revelationType: surah.revelationType,
      // Add any additional properties here if needed
    }));

    return { surahs };
  } catch (error) {
    throw error;
  }
};

// // Adding a new function for a second API call
// export const getQuranUthmaniApi = async (): Promise<{ ayah: Surah[] }> => {
//   await delay(200 + Math.floor(Math.random() * 2000));
//   try {
//     const response = await axios.get(
//       "http://api.alquran.cloud/v1/quran/quran-uthmani"
//     );
//     const responseData = response.data;

//     if (!responseData?.data) {
//       throw new Error("Invalid data: 'data' property is missing or undefined");
//     }

//     // The response appears to be an array of Surahs directly, so you can map it to Surah
//     const ayah: Surah[] = responseData.data.surahs.map((ayah: any) => ({
//       number: ayah.number,
//       name: ayah.name,
//       englishName: ayah.englishName,
//       englishNameTranslation: ayah.englishNameTranslation,
//       revelationType: ayah.revelationType,
//       ayahs: ayah.ayahs,
//       // Add any additional properties here if needed
//     }));

//     return { ayah };
//   } catch (error) {
//     throw error;
//   }
// };

function delay(t: number) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, t);
  });
}
