import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  View,
  ActivityIndicator,
  Button,
} from 'react-native';

import Tile from '../components/Tile';
import Typography from '../components/Typography';
import Container from '../components/Container';
import Grid from '../components/Grid';
import fetchData from '../fetchData';

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      borderBottomWidth: 0,
    },
    headerRight: (
      <Button
        title={'map'}
        onPress={() => {
          navigation.navigate('Map', {
            dataSource: navigation.getParam('dataSource'),
          });
        }}
      />
    ),
  });

  state = {
    isLoading: true,
  };

  componentDidMount() {
    StatusBar.setBarStyle('dark-content', true);

    fetchData('https://api.yelp.com/v3/businesses/search?location=nyc')
      .then(data => {
        this.setState({
          isLoading: false,
          dataSource: data,
        });
        this.props.navigation.setParams({
          dataSource: data,
        });
        console.log(data);
      })
      .catch(err => console.log('Ooops, error', err.message));
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size='large' color='#0000ff' />
        </View>
      );
    }
    return (
      <SafeAreaView>
        <ScrollView>
          <Container>
            <Typography variant={'headline'} style={{ marginBottom: 30 }}>
              What can we help you find?
            </Typography>
            <Grid>
              {this.state.dataSource.businesses.map(card => (
                <TouchableOpacity
                  key={card.id}
                  onPress={() => {
                    this.props.navigation.push('Detail', {
                      id: card.id,
                    });
                  }}
                >
                  <Tile
                    imageSrc={{ uri: card.image_url }}
                    title={card.name}
                    caption={card.categories[0].title}
                    rating={card.rating}
                  />
                </TouchableOpacity>
              ))}
            </Grid>
          </Container>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default HomeScreen;
