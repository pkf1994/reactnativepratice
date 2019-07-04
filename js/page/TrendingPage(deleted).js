import React,{Component} from 'react'
import {StyleSheet, Text, View} from 'react-native';
import {Button} from "react-native-vector-icons/AntDesign";
import DataStore from "../dao/DataStore";
type Props = {}
export default class TrendingPageDeleted extends Component<Props> {

    constructor(props) {
        super(props)
        this.state = {
            showText: 'default'
        }
    }

    render() {
        const {showText} = this.state
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>TrendingPage</Text>
                <Button onPress={this.getData.bind(this)}>get data</Button>
                <Text>{showText}</Text>
            </View>
        );
    }

    async getData(){
        let url = `https://api.github.com/search/repositories?q=java`
        const wrappedData = await DataStore.fetchData(url)
        this.setState({
            showText: `${new Date(wrappedData.timestamp)}\\n${JSON.stringify(wrappedData.data).substring(0,50)}`
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B3F7DB'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center'
    }
})