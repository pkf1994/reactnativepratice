import React,{Component,Fragment} from 'react'
import {FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createMaterialTopTabNavigator,createAppContainer} from "react-navigation"
import {PopularTabView} from './component'
import {NavigationBar} from '../../component'
import {connect} from 'react-redux'
import Feather from "react-native-vector-icons/Feather";
import NavigationUtil from "../../navigation/NavigationUtil";
type Props = {}

class PopularPage extends Component<Props> {
    constructor(props) {
        super(props)
    }

    initTopTab() {
        const {tabList} = this.props
        var tabObj = {}
        tabList.forEach((item,index) => {
            if(item.checked) {
                tabObj[`PopularTab${index}`] = {
                    screen: props => <PopularTabView {...props} tabLabel={item.path}/>,
                    navigationOptions: {
                        title: item.name
                    }
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
                        backgroundColor: this.props.theme
                    },
                    indicatorStyle: styles.indicatorStyle,
                    labelStyle: styles.labelStyle
                },
                lazy: true
            }
        ))
    }

    getRightButton() {
        return (
            <TouchableOpacity onPress={()=>{NavigationUtil.goPage(null,'SearchPage')}} style={styles.rightButton}>
                <Feather name="search" size={24} style={{color:'white'}}/>
            </TouchableOpacity>
        )
    }

    render() {
        const TopTab = this.initTopTab()
        return (
            <Fragment>
                <NavigationBar title='最热'
                               rightButton={this.getRightButton()}
                               style={{backgroundColor: this.props.theme}}/>
                <TopTab/>
            </Fragment>
        );
    }
}

const mapState = (state) => ({
    theme: state.ui.theme,
    tabList: state.customKey.popular
})

const mapDispatch = (dispatch) => ({
})

export default connect(mapState,mapDispatch)(PopularPage)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B3F7DB'
    },
    rightButton: {
        padding: 5,
        marginRight: 8
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