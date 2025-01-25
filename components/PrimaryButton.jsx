import { Pressable, Text, View } from "react-native";

export default function PrimaryButton({ action, disabled, children }) {
    return <View>
        <Pressable onPress={action} disabled={!disabled}>
            <Text style={{
                borderRadius: 8,
                borderWidth: 1,
                padding: 8,
                width: '100%',
                height: 'auto',
                borderColor: '#495e57',
                backgroundColor: !disabled ? "#7c8e8a" : "#495e57",
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center'
            }}>{children}</Text>
        </Pressable>
    </View>
}