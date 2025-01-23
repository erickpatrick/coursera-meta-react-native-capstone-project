import { Image, Text, View } from "react-native";

export default function ProfileAvatar({ userData }) {
    const initials = userData.firstname
        ? userData.firstname.slice(0, 1) + userData.lastname.slice(0, 1)
        : 'JD'

    const image = userData.profilePicture

    return (image ? <Image source={{ uri: image }} style={{ width: 50, height: 50, borderRadius: "100%" }} /> : <View>
        <Text style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 11,
            borderRadius: "100%",
            fontSize: 24,
            backgroundColor: '#62d6c4',
            color: 'white',
            fontWeight: 'semibold'
        }}>{initials.toUpperCase()}</Text>
    </View>)
}