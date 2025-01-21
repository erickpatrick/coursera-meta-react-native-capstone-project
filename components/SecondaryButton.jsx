import { Pressable, Text, View } from "react-native";

export default function SecondaryButton({ action, children }) {
    return <View style={{
        width: '100%',
    }}>
        <Pressable onPress={action}>
            <Text style={{
                borderRadius: 8,
                borderWidth: 1,
                paddingVertical: 8,
                width: '100%',
                borderColor: '#e1b659',
                backgroundColor: "#f4ce15",
                fontWeight: 'bold',
                textAlign: 'center'
            }}>{children}</Text>
        </Pressable>
    </View>
}