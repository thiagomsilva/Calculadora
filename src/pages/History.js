import React, { Component } from "react";
import {
    TouchableWithoutFeedback,
    StyleSheet,
    FlatList,
    Modal,
    View,
    Text,
}                   from "react-native";
import { connect }  from "react-redux";

class History extends Component {
    render() {
        const { history, active, onClose } = this.props;

        console.log(history);

        return (
            <Modal
                animationType="fade"
                transparent={ true }
                visible={ active }
                onRequestClose={ onClose }>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <TouchableWithoutFeedback onPress={ onClose }>
                        <View style={ styles.overlay }/>
                    </TouchableWithoutFeedback>
                    <View style={ styles.container }>
                        {(history.length === 0) ? (
                            <Text>Não existem dados a serem exibidos</Text>
                        ) : (
                            <FlatList
                                data={ history }
                                keyExtractor={(item, index) => `${item.text}_${index}` }
                                renderItem={({ item }) => (
                                    <View style={ styles.row }>
                                        <Text>{ item.expression }</Text>
                                        <Text>{ item.result }</Text>
                                    </View>
                                )}
                            />
                        )}
                    </View>
                </View>
            </Modal>
        )
    }
}

const mapStateToProps = (state, props) => ({
    history: state.general.history
})

export default connect(mapStateToProps)(History);

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,.6)",
        flex: 1
    },
    container: {
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
        borderRadius: 6,
        padding: 15,
    },

    row: {
        width: "70%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
});