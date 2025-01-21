import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import LittleLemonLogo from '@/components/LittleLemonLogo';

export default function Profile() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false, title: 'Profile', });
  }, [navigation]);

  return <View style={{ flex: 1, backgroundColor: 'white' }}>
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <View style={{ height: 50, width: "100%", alignItems: "center" }}>
        <LittleLemonLogo />
      </View>
      <View style={{ width: "100%", alignItems: "flex-start" }}>
        <Text>Profile page</Text>
      </View>
    </SafeAreaView>
  </View>
}
