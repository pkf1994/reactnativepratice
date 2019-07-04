import React,{Component} from 'react'
import {BackHandler} from 'react-native'
import {connect} from 'react-redux'
import {createBottomTabNavigator,createAppContainer} from 'react-navigation'
import {BottomTabBar} from 'react-navigation-tabs'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import PopularPage from "../PopularPage";
import TrendingPage from "../TrendingPage";
import FavoritePage from "../FavoritePage";
import MyPage from "../MyPage";
import NavigationUtil from "../../navigation/NavigationUtil";
type Props = {}

class HomePage extends Component<Props> {

    constructor(props) {
        super(props);
        BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    }

    componentWillUnmount(): void {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    }


    initBottomTab() {
        if(this.bottomTabNavigator){
            return this.bottomTabNavigator
        }
        return this.bottomTabNavigator = createAppContainer(createBottomTabNavigator({
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
        },
        {
            tabBarComponent: props => (
                <TabBarComponent {...props} theme={this.props.theme}/>
            )
        }

        ))
    }

    onBackButtonPressAndroid = () => {
        console.log('click back')
        return false
    }

    render() {
        const BottomTab = this.initBottomTab()
        NavigationUtil.topNavigation = this.props.navigation
        return (
            <BottomTab/>
        );
    }
}

class TabBarComponent extends Component{
    constructor(props) {
        super(props)
    }
    render(){
        return <BottomTabBar {...this.props} activeTintColor={this.props.theme}/>
    }
}

const mapState = (state) => ({
    theme: state.ui.theme
})

const mapDispatch = (dispatch) => ({

})

export default connect(mapState,mapDispatch)(HomePage)

