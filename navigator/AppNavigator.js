import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import MapScreen from '../screens/MapScreen';

const MainStack = createStackNavigator({
  Home: HomeScreen,
  Detail: DetailScreen,
});

const RootStack = createStackNavigator(
  {
    Main: MainStack,
    Map: MapScreen,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default createAppContainer(RootStack);
