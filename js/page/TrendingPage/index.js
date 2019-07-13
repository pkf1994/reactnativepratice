import React,{Component,Fragment} from 'react'
import {StyleSheet,Text,View,DeviceEventEmitter} from 'react-native';
import {createMaterialTopTabNavigator,createAppContainer} from "react-navigation"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {TrendingTabView} from './component'
import {NavigationBar,ListModal} from '../../component'
import {connect} from 'react-redux'
import {EVENT_TYPE_SINCE_OF_TRENDING_CHANGE} from "../../constant/deviceEvent";
type Props = {}

const SINCE_DAILY = '今天'
const SINCE_WEEKLY = '本周'
const SINCE_MONTH = '本月'

class TrendingPage extends Component<Props> {
    constructor(props) {
        super(props)
        this.sinceModalData = [SINCE_DAILY,SINCE_WEEKLY,SINCE_MONTH]
        this.state = {
            since: SINCE_DAILY,
        }
    }

    initTopTab() {
        const {tabList} = this.props
        var tabObj = {}

        tabList.forEach((item,index) => {
            if(item.checked) {
                tabObj[`TrendingTab${index}`] = {
                    screen: props => <TrendingTabView {...props} tabLabel={item.path}/>,
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

    onSelectSinceModal(item) {
        this.sinceModal.dismiss()
        this.setState({
            since: item
        })

        var sinceQueryStr

        if(item === SINCE_DAILY) {
            sinceQueryStr = 'daily'
        } else if(item === SINCE_WEEKLY) {
            sinceQueryStr = 'weekly'
        }else if(item === SINCE_MONTH) {
            sinceQueryStr = 'monthly'
        }
        DeviceEventEmitter.emit(EVENT_TYPE_SINCE_OF_TRENDING_CHANGE,sinceQueryStr)
    }

    showSinceModal() {
        this.sinceModal.show()
    }

    initNavigationTitleView() {
        const {since} = this.state
        return (
            <View style={styles.titleView}>
                <Text style={styles.titleText}>趋势: </Text>
                <Text style={styles.titleText} onPress={() => this.showSinceModal()}>{since}</Text>
                <MaterialIcons style={styles.titleIcon} onPress={() => this.showSinceModal()} name='arrow-drop-down' size={25}/>
            </View>
        )
    }

    render() {
        const TopTab = this.initTopTab()
        return (
            <Fragment>
                <NavigationBar titleView={this.initNavigationTitleView()} style={{backgroundColor: this.props.theme}}/>
                <TopTab/>
                <ListModal data={this.sinceModalData}
                           ref={sinceModal => {this.sinceModal = sinceModal}}
                           onSelect={(item) => this.onSelectSinceModal(item)}/>
            </Fragment>
        );
    }
}

const mapState = (state) => ({
    theme: state.ui.theme,
    tabList: state.customKey.trending
})

const mapDispatch = (dispatch) => ({
})

export default connect(mapState,mapDispatch)(TrendingPage)

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
    },
    titleView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 18,
        color: 'white'
    },
    titleIcon: {
        color: 'white'
    }
})