import React,{Component,Fragment} from 'react'
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {createMaterialTopTabNavigator,createAppContainer} from "react-navigation"
import {PopularTabView} from './component'
type Props = {}
export default class PopularPage extends Component<Props> {
    constructor(props) {
        super(props)
        this.tabNames = ['java','c','go','javascript','python']
    }


    initTopTab() {
        var tabObj = {}

        this.tabNames.forEach((item,index) => {
            tabObj[`PopularTab${index}`] = {
                screen: props => <PopularTabView {...props} tabLabel={item}/>,
                navigationOptions: {
                    title: item
                }
            }
        })

        return createAppContainer(createMaterialTopTabNavigator(
            tabObj,
            {
                tabBarOptions: {
                    tabStyle: styles.tabStyle,
                    upperCaseLabel: false,
                    scrollEnabled: true,
                    style: {
                        backgroundColor: "#678"
                    },
                    indicatorStyle: styles.indicatorStyle,
                    labelStyle: styles.labelStyle
                }
            }
        ))
    }

    render() {
        const TopTab = this.initTopTab()
        return (
            <Fragment>
                <StatusBar
                    hidden={false} backgroundColor={'transparent'} translucent barStyle={'light-content'}/>
                <TopTab/>
            </Fragment>
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
    },
    tabStyle: {
        width: 120
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: 'white'
    },
    labelStyle: {
        fontSize: 18,
    }
})