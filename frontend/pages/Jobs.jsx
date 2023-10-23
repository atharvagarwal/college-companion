import React ,{useState,useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

const Jobs = ({navigation}) => {
  const [jobOpenings, setJobOpenings] = useState([]);
  const abortController = new AbortController(); // Create an AbortController

  // Function to fetch job data
  const fetchJobs = async () => {
    try {
      const response = await fetch('http://192.168.29.162:4000/api/job/get', {
        signal: abortController.signal, // Pass the AbortController's signal to the fetch
      });
      if (response.ok) {
        const data = await response.json();
        setJobOpenings(data); // Update the state with the fetched job data
      } else {
        console.error('Failed to fetch job data');
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Fetch request was aborted.');
      } else {
        console.error('Error:', error);
      }
    }
  };

  useEffect(() => {
    // Fetch job data when the component mounts
    fetchJobs();

    // Cleanup function to cancel the fetch request when the component unmounts
    return () => {
      abortController.abort(); // Abort the fetch request
    };
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Function to render each job card
  const renderJobCard = ({item}) => (
    <View style={styles.card}>
      <Text style={styles.jobTitle}>{item.jobName.toUpperCase()}</Text>
      <Text style={styles.company}>{item.company.toUpperCase()}</Text>
      <Text style={styles.package}>{item.package.toUpperCase()}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('JobDetails',{
            itemId: item._id,
          })}>
        <Text style={styles.apply}>Apply</Text>
      </TouchableOpacity>
      </View>
      
  );

  return (
    <ImageBackground
      source={require('../images/login.png')}
      style={styles.backgroundImage}
      resizeMode="cover" // Set resizeMode to 'cover' for the background image
    >
      <View style={styles.container}>
        <Text style={styles.sectionHeader}>Internship/Job Status:</Text>
        <FlatList
          data={jobOpenings}
          renderItem={renderJobCard}
          keyExtractor={item => item.id}
          numColumns={1} // Display two cards in each row
          contentContainerStyle={styles.cardContainer}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 10,
  },
  cardContainer: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#242242', // Semi-transparent white background for cards
    borderRadius: 8,
    padding: 16,
    margin: 3,
    width: '100%', // Adjust the width to leave a small gap between cards
  },
  jobTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 8,
    color: 'white',
  },
  company: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Montserrat-Bold',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // or 'contain' or 'stretch' as needed
  },
  sectionHeader: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    marginTop: 16,
    marginBottom: 12,
    color: 'white', // Text color for visibility on the background
    paddingLeft: 3,
  },
  apply: {
    fontSize: 16,
    color: '#3e3bff',
    fontFamily: 'Montserrat-Bold',
    alignSelf: 'flex-end',
  },
  package: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Montserrat-Bold',
    marginTop:12
  },
});

export default Jobs;
