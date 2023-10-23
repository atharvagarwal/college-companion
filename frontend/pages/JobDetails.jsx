import React ,{useState,useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';

const JobDetails = ({route,navigation}) => {
  const { itemId } = route.params;
  console.log(itemId);
  const [jobData, setJobData] = useState(null);

  // Create an AbortController to cancel the fetch request
  const abortController = new AbortController();
  const signal = abortController.signal;

  // Function to fetch job data based on itemId
  const fetchJobData = async () => {
    try {
      const response = await fetch(`http://192.168.29.162:4000/api/job/get/${itemId}`);
      if (response.ok) {
        const data = await response.json();
        setJobData(data); // Update the state with the fetched job data
      } else {
        console.error('Failed to fetch job data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // Fetch job data when the component mounts
    fetchJobData();

    // Cleanup function to cancel the fetch request when the component unmounts
    return () => {
      abortController.abort(); // Cancel the fetch request
    };
  }, []); // Empty dependency array means this effect runs once when the component mounts


  return (
    jobData ? (
      <ImageBackground
        source={require('../images/login.png')}
        style={styles.backgroundImage}
      >
        <ScrollView>
          <View style={styles.container}>
            <Image source={{ uri: jobData.jobImage }} style={styles.stipendImage} />
            <Text style={styles.title}>{jobData.jobName}</Text>
            <Text style={styles.description}>{jobData.jobDescription}</Text>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => navigation.navigate('JobRegister',{
                itemId :itemId 
              })}
            >
              <Text style={styles.applyButtonText}>Apply Now</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    ) : <></>
  )}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: 'white',
    fontFamily: 'Montserrat-Bold',
  },
  description: {
    fontSize: 20,
    marginBottom: 16,
    color: 'white',
    fontFamily: 'Montserrat-Bold',
  },
  stipendImage: {
    width: '100%',
    height: 300, // Adjust the height as needed
    marginBottom: 16,
    borderRadius: 20,
  },
  applyButton: {
    backgroundColor: '#242242',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // or 'contain' or 'stretch' as needed
  },
});

export default JobDetails;
