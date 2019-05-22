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
import { Icon } from 'expo';
import styled from 'styled-components';

import fetchData from '../fetchData';

const { width } = Dimensions.get('window');

class DetailScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    isLoading: true,
  };

  componentDidMount() {
    StatusBar.setBarStyle('light-content', true);

    const id = this.props.navigation.getParam('id', '');

    fetchData(`https://api.yelp.com/v3/businesses/${id}`)
      .then(data => {
        this.setState({
          isLoading: false,
          dataSource: data,
        });
        console.log(data);
      })
      .catch(err => console.log('Ooops, error', err.message));
  }

  componentWillUnmount() {
    StatusBar.setBarStyle('dark-content', true);
  }

  render() {
    const { isLoading, dataSource } = this.state;
    if (isLoading) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size='large' color='#0000ff' />
        </View>
      );
    }
    return (
      <RootView>
        <ScrollView>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            snapToInterval={width}
            snapToAlignment={'center'}
          >
            {dataSource.photos.map((photo, i) => (
              <Cover width={width} key={i}>
                <Image source={{ uri: photo }} />
              </Cover>
            ))}
          </ScrollView>
          <SafeAreaView>
            <Container>
              <Headline>{dataSource.name}</Headline>
            </Container>
          </SafeAreaView>
          <Actions>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <IconView>
                <Icon.Ionicons name='ios-arrow-back' size={24} color='white' />
              </IconView>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <IconView>
                <Icon.Ionicons name='ios-heart-empty' size={24} color='white' />
              </IconView>
            </TouchableOpacity>
          </Actions>
        </ScrollView>
      </RootView>
    );
  }
}

export default DetailScreen;

const RootView = styled.View`
  flex: 1;
`;

const IconView = styled.View`
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
`;

const Actions = styled.View`
  position: absolute;
  top: 30px;
  left: 12px;
  right: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Container = styled.View`
  flex: 1;
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
`;

const Headline = styled.Text`
  font-size: 34px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Cover = styled.View`
  width: ${props => props.width};
  height: 320px;
  margin-bottom: 8px;
  overflow: hidden;
`;

const Image = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Text = styled.Text``;
