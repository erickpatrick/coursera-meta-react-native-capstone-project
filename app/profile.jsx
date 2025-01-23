import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '@/components/Header';
import ProfileSectionTitle from '@/components/ProfileSectionTitle'
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';
import TertiaryButton from '@/components/TertiaryButton';
import FormInput from '@/components/FormInput';
import FormCheckbox from '@/components/FormCheckbox';

export default function Profile() {
  const navigation = useNavigation();
  const router = useRouter()
  const [userData, setUserdata] = useState({ firstname: 'J', lastname: 'D' })

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [orderStatuses, setOrderStatuses] = useState('')
  const [passwordChanges, setPasswordChanges] = useState('')
  const [specialOffers, setSpecialOffers] = useState('')
  const [newsletter, setNewsletter] = useState('')

  function logout(_event) {
    (async function () { await AsyncStorage.clear() })()
    router.dismissAll()
  }

  function onPressSaveButton() {
    (async function () {
      await AsyncStorage.setItem("@ProfileFirstname", firstname)
      await AsyncStorage.setItem("@ProfileLastname", lastname)
      await AsyncStorage.setItem("@ProfilePhone", phone)
      await AsyncStorage.setItem("@ProfileEmail", email)
      await AsyncStorage.setItem("@ProfileNotificationOrderStatuses", orderStatuses)
      await AsyncStorage.setItem("@ProfileNotificationPasswordChanges", passwordChanges)
      await AsyncStorage.setItem("@ProfileNotificationSpecialOffers", specialOffers)
      await AsyncStorage.setItem("@ProfileNotificationNewsletter", newsletter)
    })()
    alert('saved')
  }

  async function retrieveAllFromAsyncStorage() {
    setFirstname(await AsyncStorage.getItem("@ProfileFirstname") || '')
    setLastname(await AsyncStorage.getItem("@ProfileLastname") || '')
    setPhone(await AsyncStorage.getItem("@ProfilePhone") || '')
    setEmail(await AsyncStorage.getItem("@ProfileEmail") || '')
    setOrderStatuses(await AsyncStorage.getItem("@ProfileNotificationOrderStatuses") || 'false')
    setPasswordChanges(await AsyncStorage.getItem("@ProfileNotificationPasswordChanges") || 'false')
    setSpecialOffers(await AsyncStorage.getItem("@ProfileNotificationSpecialOffers") || 'false')
    setNewsletter(await AsyncStorage.getItem("@ProfileNotificationNewsletter") || 'false')
  }

  useEffect(() => {
    (async () => {
      await retrieveAllFromAsyncStorage()
    })()
  }, [])

  useEffect(() => {
    navigation.setOptions({ headerShown: false, title: 'Profile', });
  }, [navigation]);

  useEffect(() => {
    setUserdata({ firstname, lastname })
  }, [firstname, lastname])

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
        <FormCheckbox label="Order statuses" value={orderStatuses} onChangeValue={setOrderStatuses} />
        <FormCheckbox label="Password changes" value={passwordChanges} onChangeValue={setPasswordChanges} />
        <FormCheckbox label="Special offers" value={specialOffers} onChangeValue={setSpecialOffers} />
        <FormCheckbox label="Newsletter" value={newsletter} onChangeValue={setNewsletter} />

        <SecondaryButton action={logout}>Log out</SecondaryButton>
        <View style={{ width: '100%', marginTop: 16, display: 'flex', flexDirection: 'row', gap: 16, justifyContent: 'center' }}>
          <TertiaryButton action={(async () => {
            await retrieveAllFromAsyncStorage()
          })}>Discard changes</TertiaryButton>
          <PrimaryButton action={onPressSaveButton}>Save changes</PrimaryButton>
        </View>
      </View>
    </SafeAreaView>
  </View>
}
