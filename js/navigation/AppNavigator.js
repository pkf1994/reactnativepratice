import {
    createStackNavigator,
    createSwitchNavigator,
    createBottomTabNavigator,
    createMaterialTopTabNavigator,
    createAppContainer
} from 'react-navigation';
import React, {Component} from 'react'
import {Provider,connect} from 'react-redux'
import {createReactNavigationReduxMiddleware,reduxifyNavigator} from 'react-navigation-redux-helpers'
import WelcomePage from "../page/WelcomePage";
import HomePage from "../page/HomePage";
import DetailPage from "../page/DetailPage";
import store from '../redux'
import {Platform,StatusBar} from "react-native";

const commonHeaderStyle = Platform.OS === 'android' ? {
    paddingTop: StatusBar.currentHeight,
    height: StatusBar.currentHeight + 56,
} : {}

const InitNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            header: null
        }
    }
});

const MainNavigator = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            header: null
        }
    },
    DetailPage: {
        screen: DetailPage,
        navigationOptions: {
            headerStyle: commonHeaderStyle
        }
    }
});

let NavigationApp =  createAppContainer(createSwitchNavigator(
    {
    Init: InitNavigator,
    Main: MainNavigator
    },
    {
        navigationOptions: {
            header: null
        }
    }
))

export default class ReduxNavigationApp extends React.Component{
    render(){
        return (
            <Provider store={store}>
                <NavigationApp/>
            </Provider>
        )
    }
}