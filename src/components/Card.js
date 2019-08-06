import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

export default class Card extends Component {

    render() {
        return (
            <View style={ styles.card }>
                { this.props.children }
            </View>
        );
    }

}

const styles = StyleSheet.create({
    card: {
      backgroundColor: "#FFF",
      elevation: 10,
      width:  "100%"
    }
  });