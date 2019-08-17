import React from 'react';
import Login from './Login';
import Main from './Main';
import User from './User';
import AddPost from './AddPost'
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation';

//import Ionicons from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';
const MainStack = createStackNavigator(
  {
    Main: Main,
    AddPost: AddPost,

  },
  {
    initialRouteName: 'Main',
    navigationOptions: {
      headerTintColor: '#a41034',
      headerStyle: {
        backgroundColor: '#fff',
      },
    },
  }
)




const MainTabs = createBottomTabNavigator(
  {
    List: MainStack,
    User:User,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if (routeName === 'List') {
        iconName = `ios-list`;
        // Sometimes we want to add badges to some icons. 
        // You can check the implementation below.
      } else if (routeName === 'User') {
        iconName = `ios-person`;
      }

      // You can return any component that you like here!
      return <Ionicons  name={iconName} size={25} color={tintColor} />;
    },
  }),
  
    tabBarOptions: {
      activeTintColor: '#a41034',
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
)

const AppNavigator = createSwitchNavigator({
  Login:Login,
  Main:MainTabs,
})

const Navigation = createAppContainer(AppNavigator);

export default Navigation; 