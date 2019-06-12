import React,{Component} from 'react'
import {StyleSheet, Text, View, StatusBar} from 'react-native';
type Props = {}
export default class DetailPage extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    hidden={false} backgroundColor={'transparent'} translucent barStyle={'dark-content'}/>
                <Text style={styles.welcome}>DetailPage</Text>
            </View>
        );
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