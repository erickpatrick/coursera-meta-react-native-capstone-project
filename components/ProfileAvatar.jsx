import { Image, Text, View } from "react-native";

export default function ProfileAvatar({ userData }) {
    const initials = (userData["@ProfileFirstname"] && userData["@ProfileFirstname"].slice(0, 2))
        || (userData["@ProfileLastname"] && userData["@ProfileLastname"].slice(0, 2))
        || (userData["@ProfileUsername"] && userData["@ProfileUsername"].slice(0, 2)) || 'JD'

    const image = userData["@ProfilePicture"]

    return (image ? <Image src={image} /> : <View>
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