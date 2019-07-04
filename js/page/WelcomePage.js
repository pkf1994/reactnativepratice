import React,{Component} from 'react'
import {StyleSheet, Text, View,StatusBar} from 'react-native';
import NavigationUtil from "../navigation/NavigationUtil";
type Props = {}
export default class WelcomePage extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    translucent={true}
                    barStyle="light-content"
                />
                <Text style={styles.welcome}>Welcome!</Text>
            </View>
        );
    }

    componentDidMount(): void {
        NavigationUtil.resetToHomePage({navigation:this.props.navigation})
        this.timer = setTimeout(() => {

        },500)
    }

    componentWillUnmount(): void {
        this.timer && clearTimeout(this.timer)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center'
    }
})