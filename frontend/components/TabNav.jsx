import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Jobs from '../pages/Jobs';
const Tab = createBottomTabNavigator();
import {Icon} from '@rneui/themed';
export default function TabNav() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{headerShown: false,
            tabBarIcon: () => (
                <Icon name="home" type='font-awesome' color="#242242" size={24} /> // Use the correct icon name and type
              ),
              tabBarLabelStyle: {
                fontFamily: 'Montserrat-Bold',
                padding:3 // Specify Montserrat Bold for the tab label
              },
        }}
        name="Home"
        component={Dashboard}
      />
        <Tab.Screen
        options={{headerShown: false,
            tabBarIcon: () => (
                <Icon name="user" type='font-awesome' color="#242242" size={24} /> // Use the correct icon name and type
              ),
              tabBarLabelStyle: {
                fontFamily: 'Montserrat-Bold',
                padding:3 // Specify Montserrat Bold for the tab label
              },
        }}
        name="Profile"
        component={Profile}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Icon name="briefcase" type='font-awesome' color="#242242" size={24} /> // Use the correct icon name and type
          ),
          tabBarLabelStyle: {
            fontFamily: 'Montserrat-Bold',
            padding:3 // Specify Montserrat Bold for the tab label
          },
        }}
        name="Job Openings"
        component={Jobs}
      />
    </Tab.Navigator>
  );
}

