import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import styled from 'styled-components';
import { Footnote, Caption } from './Typography';
import { fonts } from '../designSystem';

const Card = props => {
  return (
    <Container width={props.width / 2 - 30}>
      <Cover>
        <Image source={props.image} />
      </Cover>
      <Content>
        <Text style={{ ...fonts.Headline }}>{props.title}</Text>
        <Caption>{props.caption}</Caption>
      </Content>
    </Container>
  );
};

export default Card;

const Container = styled.View`
  width: ${props => props.width};
  margin-bottom: 20px;
`;

const Cover = styled.View`
  width: 100%;
  height: 150px;
  border-radius: 4px;
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

const Content = styled.View``;
