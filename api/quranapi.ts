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

export const getSurahList = async (): Promise<Surah[]> => {
  try {
    const response = await axios.get('http://api.alquran.cloud/v1/quran/quran-uthmani');
    const responseData = response.data;

    if (!responseData?.data?.surahs) {
      throw new Error("Invalid data: 'surahs' property is missing or undefined");
    }

    // Map the surahs to exclude ayahs for the list view
    return responseData.data.surahs.map((surah: any) => ({
      number: surah.number,
      name: surah.name,
      englishName: surah.englishName,
      englishNameTranslation: surah.englishNameTranslation,
      revelationType: surah.revelationType
    }));
  } catch (error) {
    throw error;
  }
};


export const getSurah = async (surahNumber: number): Promise<Surah> => {
  try {
    const response = await axios.get('http://api.alquran.cloud/v1/quran/quran-uthmani');
    const responseData = response.data;

    if (!responseData?.data?.surahs) {
      throw new Error("Invalid data: 'surahs' property is missing or undefined");
    }

    const surahData = responseData.data.surahs.find((s: any) => s.number === surahNumber);
    if (!surahData) {
      throw new Error(`Surah with number ${surahNumber} not found`);
    }

    const surah: Surah = {
      number: surahData.number,
      name: surahData.name,
      englishName: surahData.englishName,
      englishNameTranslation: surahData.englishNameTranslation,
      revelationType: surahData.revelationType,
      ayahs: surahData.ayahs.map((ayahData: any) => ({
        number: ayahData.number,
        text: ayahData.text,
        numberInSurah: ayahData.numberInSurah,
        juz: ayahData.juz,
        manzil: ayahData.manzil,
        page: ayahData.page,
        ruku: ayahData.ruku,
        hizbQuarter: ayahData.hizbQuarter,
        sajda: ayahData.sajda
      }))
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
