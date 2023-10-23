import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';

const JobRegister = ({ navigation, route }) => {
  const { itemId } = route.params;
  const [name, setName] = useState('');
  const [regNo, setRegNo] = useState('');
  const [email, setEmail] = useState('');
  const [cgpa, setCGPA] = useState('');
  const [resume,setResume] = useState('');
  const handleFileUpload = () => {
    // Implement file upload logic here
  };

  const handleSubmit = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('userDetails'));
    console.log(user)
    try {
      // Make an API request to submit the job application
      const response = await fetch(`http://192.168.29.162:4000/api/job/application/${itemId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name,email,cgpa,regNo,resume }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigation.navigate('Profile');
      } else {
        // Handle registration errors, e.g., display an error message
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <ImageBackground
      source={require('../images/login.png')}
      style={styles.backgroundImage}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.header}>Job Application</Text>

          <Text style={styles.label}>Name</Text>
          <TextInput
            value={name}
            onChangeText={text => setName(text)}
            style={styles.input}
          />

          <Text style={styles.label}>Registration Number</Text>
          <TextInput
            value={regNo}
            onChangeText={text => setRegNo(text)}
            style={styles.input}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
          />

          <Text style={styles.label}>CGPA</Text>
          <TextInput
            value={cgpa}
            onChangeText={text => setCGPA(text)}
            style={styles.input}
          />

          <Text style={styles.label}>Editable Resume Link</Text>
          <TextInput
            value={resume}
            onChangeText={text => setResume(text)}
            style={styles.input}
          />



          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            style={[styles.button, styles.submitButton]}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    padding: 16,
    marginTop: 36,
  },
  label: {
    color: 'white', // Label text color
    marginBottom: 5,
    fontFamily: 'Montserrat-Bold',
  },
  input: {
    backgroundColor: '#242242', // Input field background color
    color: 'white', // Input text color
    borderRadius: 5,
    marginBottom: 15,
    padding: 10,
    width: '100%', // Expand input to full width
    fontFamily: 'Montserrat-Bold',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 5,
    width: '100%', // Expand button to full width
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: '#3949ab', // Primary color for upload button
  },
  submitButton: {
    backgroundColor: '#ff6f61', // Accent color for submit button
  },
  buttonText: {
    color: 'white', // Button text color
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // or 'contain' or 'stretch' as needed
  },
  header: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 36,
    color: 'white',
    marginBottom: 20,
    alignSelf: 'center',
  },
});

export default JobRegister;
