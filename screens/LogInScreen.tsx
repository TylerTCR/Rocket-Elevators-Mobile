import { Button, Modal, StyleSheet, TextInput, Image } from 'react-native';
import { useState } from 'react';
// import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function LogInScreen({ navigation }: RootTabScreenProps<'LogIn'>) {
  const [email, setEmail] = useState('');
  let validEmail = true;
  return (
    <View style={styles.container}>     
      {/* <Text style={styles.title}>Sign In</Text> */}
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      {/* <EditScreenInfo path="/screens/LogInScreen.tsx" /> */}
      <View style={styles.getStartedContainer}>
      <View style={styles.image}>
        <Image source={require('../assets/images/logo.png')} style={{width: 250, height: 250, resizeMode: "contain"}}/>
      </View> 
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Please enter your email:
        </Text>

        <TextInput
          style={styles.textInput}
          keyboardType='email-address'
          keyboardAppearance='default'
          placeholder="example@example.com"
          onChangeText={email => setEmail(email)}
          defaultValue={""}
        />

        <Button
          title="Sign In"
          onPress={() => {
            // If no text was entered
            if (email == "") {
              navigation.navigate('Warning')
            // If there is text entered
            } else if (email != "") {
              // Convert all letters to lowercase
              let _email = email.toLowerCase()
              // Make API call with the user-entered email
              fetch(`https://tyler-rocket-elevator.azurewebsites.net/employee/${_email}`)
              .then((result) => result.json())
              .then((data) => {
                // If the returned value equal the user-entered value send them to Home screen, otherwise, display alert
                data == _email ? navigation.navigate('Home') : navigation.navigate('Warning')
              })
            }
          }}
          
        />

        {/* <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Change any of the text, save the file, and your app will automatically update.
        </Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  container: {
    flex: .9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  image: {
    margin: -5,
  },
  textInput: {
    height: 50,
    width: 250,
    margin: 12,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: "rgba(200,200,200,0.5)",
    color: "rgba(150,150,150,1)",
  },
});
