import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Detail: DetailScreen,
});

export default createAppContainer(AppNavigator);
