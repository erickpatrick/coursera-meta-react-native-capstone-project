import { Image, Text, View } from "react-native";

export default function MenuListItem({ title, image, description, price }) {
    return <View style={{ marginVertical: 16, }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 16, width: '100%', alignItems: 'center' }}>
            <View style={{ flex: 1, gap: 8 }}>
                <Text style={{ color: '#495e57' }} numberOfLines={2}>{description}</Text>
                <Text style={{ color: '#495e57', fontWeight: 'bold' }}>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                    price,
                )}</Text>
            </View>
            <Image
                source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true` }}
                style={{ width: 75, height: 75, }}
            />
        </View>
    </View>
}