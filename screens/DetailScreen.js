import React from 'react';
import styled from 'styled-components';

class DetailScreen extends React.Component {
  render() {
    return (
      <Container>
        <Text>Section Screen</Text>
      </Container>
    );
  }
}

export default DetailScreen;

const Container = styled.View`
  flex: 1;
`;

const Text = styled.Text``;
