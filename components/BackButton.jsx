import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function BackButton() {
    const router = useRouter()
    return <View>
        <Pressable onPress={() => router.dismiss()}>
            <Text style={{
                borderRadius: '100%',
                paddingVertical: 14,
                paddingHorizontal: 16,
                backgroundColor: '#495e57',
                color: 'white',
                fontWeight: 'bold'
            }}>←</Text>
        </Pressable>
    </View>
}