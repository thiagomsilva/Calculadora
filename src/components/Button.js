import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
} from 'react-native';

export default class Button extends Component {

    onButtonPress = () => {
        const { onPress, text } = this.props;
        this.props.onPress(text);
    }

    render() {
        const { color, text, size, flat } = this.props;

        return (
            <TouchableOpacity style={{ ...styles.button, elevation: flat ? 0 : 4,
                 backgroundColor: color, width: size, height: 60 }}
                onPress={this.onButtonPress} activeOpacity={ 0.6 }>
                <Text style={{ ...styles.text, color: flat ? "#494949" : "#FFF"}}>
                    { text }
                </Text>
            </TouchableOpacity>
        );
    };

};

Button.defaultProps = {
    color: "transparent",
    size: 60,
    flat: false,
    text: "",
    onPress: () => {}
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#FFF",
        padding: 10,
        borderRadius: 30,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 4,

        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: "#FFF",
        fontSize: 35,
    }
});
