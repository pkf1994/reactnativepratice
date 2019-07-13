import {
    createStackNavigator,
    createSwitchNavigator,
    createBottomTabNavigator,
    createMaterialTopTabNavigator,
    createAppContainer
} from 'react-navigation';
import React, {Component} from 'react'
import {Provider,connect} from 'react-redux'
import WelcomePage from "../page/WelcomePage";
import HomePage from "../page/HomePage";
import DetailPage from "../page/DetailPage";
import WebPage from '../page/WebPage'
import AboutPage from '../page/AboutPage/AboutPage'
import {store,persistor} from '../redux'
import {Platform,StatusBar} from "react-native";
import { PersistGate } from 'redux-persist/es/integration/react'
import AboutMePage from "../page/AboutPage/AboutMePage";
import CustomKeyPage from "../page/CustomKeyPage";
import SortKeyPage from "../page/SortKeyPage";
import SearchPage from "../page/SearchPage";

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
            header: null
        }
    },
    WebPage: {
        screen: WebPage,
        navigationOptions: {
            header: null
        }
    },
    AboutPage: {
        screen: AboutPage,
        navigationOptions: {
            header: null
        }
    },
    AboutMePage: {
        screen: AboutMePage,
        navigationOptions: {
            header: null
        }
    },
    CustomKeyPage: {
        screen: CustomKeyPage,
        navigationOptions: {
            header: null
        }
    },
    SortKeyPage: {
        screen: SortKeyPage,
        navigationOptions: {
            header: null
        }
    },
    SearchPage: {
        screen: SearchPage,
        navigationOptions: {
            header: null
        }
    },
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
                <PersistGate
                    loading={null}
                    persistor={persistor}
                >
                    <NavigationApp/>
                </PersistGate>
            </Provider>
        )
    }
}