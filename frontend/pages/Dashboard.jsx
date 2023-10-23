import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Icon, Image} from '@rneui/themed';
const Dashboard = () => {
  const data = [
    {
      id: 1,
      title: 'IOT workshop',
      content: '',
    },
    {
      id: 2,
      title: 'ML workshop',
      content: '',
    },
    {id: 3, title: 'Web Dev Workshop', content: ''},
    // Add more cards as needed
  ];

  const dataSecond = [
    {id: '1', title: 'Update 1', content: 'Update description goes here'},
    {id: '2', title: 'Update 2', content: 'Update description goes here'},
    {id: '3', title: 'Update 3', content: 'Update description goes here'},
    {id: '4', title: 'Update 4', content: 'Update description goes here'},
    {id: '5', title: 'Update 5', content: 'Update description goes here'},
  ];

  // Function to render each job card
  const renderHorizontalItem = ({item}) => (
    <View style={styles.card}>
      <Image
        source={{
          uri: 'https://media.licdn.com/dms/image/D5622AQFnBqabPoToxQ/feedshare-shrink_800/0/1696908416403?e=1700092800&v=beta&t=rylakAntZrBfgVkT0Fr7EThNKqN9kJ9os8rG4Uc2YcU',
        }}
        style={{width: '100%', height: 150}} // Adjust the height as needed
        resizeMode="cover" // Set resizeMode to 'cover' for the image
      />
      <Text style={styles.cardTitle}>{item.title}</Text>
      <TouchableOpacity>
        <Text
          style={{
            color: '#3e3bff',
            fontFamily: 'Montserrat-Bold',
            alignSelf: 'flex-end',
          }}>
          Apply
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground
      source={require('../images/login.png')}
      style={styles.backgroundImage}>
      <ScrollView>
        <View style={{height: '100%'}}>
          <Text style={styles.header}>Upcoming Industrial Workshops</Text>
          <FlatList
            data={data}
            horizontal
            renderItem={renderHorizontalItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.scrollView}
          />
          <Text style={styles.headerUpdate}>Important Updates</Text>
          <ScrollView style={styles.scrollViewUpdates}>
            {dataSecond.map(item => {
              return (
                <View style={styles.cardUpdates} key={item.id}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardContent}>{item.content}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: 'row', // Horizontal scrolling
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 16,
  },
  scrollViewUpdates: {
    flexDirection: 'column', // Horizontal scrolling
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 16,
  },
  card: {
    width: 300,
    height: 250, // Adjust the width as needed
    marginRight: 16, // Margin between cards
    backgroundColor: '#242242',
    borderRadius: 8,
    padding: 16,
    elevation: 4,
  },
  cardUpdates: {
    width: '100%',
    height: 70, // Adjust the width as needed
    marginBottom: 16, // Margin between cards
    backgroundColor: '#242242',
    borderRadius: 8,
    padding: 10,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: 'white',
  },
  cardContent: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    color: 'white',
  },
  container: {
    flex: 1,
  },
  header: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    marginLeft: 16,
    marginTop: 16,
    color: 'white',
    marginBottom: 20,
  },
  headerUpdate: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    marginLeft: 16,
    marginTop: 4,
    color: 'white',
    marginBottom: 10,
  },
});

export default Dashboard;
