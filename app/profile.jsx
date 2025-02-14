import FormCheckbox from '@/components/FormCheckbox';
import FormInput from '@/components/FormInput';
import Header from '@/components/Header';
import PrimaryButton from '@/components/PrimaryButton';
import ProfileSectionTitle from '@/components/ProfileSectionTitle';
import SecondaryButton from '@/components/SecondaryButton';
import TertiaryButton from '@/components/TertiaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AvatarContext } from './_layout';
import parsePhoneNumber from 'libphonenumber-js'
import { validateEmail } from '../app/index'
import * as SQLite from 'expo-sqlite';

export default function Profile() {
  const navigation = useNavigation();
  const router = useRouter()
  const { setAvatar } = useContext(AvatarContext)

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [phone, setPhone] = useState('')
  const [isPhoneValid, setIsPhoneValid] = useState(true)
  const [orderStatuses, setOrderStatuses] = useState('')
  const [passwordChanges, setPasswordChanges] = useState('')
  const [specialOffers, setSpecialOffers] = useState('')
  const [newsletter, setNewsletter] = useState('')
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  function logout(_event) {
    (async function () { await AsyncStorage.clear() })();
    const db = SQLite.openDatabaseSync('LittleLemonMenu');
    db.execSync(`DROP TABLE menu;`)
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
      await AsyncStorage.setItem("@ProfilePicture", image)
    })()
    Alert.alert("Changes saved", "The changes made were properly saved")
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
    setImage(await AsyncStorage.getItem("@ProfilePicture") || null)
  }

  useEffect(() => {
    (async () => { await retrieveAllFromAsyncStorage() })()
  }, [])

  useEffect(() => {
    navigation.setOptions({ headerShown: false, title: 'Profile', });
  }, [navigation]);

  useEffect(() => {
    setAvatar({ firstname, lastname, image })
  }, [firstname, lastname, image])

  return <View style={{ flex: 1, backgroundColor: 'white' }}>
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Header showBackButton={true} />

      <ScrollView>
        <View style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 16, paddingVertical: 16, paddingBottom: 72, paddingHorizontal: 8, width: "100%", alignItems: "flex-start" }}>
          <ProfileSectionTitle>Personal information</ProfileSectionTitle>
          <Text style={{ marginBottom: 8, fontSize: 12, fontWeight: "bold", color: "gray" }}>Avatar</Text>
          <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 16, gap: 16, alignItems: 'center' }}>
            {image && <Image source={{ uri: image }} style={{ width: 50, height: 50, borderRadius: "100%" }} />}
            <PrimaryButton action={pickImage} disabled={true}>{image ? 'Change' : 'Select image'}</PrimaryButton>
            <TertiaryButton action={() => setImage('')}>Remove</TertiaryButton>
          </View>

          <FormInput label="First name" value={firstname} onChangeValue={setFirstname} />
          <FormInput label="Last name" value={lastname} onChangeValue={setLastname} />
          <FormInput label="Email" value={email} onChangeValue={(email) => {
            setEmail(email)
            setIsEmailValid(validateEmail(email))
          }} keyboardType="email-address" />
          <FormInput label="Phone number" value={phone} onChangeValue={(number) => {
            if (number.length > 0) {
              const parsedPhone = parsePhoneNumber(number, 'US')
              setIsPhoneValid(parsedPhone && parsedPhone.isValid())
              console.log(parsedPhone)
              setPhone(parsedPhone == undefined ? number : parsedPhone.formatNational())
            } else {
              setPhone(number)
            }
          }} keyboardType="phone-pad" />

          <ProfileSectionTitle>E-mail notifications</ProfileSectionTitle>
          <FormCheckbox label="Order statuses" value={orderStatuses} onChangeValue={setOrderStatuses} />
          <FormCheckbox label="Password changes" value={passwordChanges} onChangeValue={setPasswordChanges} />
          <FormCheckbox label="Special offers" value={specialOffers} onChangeValue={setSpecialOffers} />
          <FormCheckbox label="Newsletter" value={newsletter} onChangeValue={setNewsletter} />

          <SecondaryButton action={logout}>Log out</SecondaryButton>
          <View style={{ width: '100%', marginTop: 16, display: 'flex', flexDirection: 'row', gap: 16, justifyContent: 'center' }}>
            <TertiaryButton action={(async () => { await retrieveAllFromAsyncStorage() })}>Discard changes</TertiaryButton>
            <PrimaryButton action={onPressSaveButton} disabled={isPhoneValid && isEmailValid}>Save changes</PrimaryButton>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  </View>
}
