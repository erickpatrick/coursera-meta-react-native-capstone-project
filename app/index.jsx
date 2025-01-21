import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import LittleLemonLogo from '@/components/LittleLemonLogo';

export default function Index() {
  const navigation = useNavigation();
  const [username, onChangeUsername] = useState('')
  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const isButtonDisabled = username.length === 0 || email.length === 0 || !validEmail

  function validateEmail(email) {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return expression.test(String(email).toLowerCase())
  }

  function onChangeEmail(email) {
    if (validateEmail(email)) {
      setValidEmail(true)
    } else {
      setValidEmail(false)
    }

    setEmail(email)
  }

  useEffect(() => {
    navigation.setOptions({ headerShown: false, title: 'Onboarding', });
  }, [navigation]);

  return <View style={{ flex: 1, backgroundColor: 'white' }}>
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <View style={{ height: 50, width: "100%", alignItems: "center" }}>
        <LittleLemonLogo />
      </View>
      <View style={{ width: "100%", alignItems: "flex-start" }}>
        <Text>Username</Text>
        <TextInput
          style={{ borderColor: "lightgray", borderWidth: 1, width: "100%", marginBottom: 16, padding: 16 }}
          onChangeText={onChangeUsername}
          value={username}
        />
        <Text>E-mail</Text>
        <TextInput
          style={{ borderColor: "lightgray", borderWidth: 1, width: "100%", marginBottom: 16, padding: 16 }}
          onChangeText={onChangeEmail}
          value={email}
        />
      </View>
      <View style={{ height: 50, width: "100%", alignItems: "flex-end" }}>
        <Link href="/profile" asChild disabled={isButtonDisabled}>
          <Pressable>
            <Text title="Next" style={{ backgroundColor: "green" }}>Next</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  </View>
}
