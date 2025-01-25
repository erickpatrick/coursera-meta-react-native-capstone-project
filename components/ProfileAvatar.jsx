import { Link } from "expo-router";
import { Image, Pressable, Text } from "react-native";
import { AvatarContext } from "../app/_layout";
import { useContext } from "react";

export default function ProfileAvatar() {
    const { avatar } = useContext(AvatarContext)
    const initials = avatar.firstname == '' ? 'NA' : avatar.firstname.slice(0, 1) + avatar.lastname.slice(0, 1)

    return <Link href="/profile" asChild>
        <Pressable>
            {avatar.image
                ? <Image source={{ uri: avatar.image }} style={{ width: 50, height: 50, borderRadius: "100%" }} />
                : <Text style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 50,
                    width: 50,
                    paddingVertical: 12,
                    paddingHorizontal: 10,
                    borderRadius: "100%",
                    fontSize: 22,
                    backgroundColor: '#62d6c4',
                    color: 'white',
                    fontWeight: 'semibold'
                }}>{initials.toUpperCase()}</Text>
            }
        </Pressable>
    </Link>
}