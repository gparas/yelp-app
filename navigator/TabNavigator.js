import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { Icon } from 'expo';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SavedScreen from '../screens/SavedScreen';

const activeColor = '#4775f2';
const inactiveColor = '#b8bece';

const MainStack = createStackNavigator({
  Home: HomeScreen,
  Detail: DetailScreen,
});

const HomeStack = createStackNavigator(
  {
    Home: MainStack,
    Map: MapScreen,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  const routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName == 'Map') {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
      <Icon.Ionicons
        name='ios-home'
        size={24}
        color={focused ? activeColor : inactiveColor}
      />
    ),
  };
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <Icon.Ionicons
      name='ios-person'
      size={24}
      color={focused ? activeColor : inactiveColor}
    />
  ),
};

const SavedStack = createStackNavigator({
  Saved: SavedScreen,
});

SavedStack.navigationOptions = {
  tabBarLabel: 'Saved`',
  tabBarIcon: ({ focused }) => (
    <Icon.Ionicons
      name='ios-heart-empty'
      size={24}
      color={focused ? activeColor : inactiveColor}
    />
  ),
};

const TabNavigator = createBottomTabNavigator({
  HomeStack,
  SavedStack,
  ProfileStack,
});

export default TabNavigator;
