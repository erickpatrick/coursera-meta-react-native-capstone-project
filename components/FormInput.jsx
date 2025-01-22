import { Text, TextInput } from "react-native";

export default function FormInput({ label, value, onChangeValue }) {
    return <>
        <Text style={{
            marginBottom: 8,
            fontSize: 12,
            fontWeight: "bold",
            color: "gray"
        }}>{label}</Text>
        <TextInput
            style={{
                borderColor: "lightgray",
                borderWidth: 1,
                width: "100%",
                marginBottom: 24,
                padding: 12,
                borderRadius: 8
            }}
            onChangeText={onChangeValue}
            value={value}
        />
    </>
}