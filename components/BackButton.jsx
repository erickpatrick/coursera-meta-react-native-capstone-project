import { Pressable, Text, View } from "react-native";

export default function BackButton() {
    return <View>
        <Pressable>
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