import React, { Component } from 'react';
import { Animated, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'expo';
import styled from 'styled-components';

import MenuItem from './MenuItem';

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

const { height } = Dimensions.get('window');

class Menu extends Component {
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

  render() {
    return (
      <AnimatedContainer style={{ top: this.state.top }}>
        <Cover />
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
        <Content>
          {items.map((item, index) => (
            <MenuItem
              key={index}
              icon={item.icon}
              title={item.title}
              text={item.text}
            />
          ))}
        </Content>
      </AnimatedContainer>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);

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

const Cover = styled.View`
  height: 142px;
  background: black;
`;

const Content = styled.View`
  height: ${height};
  background: #f0f3f5;
  padding: 50px;
`;

const items = [
  {
    icon: 'ios-settings',
    title: 'Account',
    text: 'settings',
  },
  {
    icon: 'ios-card',
    title: 'Billing',
    text: 'payments',
  },
  {
    icon: 'ios-compass',
    title: 'Learn React',
    text: 'start course',
  },
  {
    icon: 'ios-exit',
    title: 'Log out',
    text: 'see you soon!',
  },
];
