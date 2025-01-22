import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '@/components/Header';
import ProfileSectionTitle from '@/components/ProfileSectionTitle'
import SecondaryButton from '@/components/SecondaryButton';
import FormInput from '@/components/FormInput';
import FormCheckbox from '../components/FormCheckbox';

export default function Profile() {
  const navigation = useNavigation();
  const router = useRouter()
  const [userData, setUserdata] = useState({})

  const [firstname, setFirstname] = useState(userData['@ProfileFirstname'] || '')
  const [lastname, setLastname] = useState(userData['@ProfileLastname'] || '')
  const [email, setEmail] = useState(userData['@ProfileEmail'] || '')
  const [phone, setPhone] = useState(userData['@ProfilePhone'] || '')
  const [notifications, setNotifications] = useState(JSON.parse(userData['@ProfileNotifications'] || null) || [
    { "label": "order_statuses", "value": false },
    { "label": "password_changes", "value": false },
    { "label": "special_offers", "value": false },
    { "label": "newsletter", "value": false }
  ])

  function logout(_event) {
    (async function () { await AsyncStorage.clear() })()
    router.dismissAll()
  }

  useEffect(() => {
    (async function () {
      try {
        // converts results into object
        // await AsyncStorage.clear()
        setUserdata(Object.fromEntries(
          await AsyncStorage.multiGet(['@ProfileUsername', '@ProfileFirstname', '@ProfileLastname'])
        ))
      } catch (e) {
        console.log("Error getting data ou AsyncStorage in Profile >>", e)
      }
    })()
  }, [])

  useEffect(() => {
    navigation.setOptions({ headerShown: false, title: 'Profile', });
  }, [navigation]);

  return <View style={{ flex: 1, backgroundColor: 'white' }}>
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Header userData={userData} />

      <View style={{
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 8,
        width: "100%",
        alignItems: "flex-start"
      }}>
        <ProfileSectionTitle>Personal information</ProfileSectionTitle>
        <FormInput label="First name" value={firstname} onChangeValue={setFirstname} />
        <FormInput label="Last name" value={lastname} onChangeValue={setLastname} />
        <FormInput label="Email" value={email} onChangeValue={setEmail} keyboardType="email-address" />
        <FormInput label="Phone number" value={phone} onChangeValue={setPhone} keyboardType="phone-pad" />

        <ProfileSectionTitle>E-mail notifications</ProfileSectionTitle>
        {notifications.map(item => <FormCheckbox
          key={item.label}
          label={item.label}
          value={item.value}
          notifications={notifications}
          onChangeNotifications={setNotifications} />)}

        <SecondaryButton action={logout}>Log out</SecondaryButton>
      </View>
    </SafeAreaView>
  </View>
}
