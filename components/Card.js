import React from 'react';
import styled from 'styled-components';

const Card = props => {
  return (
    <Container width={props.width}>
      <Cover>
        <Image source={props.image} />
      </Cover>
      <Content>
        <Title>{props.title}</Title>
        <Caption>{props.caption}</Caption>
      </Content>
    </Container>
  );
};

export default Card;

const Container = styled.View(props => ({
  width: props.width / 2 - 30,
  marginBottom: 20,
}));

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

const Title = styled.Text`
  font-size: 17px;
  font-weight: bold;
`;

const Content = styled.View``;

const Caption = styled.Text`
  font-size: 12px;
`;
