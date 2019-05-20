import React, { Component } from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import styled from 'styled-components';
import { MapView, Icon } from 'expo';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapScreen extends Component {
  componentDidMount() {
    StatusBar.setBarStyle('light-content', true);
  }

  componentWillUnmount() {
    StatusBar.setBarStyle('dark-content', true);
  }

  fitToMarkersToMap() {
    const { navigation } = this.props;
    const dataSource = navigation.getParam('dataSource', '');
    this.map.fitToSuppliedMarkers(dataSource.businesses.map(v => v.id), true);
  }

  render() {
    const { navigation } = this.props;
    const dataSource = navigation.getParam('dataSource', '');
    return (
      <Container>
        <MapView
          style={styles.map}
          ref={ref => {
            this.map = ref;
          }}
          initialRegion={{
            latitude: dataSource.region.center.latitude,
            longitude: dataSource.region.center.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          {dataSource.businesses.map(v => {
            return (
              <MapView.Marker
                key={v.id}
                identifier={v.id}
                coordinate={{
                  latitude: v.coordinates.latitude,
                  longitude: v.coordinates.longitude,
                }}
                onCalloutPress={() => {
                  this.props.navigation.navigate('Details', {
                    name: v.name,
                  });
                }}
                title={v.name}
                description={v.location.address1}
              />
            );
          })}
        </MapView>
        <View style={{ marginVertical: 20 }}>
          <TouchableOpacity onPress={() => this.fitToMarkersToMap()}>
            <Text>Fit Markers Onto Map</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}
          style={{
            position: 'absolute',
            top: 120,
            left: '50%',
            marginLeft: -22,
            zIndex: 1,
          }}
        >
          <CloseView>
            <Icon.Ionicons name='ios-close' size={44} color='#546bfb' />
          </CloseView>
        </TouchableOpacity>
      </Container>
    );
  }
}

export default MapScreen;

const Container = styled.View`
  flex: 1;
`;

const CloseView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: white;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
