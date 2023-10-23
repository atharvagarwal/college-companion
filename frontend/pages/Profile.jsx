import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {Button} from '@rneui/themed';
const Profile = () => {
  // Sample user data (replace with actual user data)
  const userData = {
    name: 'Atharv Agarwal',
    registrationNo: '21BCE5600',
    email: 'atharv.agarwal645@gmail.com',
    profileImage: 'https://avatars.githubusercontent.com/u/89630019?v=4', // Replace with the actual image URL
    registeredEvents: [
      {id: '1', eventName: 'Webverse', date: '2023-01-15'},
      {id: '2', eventName: 'AppMaina', date: '2023-02-20'},
      {id: '3', eventName: 'DataThon', date: '2023-03-25'},
    ],
    registeredJobs: [
      {
        id: '1',
        eventName: 'Full Stack Developer',
        company: 'Google',
        status: 'Selected',
      },
      {id: '2', eventName: 'SDE-1', company: 'Apple', status: 'Rejected'},
      {
        id: '3',
        eventName: 'Data Scientist',
        company: 'Amazon',
        status: 'Pending',
      },
    ],
  };

  const getEventStatusColor = status => {
    switch (status) {
      case 'Rejected':
        return styles.rejectedStatus;
      case 'Pending':
        return styles.pendingStatus;
      case 'Selected':
        return styles.selectedStatus;
      default:
        return {}; // Return an empty object for the default color
    }
  };

  return (
    <ImageBackground
      source={require('../images/login.png')}
      style={styles.backgroundImage}
      resizeMode="cover" // Set resizeMode to 'cover' for the background image
    >
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.centeredContent}>
            <Image
              source={{uri: userData.profileImage}}
              style={styles.profileImage}
            />
            <Button
              title="Upload"
              loading={false}
              loadingProps={{size: 'small', color: 'white'}}
              buttonStyle={{backgroundColor: '#242242'}}
              titleStyle={{fontFamily: 'Montserrat-Bold', fontSize: 10}}
              containerStyle={styles.uploadButtonContainer}
            />
          </View>
          <Text style={styles.name}>{userData.name}</Text>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Reg No:</Text>
            <Text style={styles.infoText}>{userData.registrationNo}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoText}>{userData.email}</Text>
          </View>

          <Text style={styles.sectionHeader}>Internship/Job Status:</Text>
          <FlatList
            data={userData.registeredJobs}
            horizontal
            style={{
              flexDirection: 'row', // Horizontal scrolling
              paddingRight: 16,
              paddingLeft: 0,
              paddingBottom: 16,
              height: 120,
            }}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View key={item.id} style={styles.cardJob}>
                <Text style={styles.eventName}>{item.eventName}</Text>
                <Text style={styles.eventName}>{item.company}</Text>
                <Text
                  style={[
                    styles.eventStatus,
                    getEventStatusColor(item.status),
                  ]}>
                  {item.status}
                </Text>
              </View>
            )}
          />
          <Text style={styles.sectionHeader}>Workshops Registered To:</Text>

          {/* Render EventCard components for each registered event */}
          <ScrollView>
            {userData.registeredEvents.map(event => (
              <View key={event.id} style={styles.card}>
                <Text style={styles.eventName}>{event.eventName}</Text>
                <Text style={styles.eventDate}>{event.date}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent black background for content
  },
  backgroundImage: {
    flex: 1, // Take up the entire screen
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: 20,
  },
  centeredContent: {
    alignItems: 'center', // Center horizontally
    marginBottom: 20, // Add spacing at the bottom
  },
  name: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    marginBottom: 16,
    color: 'white', // Text color for visibility on the background
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    flex: 1,
    color: 'white', // Text color for visibility on the background
  },
  infoText: {
    fontSize: 16,
    flex: 3,
    color: 'white', // Text color for visibility on the background
  },
  sectionHeader: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    marginTop: 16,
    marginBottom: 12,
    color: 'white', // Text color for visibility on the background
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#242242', // Semi-transparent white background for cards
    borderRadius: 8,
  },
  eventName: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: 'white', // Text color for event names
  },
  eventDate: {
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    color: 'white', // Text color for event dates
  },
  eventStatus: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    alignSelf: 'flex-end',
  },
  rejectedStatus: {
    color: 'red',
    fontFamily: 'Montserrat-Bold',
  },
  pendingStatus: {
    color: 'yellow',
    fontFamily: 'Montserrat-Bold',
  },
  selectedStatus: {
    color: 'green',
    fontFamily: 'Montserrat-Bold',
  },
  cardJob: {
    width: 250,
    height: 100, // Adjust the width as needed
    marginRight: 16, // Margin between cards
    backgroundColor: '#242242',
    borderRadius: 8,
    padding: 16,
    elevation: 4,
    flex: 1,
    flexDirection: 'column',
  },
});

export default Profile;
