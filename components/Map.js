import React, { Component } from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { MapView, Icon } from 'expo';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function mapStateToProps(state) {
  return { action: state.action };
}

function mapDispatchToProps(dispatch) {
  return {
    closeMenu: () =>
      dispatch({
        type: 'CLOSE_MENU',
      }),
  };
}

class Map extends Component {
  state = {
    top: new Animated.Value(height),
  };

  componentDidMount() {
    this.toggleMenu();
  }

  componentDidUpdate() {
    this.toggleMenu();
  }

  toggleMenu = () => {
    if (this.props.action == 'openMenu') {
      Animated.spring(this.state.top, {
        toValue: 0,
      }).start();
    }

    if (this.props.action == 'closeMenu') {
      Animated.spring(this.state.top, {
        toValue: height,
      }).start();
    }
  };

  fitToMarkersToMap() {
    const { dataSource } = this.props;
    this.map.fitToSuppliedMarkers(dataSource.businesses.map(v => v.id), true);
  }

  render() {
    const { dataSource } = this.props;
    return (
      <AnimatedContainer style={{ top: this.state.top }}>
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
          onPress={this.props.closeMenu}
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
      </AnimatedContainer>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);

const Container = styled.View`
  position: absolute;
  background: white;
  width: 100%;
  height: 100%;
  z-index: 100;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

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
