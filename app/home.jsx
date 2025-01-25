import Header from '@/components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MenuListItem from '../components/MenuListItem';
import * as SQLite from 'expo-sqlite';
import SearchFilter from '../components/SearchFilter';
import Hero from '../components/Hero';

const URL_API_MENU = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json'

export default function Home() {
    const navigation = useNavigation();
    const [userData, setUserdata] = useState({ firstname: 'J', lastname: 'D' })
    const [image, setImage] = useState(null);
    const [menu, setMenu] = useState([])
    const [categories, setCategories] = useState([])
    const [filters, setFilters] = useState([])
    const [query, setQuery] = useState('')
    let db = (async () => {
        return await SQLite.openDatabaseAsync('LittleLemonMennu');
    })()

    useEffect(() => {
        (async () => {
            try {
                setImage(await AsyncStorage.getItem("@ProfilePicture") || null)
                db = await SQLite.openDatabaseAsync('LittleLemonMenu');

                if (await AsyncStorage.getItem("@MenuInStorage") === 'true') {
                    const categories = await db.getAllAsync("SELECT DISTINCT category FROM menu;");
                    setCategories(categories)
                    return;
                }

                const response = await fetch(URL_API_MENU)
                const result = await response.json()
                setMenu(result.menu)
                setCategories(result.menu.filter(item => { category: item.category }))
                await AsyncStorage.setItem("@MenuInStorage", 'true')
                await db.runAsync(
                    'INSERT INTO menu (name, description, price, image, category) VALUES ' +
                    result.menu.map(item => `("${item.name}", "${item.description}", "${item.price}", "${item.image}", "${item.category}")`).join(',')
                );
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
        (async () => {
            try {
                db = await SQLite.openDatabaseAsync('LittleLemonMenu');
                let select = "SELECT * FROM menu WHERE 1=1 "

                if (filters.length > 0) {
                    select += `AND category IN (${filters.map(category => `"${category}"`).join(',')}) `
                }

                if (query.length > 0) {
                    select += `AND name LIKE "%${query}%"`
                }

                select += ';'

                const dbMenu = await db.getAllAsync(select);
                setMenu(dbMenu)
            } catch (e) {
                console.log("ERROR WHILE FILTER OR QUERYING >> ", e)
            }
        })()
    }, [filters, query])

    return <View style={{ flex: 1, backgroundColor: 'white' }}>
        <SafeAreaView style={{ flex: 1, }}>
            <Header userData={userData} showBackButton={false} />

            <Hero query={query} setQuery={setQuery} />

            <View style={{ flex: 1, padding: 16 }}>
                <SearchFilter categories={categories} setFilters={setFilters} />

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
            </View>
        </SafeAreaView>
    </View>
}