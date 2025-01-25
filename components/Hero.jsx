import { Image, Text, TextInput, View } from "react-native";
import heroImage from '../assets/images/Heroimage.png'
import { useFonts } from "expo-font";
import Fontisto from '@expo/vector-icons/Fontisto';

export default function Hero({ query, setQuery }) {
    const [_loaded, _error] = useFonts({
        'Karla': require('../assets/fonts/Karla-Regular.ttf'),
        'MarkaziText': require('../assets/fonts/MarkaziText-Regular.ttf'),
    });

    return <View style={{
        backgroundColor: '#495e57',
        display: 'flex',
        padding: 16
    }}>
        <Text style={{
            fontFamily: 'MarkaziText',
            fontSize: 54,
            lineHeight: 48,
            marginBottom: 0,
            color: '#e1b659'
        }}>Little Lemon</Text>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 16, marginBottom: 16 }}>
            <View style={{ display: 'flex', flex: 1, gap: 16 }}>
                <Text style={{ fontFamily: 'MarkaziText', fontSize: 36, lineHeight: 32, color: 'white' }}>Chicago</Text>
                <Text style={{ fontSize: 18, color: 'white' }}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a moder twist.</Text>
            </View>
            <Image source={heroImage} style={{ height: 150, width: 130, objectFit: 'cover', borderRadius: 16 }} />
        </View>
        <View style={{ display: query == undefined ? 'none' : 'flex', position: 'relative' }}>
            <Fontisto style={{ position: 'absolute', zIndex: 10, top: 12, left: 12 }} name="search" size={16} color="black" />
            <TextInput
                style={{
                    backgroundColor: '#efefef',
                    borderColor: "lightgray",
                    borderWidth: 1,
                    width: "100%",
                    padding: 12,
                    paddingLeft: 36,
                    borderRadius: 8
                }}
                onChangeText={setQuery}
                value={query}
            />
        </View>
    </View>
}