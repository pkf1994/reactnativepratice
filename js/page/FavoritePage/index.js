import React,{Component,Fragment} from 'react'
import {FlatList, StatusBar, StyleSheet, Text, View} from 'react-native';
import {createMaterialTopTabNavigator,createAppContainer} from "react-navigation"
import {FavoriteTabView} from './component'
import {NavigationBar} from '../../component'
import {connect} from 'react-redux'
type Props = {}

class FavoritePage extends Component<Props> {
    constructor(props) {
        super(props)
        this.tabNames = ['最热','趋势']
    }

    initTopTab() {
        var tabObj = {}

        this.tabNames.forEach((item,index) => {
            tabObj[`FavoriteTab${index}`] = {
                screen: props => <FavoriteTabView {...props} tabLabel={item}/>,
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
                    style: {
                        backgroundColor: this.props.theme
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
                <NavigationBar title='收藏' style={{backgroundColor: this.props.theme}}/>
                <TopTab/>
            </Fragment>
        );
    }
}

const mapState = (state) => ({
    theme: state.ui.theme,
})

const mapDispatch = (dispatch) => ({
})

export default connect(mapState,mapDispatch)(FavoritePage)

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
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: 'white'
    },
    labelStyle: {
        fontSize: 18,
    }
})