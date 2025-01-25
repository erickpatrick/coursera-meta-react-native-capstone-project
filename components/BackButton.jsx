import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function BackButton() {
    const router = useRouter()
    return <Text onPress={() => router.dismiss()} style={{
        height: 50,
        width: 50,
        display: 'flex',
        textAlign: 'center',
        padding: 16,
        borderRadius: '100%',
        backgroundColor: '#495e57',
        color: 'white',
        fontWeight: 'bold'
    }}>←</Text>
}