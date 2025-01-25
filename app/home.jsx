import Header from '@/components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MenuListItem from '../components/MenuListItem';
import * as SQLite from 'expo-sqlite';
import SearchFilter from '../components/SearchFilter';

const URL_API_MENU = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json'

export default function Home() {
    const navigation = useNavigation();
    const [userData, setUserdata] = useState({ firstname: 'J', lastname: 'D' })
    const [image, setImage] = useState(null);
    const [menu, setMenu] = useState([])
    const [categories, setCategories] = useState([])
    let db

    useEffect(() => {
        (async () => {
            try {
                setImage(await AsyncStorage.getItem("@ProfilePicture") || null)
                db = await SQLite.openDatabaseAsync('LittleLemonMennu');

                if (await AsyncStorage.getItem("@MenuInStorage") === 'true') {
                    const dbMenu = await db.getAllAsync("SELECT * FROM menu;");
                    const categories = await db.getAllAsync("SELECT DISTINCT category FROM menu;");
                    setCategories(categories)
                    setMenu(dbMenu)
                    return dbMenu;
                }

                const response = await fetch(URL_API_MENU)
                const result = await response.json()
                setMenu(result.menu)
                setCategories(result.menu.filter(item => { category: item.category }))
                await db.runAsync(
                    'INSERT INTO menu (name, description, price, image, category) VALUES ' +
                    result.menu.map(item => `("${item.name}", "${item.description}", "${item.price}", "${item.image}", "${item.category}")`).join(',')
                );
                await AsyncStorage.setItem("@MenuInStorage", 'true')
            } catch (e) {
                console.log("Problem getting menu content from API or DB >> ", e)
            }
        })()
    }, [])

    useEffect(() => {
        navigation.setOptions({ headerShown: false, title: 'Profile', });
    }, [navigation]);

    useEffect(() => {
        setUserdata({ ...userData, profilePicture: image })
    }, [image])

    useEffect(() => {
        //console.log(menu)
    }, [menu])

    useEffect(() => {
        // console.log(categories)
    }, [categories])

    return <View style={{ flex: 1, backgroundColor: 'white' }}>
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
            <Header userData={userData} showBackButton={false} />

            <SearchFilter categories={categories} />

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