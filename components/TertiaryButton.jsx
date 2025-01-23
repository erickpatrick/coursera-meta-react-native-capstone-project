import { Pressable, Text, View } from "react-native";

export default function TertiaryButton({ action, children }) {
    return <View style={{
    }}>
        <Pressable onPress={action}>
            <Text style={{
                borderRadius: 8,
                borderWidth: 1,
                padding: 8,
                width: '100%',
                borderColor: '#495e57',
                backgroundColor: "white",
                color: 'gray',
                fontWeight: 'bold',
                textAlign: 'center'
            }}>{children}</Text>
        </Pressable>
    </View>
}