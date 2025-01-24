import Header from '@/components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MenuListItem from '../components/MenuListItem';

const URL_API_MENU = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json'

export default function Home() {
    const navigation = useNavigation();
    const [userData, setUserdata] = useState({ firstname: 'J', lastname: 'D' })
    const [image, setImage] = useState(null);
    const [menu, setMenu] = useState([])

    useEffect(() => {
        (async () => {
            setImage(await AsyncStorage.getItem("@ProfilePicture") || null)

            if (await AsyncStorage.getItem("@MenuInStorage") === 'true') {
                // get from SQLite

                return;
            }

            const response = await fetch(URL_API_MENU)
            const result = await response.json()
            setMenu(result.menu)
        })()
    }, [])

    useEffect(() => {
        navigation.setOptions({ headerShown: false, title: 'Profile', });
    }, [navigation]);

    useEffect(() => {
        setUserdata({ ...userData, profilePicture: image })
    }, [image])

    useEffect(() => {
        console.log(menu)
    }, [menu])

    return <View style={{ flex: 1, backgroundColor: 'white' }}>
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
            <Header userData={userData} showBackButton={false} />

            <FlatList
                data={menu}
                renderItem={({ item }) => <MenuListItem
                    title={item.name}
                    image={item.image}
                    description={item.description}
                    price={item.price}
                />}
                ItemSeparatorComponent={() => (
                    <View style={{ backgroundColor: "#efefef", height: 1 }} />
                )}
                keyExtractor={item => item.name}
            />
        </SafeAreaView>
    </View>
}