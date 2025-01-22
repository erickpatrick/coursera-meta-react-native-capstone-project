import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function FormCheckbox({ label, value, notifications, onChangeNotifications }) {
    const [checked, setChecked] = useState(value)
    return <Pressable
        style={{ marginBottom: 16, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}
        onPress={(_) => {
            setChecked(!checked)
            onChangeNotifications(notifications.map(item => {
                if (item.label == label) { item.value = !checked }
                return item
            }))
        }}>
        <View style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 20,
            height: 20,
            borderColor: "#495e57",
            borderWidth: 1,
            borderRadius: 4,
            backgroundColor: checked ? '#495e57' : 'white'
        }}>
            <Text style={{
                display: checked ? 'flex' : 'none',
                fontSize: 14,
                fontWeight: 'bold',
                color: "white"
            }}>&#x2713;</Text>
        </View>
        <Text style={{ textTransform: 'capitalize' }}>{label.replace('_', ' ')}</Text>
    </Pressable>
}