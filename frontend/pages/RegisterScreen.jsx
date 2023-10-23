import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import {Button} from '@rneui/themed';

const RegisterScreen = ({navigation}) => {
  // State variables to store user input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setfirstName] = useState('');
  const [lastname, setlastName] = useState('');
  const [regNo, setRegNo] = useState('');
  // Function to handle login button press
  // Function to handle login button press
  const handleRegister = async () => {
    try {
      // Make an API request to authenticate the user
      const response = await fetch('http://192.168.29.162:4000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password,firstname,lastname,regNo }),
      });
      console.log('http://192.168.29.162:4000/api/auth/register')
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        navigation.navigate('Login');
      } else {
        // Handle login errors, e.g., display an error message
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      console.log(error);
    }
  };
  //data:image/svg+xml,%3csvg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" width="1440" height="560" preserveAspectRatio="none" viewBox="0 0 1440 560"%3e%3cg mask="url(%26quot%3b%23SvgjsMask1018%26quot%3b)" fill="none"%3e%3crect width="1440" height="560" x="0" y="0" fill="rgba(6%2c 23%2c 40%2c 1)"%3e%3c/rect%3e%3cpath d="M 0%2c192 C 57.6%2c169.8 172.8%2c87.8 288%2c81 C 403.2%2c74.2 460.8%2c163.6 576%2c158 C 691.2%2c152.4 748.8%2c48.8 864%2c53 C 979.2%2c57.2 1036.8%2c181 1152%2c179 C 1267.2%2c177 1382.4%2c70.2 1440%2c43L1440 560L0 560z" fill="rgba(24%2c 7%2c 59%2c 1)"%3e%3c/path%3e%3cpath d="M 0%2c520 C 96%2c473.4 288%2c302.8 480%2c287 C 672%2c271.2 768%2c425.2 960%2c441 C 1152%2c456.8 1344%2c381 1440%2c366L1440 560L0 560z" fill="rgba(5%2c 19%2c 49%2c 1)"%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id="SvgjsMask1018"%3e%3crect width="1440" height="560" fill="white"%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e
  return (
    <ImageBackground
      source={require('../images/login.png')}
      style={styles.backgroundImage}>
      <ScrollView>
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
            <View style={styles.imgContainer}>
              <Image
                style={styles.image}
                source={require('../images/logo.png')}
                resizeMode="contain" // This ensures the image fits the container
              />
            </View>
            <Text style={styles.header}>Registration</Text>

            {/* Name input */}
            <TextInput
              style={styles.input}
              placeholder="First Name"
              onChangeText={text => setfirstName(text)}
              placeholderTextColor="white"
              value={firstname}
            />

               {/* Name input */}
               <TextInput
              style={styles.input}
              placeholder="Last Name"
              onChangeText={text => setlastName(text)}
              placeholderTextColor="white"
              value={lastname}
            />
            {/* Registration Number input */}
            <TextInput
              style={styles.input}
              placeholder="Registration Number"
              onChangeText={text => setRegNo(text)}
              placeholderTextColor="white"
              value={regNo}
            />
            {/* Email input */}
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={text => setEmail(text)}
              placeholderTextColor="white"
              value={email}
            />

            {/* Password input */}
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor="white"
              onChangeText={text => setPassword(text)}
              value={password}
            />
            <View style={styles.optionsContainer}>
              <Button
                title="Register"
                loading={false}
                loadingProps={{size: 'small', color: 'white'}}
                buttonStyle={{
                  backgroundColor: 'rgba(3, 43, 128, 1)',
                  borderColor: 'black',
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                titleStyle={{fontFamily: 'Montserrat-Bold', fontSize: 20}}
                containerStyle={{
                  width: 125,
                }}
                onPress={() => handleRegister()}
              />
              <Text
                style={styles.register}
                onPress={() => navigation.navigate('Login')}>
                Existing User?
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 36,
    color: 'white',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'white',
    color: 'white',
    fontFamily: 'Montserrat-Bold',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  register: {
    color: 'white',
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    alignSelf: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // or 'contain' or 'stretch' as needed
  },
  image: {
    width: '100%',
    aspectRatio: 1, // Makes the image width take up the full width of the container
  },
  imgContainer: {
    alignItems: 'center',
  },
});

export default RegisterScreen;
