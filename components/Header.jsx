import BackButton from '@/components/BackButton';
import LittleLemonLogo from '@/components/LittleLemonLogo';
import ProfileAvatar from '@/components/ProfileAvatar';
import { View } from "react-native";

export default function Header({ userData, showBackButton }) {
    return <View style={{
        flexDirection: 'row',
        marginBottom: 20,
        height: 50,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
    }}>
        {showBackButton ? <BackButton /> : <View style={{ width: 32, height: 32 }} />}
        <LittleLemonLogo />
        <ProfileAvatar userData={userData} />
    </View>
}