import axios from "axios";

// 1. Define interfaces
export interface Ayah {
  number: number;
  text: string;
  translation: string;
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
  } catch (error: any) {
    // Handle the error gracefully, perhaps logging it or informing the user about the issue
    console.error("Error fetching Surah list:", error.message);
    throw error;
  }
};


export const getSurahWithTranslation = async (surahNumber: number): Promise<Surah> => {
  try {
    // Fetch the original Surah data
    const arabicResponse = await axios.get('http://api.alquran.cloud/v1/quran/quran-uthmani');
    const arabicData = arabicResponse.data;
    console.log(arabicData);

    if (!arabicData?.data?.surahs) {
      throw new Error("Invalid data: 'surahs' property is missing or undefined");
    }

    // Fetch the translation
    const translationResponse = await axios.get(`http://api.alquran.cloud/v1/quran/en.asad`);
    const translationData = translationResponse.data;
    console.log(translationData);

    if (!translationData?.data?.surahs) {
      throw new Error("Invalid data from Translation endpoint: 'surahs' property is missing or undefined");
    }

    const arabicSurahData = arabicData.data.surahs.find((s: any) => s.number === surahNumber);
    const translationSurahData = translationData.data.surahs.find((s: any) => s.number === surahNumber);

    if (!arabicSurahData || !translationSurahData) {
      throw new Error(`Surah with number ${surahNumber} not found`);
    }

    const mergedAyahs = arabicSurahData.ayahs.map((ayahData: any, index: number) => ({
      number: ayahData.number,
      text: ayahData.text,
      translation: translationSurahData.ayahs[index].text,
      numberInSurah: ayahData.numberInSurah,
      juz: ayahData.juz,
      manzil: ayahData.manzil,
      page: ayahData.page,
      ruku: ayahData.ruku,
      hizbQuarter: ayahData.hizbQuarter,
      sajda: ayahData.sajda
    }));

    const surah: Surah = {
      number: arabicSurahData.number,
      name: arabicSurahData.name,
      englishName: arabicSurahData.englishName,
      englishNameTranslation: arabicSurahData.englishNameTranslation,
      revelationType: arabicSurahData.revelationType,
      ayahs: mergedAyahs
    };

    return surah;

  } catch (error: any) {
    // Handle the error gracefully, perhaps logging it or informing the user about the issue
    console.error("Error fetching Surah with translation:", error.message);
    throw error;
  }
};

const delay = (t: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, t);
  });
};
