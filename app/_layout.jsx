import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from "expo-router";
import { useEffect, createContext, useState } from "react";
import * as SQLite from 'expo-sqlite';

export const unstable_settings = {
  initialRouteName: 'onboarding'
};

export const AvatarContext = createContext({ firstname: 'N', lastname: 'A', image: '' })

export default function RootLayout() {
  const router = useRouter()
  const [avatar, setAvatar] = useState({ firstname: 'N', lastname: 'A', image: '' })

  useEffect(() => {
    // check if user already went through onboarding, and if yes, go to /profile
    try {
      (async function () {
        if (await AsyncStorage.getItem('@UserFinishedOnboarding')) {
          router.navigate('/home')
        }

        const db = await SQLite.openDatabaseAsync('LittleLemonMenu');
        await db.execAsync(`
          PRAGMA journal_mode = WAL;
          CREATE TABLE IF NOT EXISTS menu (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, category TEXT NOT NULL, description TEXT NOT NULL, image TEXT NOT NULL, price TEXT NOT NULL);
          `);
      })();
    } catch (e) {
      // saving error
      console.log(e)
    }
  }, [])

  return <AvatarContext.Provider value={{ avatar, setAvatar }}>
    <Stack />
  </AvatarContext.Provider>;
}
