import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Animated,
  StatusBar,
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

class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1),
  };

  componentDidMount() {
    StatusBar.setBarStyle('dark-content', true);
  }

  componentDidUpdate() {
    this.toggleMenu();
  }

  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1),
  };

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
                <TouchableOpacity onPress={() => this.props.openMenu()}>
                  <Name>Meng</Name>
                </TouchableOpacity>
              </TitleBar>
              {cards.map((card, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    this.props.navigation.push('Detail');
                  }}
                >
                  <Card
                    title={card.title}
                    image={card.image}
                    subtitle={card.subtitle}
                    caption={card.caption}
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

const cards = [
  {
    title: 'React Native for Designers',
    image: require('../assets/card-image.jpg'),
    subtitle: 'React Native',
    caption: '1 of 12 sections',
  },
  {
    title: 'Styled Components',
    image: require('../assets/card-image.jpg'),
    subtitle: 'React Native',
    caption: '2 of 12 sections',
  },
  {
    title: 'Props and Icons',
    image: require('../assets/card-image.jpg'),
    subtitle: 'React Native',
    caption: '3 of 12 sections',
  },
  {
    title: 'Static Data and Loop',
    image: require('../assets/card-image.jpg'),
    subtitle: 'React Native',
    caption: '4 of 12 sections',
  },
];
