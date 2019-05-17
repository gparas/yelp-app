import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Animated,
  StatusBar,
  View,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Card from '../components/Card';
import Menu from '../components/Menu';

function mapStateToProps(state) {
  return { action: state.action };
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () =>
      dispatch({
        type: 'OPEN_MENU',
      }),
  };
}

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
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1),
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

  componentDidUpdate() {
    this.toggleMenu();
  }

  toggleMenu = () => {
    if (this.props.action == 'openMenu') {
      Animated.spring(this.state.scale, {
        toValue: 0.9,
      }).start();

      StatusBar.setBarStyle('light-content', true);
    }

    if (this.props.action == 'closeMenu') {
      Animated.spring(this.state.scale, {
        toValue: 1,
      }).start();

      StatusBar.setBarStyle('dark-content', true);
    }
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
    console.log(this.state.dataSource);
    return (
      <RootView>
        <Menu />
        <AnimatedContainer
          style={{
            transform: [{ scale: this.state.scale }],
            opacity: this.state.opacity,
          }}
        >
          <SafeAreaView>
            <ScrollView>
              <TitleBar>
                <Title>Welcome back,</Title>
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
              {this.state.dataSource.businesses.map(card => (
                <TouchableOpacity
                  key={card.id}
                  onPress={() => {
                    this.props.navigation.push('Detail');
                  }}
                >
                  <Card
                    title={card.name}
                    image={{ uri: card.image_url }}
                    subtitle={card.rating}
                    caption={card.name}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </SafeAreaView>
        </AnimatedContainer>
      </RootView>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

const RootView = styled.View`
  background: black;
  flex: 1;
`;
const Container = styled.View`
  background: #f0f3f5;
  flex: 1;
  border-radius: 10px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const TitleBar = styled.View`
  width: 100%;
  padding-left: 20px;
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

const Message = styled.Text`
  margin: 20px;
  color: #b8bece;
  font-size: 15px;
  font-weight: 500;
`;
