import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

function SearchFilterItem({ item, setFilters }) {
    const [checked, setChecked] = useState(false)
    return <Pressable onPress={(_) => {
        setFilters((previous) => {
            if (checked) {
                return previous.filter(prev => prev != item.category)
            }

            return [...previous, item.category]
        })
        setChecked(() => !checked)
    }}>
        <Text style={{
            padding: 8,
            borderRadius: 12,
            fontWeight: 'bold',
            backgroundColor: checked ? "#f4ce15" : "#edefee",
            color: "#495e57",
            textTransform: 'capitalize'
        }}>{item.category}</Text>
    </Pressable>
}

export default function SearchFilter({ categories, setFilters }) {
    return <View style={{ display: 'flex', marginVertical: 8 }}>
        <Text style={{ marginVertical: 16, fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase' }}>Order for delivery!</Text>
        <ScrollView horizontal={true} style={{ display: 'flex', width: "100%", paddingBottom: 16, borderBottomColor: "#efefef", borderBottomWidth: 1 }}>
            <View style={{ display: 'flex', flexDirection: 'row', width: "100%", gap: 16 }}>
                {categories.map(item => <SearchFilterItem item={item} key={item.category} setFilters={setFilters} />)}
            </View>
        </ScrollView >
    </View>
}