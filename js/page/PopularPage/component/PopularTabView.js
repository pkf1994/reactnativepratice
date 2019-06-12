import React,{Component} from 'react'
import {StyleSheet, Text, View} from 'react-native';
import NavigationUtil from "../../../navigation/NavigationUtil";

export default class PopularTabView extends Component {

    render() {
        const {tabLabel} = this.props
        return (
            <View style={styles.container}>
                <Text>{tabLabel}</Text>
                <Text onPress={() => {
                    NavigationUtil.goPage(null,"DetailPage")
                }}>go to detailPage</Text>
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