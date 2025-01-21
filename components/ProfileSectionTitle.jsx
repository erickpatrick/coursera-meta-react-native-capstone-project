import { Text } from "react-native"

export default function ProfileSectionTitle({ children }) {
    return <Text style={{
        marginBottom: 16,
        fontWeight: 'bold',
        fontSize: 18,
        color: '#555'
    }}>{children}</Text>
}