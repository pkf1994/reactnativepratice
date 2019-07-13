import React,{Component} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, BackHandler, Linking} from 'react-native';
import {connect} from "react-redux";
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {NavigationBar,LeftBackButton,SettingItem} from '../../component'
import {createAction_changeTheme} from "../../redux/module/ui/action";
import GlobalStyles from "../../util/GlobalStyles";
import NavigationUtil from "../../navigation/NavigationUtil";
import AboutPageBuilder, {FLAG_ABOUT} from "./AboutPageBuilder";
import config from '../../asset/data/aboutConfig'
import {MENU_META} from "../MyPage/menu";
type Props = {}
class AboutPage extends Component<Props> {

    constructor(props) {
        super(props)
        this.params = props.navigation.state.params
        this.aboutPageBuilder = new AboutPageBuilder({
            ...this.params,
            theme: this.props.theme,
            navigation: props.navigation,
            flagAbout: FLAG_ABOUT.flag_about_me
        },data => this.setState({...data}))
        this.state = {
            data: config
        }
        BackHandler.addEventListener('hardwareBackPress', () => this.onBackButtonPressAndroid())
    }

    componentWillUnmount(): void {
        BackHandler.removeEventListener('hardwareBackPress', () => this.onBackButtonPressAndroid())
    }

    onBackButtonPressAndroid() {
        NavigationUtil.goBack(this.props.navigation)
        return true
    }

    onClick(menu) {
        let RouteName, params = {}
        switch (menu) {
            case MENU_META.Tutorial:
                RouteName = 'WebPage'
                params = {
                    title: '欢迎',
                    url: 'https://github.com/'
                }
                break
            case MENU_META.About_Author:
                RouteName = 'AboutMePage'
                break
            case MENU_META.Feedback:
                const url = 'mailto://crazycodeboy@gmail.com'
                Linking.canOpenURL(url).then(support => {
                    if(support) {
                        Linking.openURL(url)
                    } else {
                        console.log('Linking url can not open')
                    }
                }).catch(e => console.error(e))
                break
        }
        if(RouteName) {
            NavigationUtil.goPage(params,RouteName)
        }
    }

    getItem(menu) {
        return <SettingItem callback={() => this.onClick(menu)}
                            text={menu.name}
                            Icons={menu.Icons}
                            icon={menu.icon}/>
    }

    render() {
        const content = <View>
            {/*教程*/}
            {this.getItem(MENU_META.Tutorial)}
            {/*关于作者*/}
            {this.getItem(MENU_META.About_Author)}
            {/*反馈*/}
            {this.getItem(MENU_META.Feedback)}
        </View>
        return this.aboutPageBuilder.render(content,this.state.data.app)
    }

}

const mapState = (state) => ({
    theme: state.ui.theme
})

const mapDispatch = (dispatch) => ({
    changeTheme: (theme) => {
        const action = createAction_changeTheme(theme)
        dispatch(action)
    }
})

export default connect(mapState,mapDispatch)(AboutPage)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#B3F7DB'
    },
    rightButton: {
        padding: 5,
        marginRight: 8
    },
    leftButton: {
        padding: 5,
        marginLeft: 8
    },
    about_left: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    item: {
        backgroundColor: 'white',
        padding: 10,
        height: 60,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    groupTitle: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 5,
        fontSize: 12,
        color: 'gray'
    }
})