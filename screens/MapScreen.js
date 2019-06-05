import React, { Component } from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo';
import Button from '../components/Button';
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
      <View style={styles.root}>
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
        <Button
          onPress={() => this.fitToMarkersToMap()}
          label='Fit Markers'
          style={{ marginBottom: 30 }}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.4)', 'transparent']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 300,
          }}
        />
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}
          style={{
            position: 'absolute',
            top: 32,
            left: 10,
            zIndex: 1,
          }}
        >
          <View style={styles.close}>
            <Icon.Ionicons name='ios-close' size={44} color='#ffffff' />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default MapScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  close: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
