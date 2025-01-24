import Header from '@/components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
    const navigation = useNavigation();
    const [userData, setUserdata] = useState({ firstname: 'J', lastname: 'D' })
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            setImage(await AsyncStorage.getItem("@ProfilePicture") || null)
        })()
    }, [])

    useEffect(() => {
        navigation.setOptions({ headerShown: false, title: 'Profile', });
    }, [navigation]);

    useEffect(() => {
        setUserdata({ ...userData, profilePicture: image })
    }, [image])

    return <View style={{ flex: 1, backgroundColor: 'white' }}>
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
            <Header userData={userData} showBackButton={false} />
        </SafeAreaView>
    </View>
}