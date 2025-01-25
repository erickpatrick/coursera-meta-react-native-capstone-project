import { Link, useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

export default function ProfileAvatar({ userData }) {
    const router = useRouter()
    const initials = userData.firstname
        ? userData.firstname.slice(0, 1) + userData.lastname.slice(0, 1)
        : 'JD'

    const image = userData.profilePicture

    return <Link href="/profile" asChild>
        {image
            ? <Image source={{ uri: image }} style={{ width: 50, height: 50, borderRadius: "100%" }} />
            : <Text style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
                width: 50,
                padding: 11,
                borderRadius: "100%",
                fontSize: 24,
                backgroundColor: '#62d6c4',
                color: 'white',
                fontWeight: 'semibold'
            }}>{initials.toUpperCase()}</Text>
        }
    </Link>
}