import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export const unstable_settings = {
  initialRouteName: 'onboarding'
};

export default function RootLayout() {
  const router = useRouter()

  useEffect(() => {
    // check if user already went through onboarding, and if yes, go to /profile
    try {
      (async function () {
        if (await AsyncStorage.getItem('@UserFinishedOnboarding')) {
          router.navigate('/profile')
        }
      })();
    } catch (e) {
      // saving error
      console.log(e)
    }
  }, [])

  return <Stack />;
}
