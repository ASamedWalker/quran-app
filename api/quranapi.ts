import axios from "axios";

// 1. Define interfaces
export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  ayahs: Ayah[];
}

export const getAllSurahs = async (): Promise<Surah[]> => {
  try {
    const response = await axios.get('http://api.alquran.cloud/v1/surahs');
    const responseData = response.data;

    if (!responseData?.data) {
      throw new Error("Invalid data: 'data' property is missing or undefined");
    }



    return responseData.data;
  } catch (error) {
    throw error;
  }
};


 export const getSurahByNumber = async (surahNumber: number): Promise<Surah> => {
  try {
    const response = await axios.get(
      `http://api.alquran.cloud/v1/surah/${surahNumber}`
    );
    const responseData = response.data;

    if (!responseData?.data) {
      throw new Error("Invalid data: 'data' property is missing or undefined");
    }

    const surah: Surah = {
      number: responseData.data.number,
      name: responseData.data.name,
      englishName: responseData.data.englishName,
      englishNameTranslation: responseData.data.englishNameTranslation,
      revelationType: responseData.data.revelationType,
      ayahs: responseData.data.ayahs,
    };

    return surah;
  } catch (error) {
    throw error;
  }
};

const delay = (t: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, t);
  });
};
