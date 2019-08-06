
import React, { Component } from 'react';
import {
    StyleSheet,
    StatusBar,
    View,
    Image,
    FlatList,
    Text,
    TouchableOpacity,
} from 'react-native';
import Button               from '../components/Button';
import Card                 from '../components/Card';
import { addMath }          from '../actions/general';
import { connect }          from 'react-redux';
import options              from '../Options';
import History              from './History'



class Home extends Component {

    constructor() {
        super();

        this.state = {
            expression: "",
            result: "",
            modal: false
        }
    }

    incrementExpression = (v) => {
        const { expression, result } = this.state;

        if (v === "=")
            return this.getResult();

        return this.setState({ 
            expression: v === 'C' ? '' : this.state.expression + v,
            result: v === 'C' ? '' : result
        })
    };

    getResult = () => {
        let { expression } = this.state;
        expression = expression.replace(/×/g, "*").replace(/÷/g, "/").replace(/\+/g, "%2B").replace(/−/g, "-");

        this.setState({ result: "Calculando..." });

        fetch(`https://api.mathjs.org/v4/?expr=${expression}`).then(r => r.json()).then(res => {
            this.setState({ result: res });
            this.saveMath(res);
        }).catch((error) => {
            this.setState({ result: "Expressão inválida!" });
            this.saveMath("Expressão inválida!");
        });
    }

    saveMath = (result) => {
        this.props.addMath({
            expression: this.state.expression,
            result: result,
        });
    }

    toggleModal = () => this.setState({ modal: !this.state.modal });

    render() {

        const { expression, result, modal } = this.state;

        return (
            <View style={styles.container}>
                <History active={ modal } onClose={ this.toggleModal }/>
                <StatusBar backgroundColor="rgba(0,0,0,0.15)" barStyle="dark-content"/>
                <View style={ styles.header }>
                    <TouchableOpacity style={ styles.buttonIcon } onPress={ this.toggleModal }
                        activeOpacity={ 0.75 }>
                        <Image
                            resizeMode="cover"
                            style={ styles.historyIcon }
                            source={ require("../assets/ic_history.png") }
                        />
                    </TouchableOpacity>
                    <Text style={ styles.expression }>
                        { expression }
                    </Text>
                    <Text style={ styles.expression }>
                        { result }
                    </Text>
                </View>
                <Card>
                    <FlatList
                        columnWrapperStyle={{ justifyContent: "space-around" }}
                        numColumns={4}
                        data={options}
                        keyExtractor={(item) => item.text}
                        renderItem={({ item }) => (
                            <Button
                                color={item.color}
                                text={item.text}
                                flat={item.flat}
                                size={item.size}
                                onPress={this.incrementExpression}
                            />
                        )}
                    />
                </Card>
            </View>
        );
    };

}


export default connect(null, { addMath })(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "#EFEFEF"
    },
    header: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-end",
        padding: 30,
    },
    expression: {
        fontSize: 27,
        color: "rgba(75, 75, 75, 0.85)"
    },
    result: {
        color: "#2C2C2C",
        fontSize: 35,
        fontWeight: "600",
        marginTop: 8
    },
    buttonIcon: {
        position: "absolute",
        top: 15,
        left: 15,
        opacity: 0.65
    },
    historyIcon: {
        width: 30,
        height: 30,
    }
});
