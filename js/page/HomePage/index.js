import React,{Component} from 'react'
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator,createAppContainer} from 'react-navigation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import PopularPage from "../PopularPage";
import TrendingPage from "../TrendingPage";
import FavoritePage from "../FavoritePage";
import MyPage from "../MyPage";
import NavigationUtil from "../../navigation/NavigationUtil";
type Props = {}
export default class HomePage extends Component<Props> {

    initBottomTab() {
        return createAppContainer(createBottomTabNavigator({
            PopularPage: {
                screen: PopularPage,
                navigationOptions: {
                    tabBarLabel: "最热",
                    tabBarIcon: ({tintColor}) => (
                        <MaterialIcons
                            name='whatshot'
                            size={26}
                            style={{color: tintColor}}/>
                    )
                }
            },
            TrendingPage: {
                screen: TrendingPage,
                navigationOptions: {
                    tabBarLabel: "趋势",
                    tabBarIcon: ({tintColor}) => (
                        <Ionicons
                            name='md-trending-up'
                            size={26}
                            style={{color: tintColor}}/>
                    )
                }
            },
            FavoritePage: {
                screen: FavoritePage,
                navigationOptions: {
                    tabBarLabel: "收藏",
                    tabBarIcon: ({tintColor}) => (
                        <MaterialIcons
                            name='favorite'
                            size={26}
                            style={{color: tintColor}}/>
                    )
                }
            },
            MyPage: {
                screen: MyPage,
                navigationOptions: {
                    tabBarLabel: "我的",
                    tabBarIcon: ({tintColor}) => (
                        <AntDesign
                            name='user'
                            size={26}
                            style={{color: tintColor}}/>
                    )
                }
            }
        }))
    }

    render() {
        const BottomTab = this.initBottomTab()
        NavigationUtil.topNavigation = this.props.navigation
        return (
            <BottomTab/>
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