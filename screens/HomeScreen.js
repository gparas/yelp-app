import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  View,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import styled from 'styled-components';

import { Title2 } from '../components/Typography';
import Card from '../components/Card';

const { width } = Dimensions.get('window');

const config = {
  headers: {
    Authorization:
      'Bearer WCFP1SlL3XCcoqv4-s8YqGaspg0ZDLf1vihiqYrTrtctedn3_B4kZs8OAPQR-HFnd652kco9RaWuyUiy0DqN0b7dvWNsy1NDEeLxAI7XS8FtBtgWwmo0bSa-A1PdXHYx',
  },
  params: {
    categories: 'breakfast_brunch',
  },
};

class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    isLoading: true,
  };

  componentDidMount() {
    StatusBar.setBarStyle('dark-content', true);
    this.getDataFromApi('Toronto');
  }

  getDataFromApi = locationSearched => {
    return fetch(
      `https://api.yelp.com/v3/businesses/search?location=${locationSearched}`,
      config
    )
      .then(response => response.json())
      .then(response => {
        this.setState(
          {
            isLoading: false,
            dataSource: response,
          },
          function() {}
        );
      })
      .catch(error => {
        this.setState({
          errorState: `Sorry we coudln't find information related to the location you search, do you want to try something else?`,
          isLoading: false,
        });
      });
  };

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
        <TitleBar height={54}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Map', {
                dataSource: this.state.dataSource,
              });
            }}
          >
            <Name>Map</Name>
          </TouchableOpacity>
        </TitleBar>
        <ScrollView>
          <Container>
            <Title2>What can we help you find?</Title2>
            <CardWrapper>
              {this.state.dataSource.businesses.map(card => (
                <TouchableOpacity
                  key={card.id}
                  onPress={() => {
                    this.props.navigation.push('Detail', {
                      id: card.id,
                    });
                  }}
                >
                  <Card
                    width={width}
                    image={{ uri: card.image_url }}
                    title={card.name}
                    caption={card.rating}
                  />
                </TouchableOpacity>
              ))}
            </CardWrapper>
          </Container>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default HomeScreen;

const TitleBar = styled.View`
  padding-left: 20px;
  padding-right: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #dddddd;
  height: ${props => props.height};
`;

const Container = styled.View`
  flex: 1;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
`;
const CardWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Headline = styled.Text`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;
