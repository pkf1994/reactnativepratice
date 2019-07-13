import React,{Component} from 'react'
import {StyleSheet, Clipboard, View, BackHandler, Linking} from 'react-native';
import {connect} from "react-redux";
import Ionicons from 'react-native-vector-icons/Ionicons'
import {SettingItem} from '../../component'
import {createAction_changeTheme} from "../../redux/module/ui/action";
import NavigationUtil from "../../navigation/NavigationUtil";
import AboutPageBuilder, {FLAG_ABOUT} from "./AboutPageBuilder";
import config from '../../asset/data/aboutConfig'
import Toast, {DURATION} from 'react-native-easy-toast'
type Props = {}
class AboutMePage extends Component<Props> {

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
            data: config,
            showTutorial: false,
            showBlog: false,
            showQQ: false,
            showContact: false
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
        const {data,showTutorial,showBlog,showQQ,showContact} = this.state
        switch (menu) {
            case data.aboutMe.Tutorial:
                this.setState({
                    showTutorial: !showTutorial
                })
                break
            case data.aboutMe.Blog:
                this.setState({
                    showBlog: !showBlog
                })
                break
            case data.aboutMe.QQ:
                this.setState({
                    showQQ: !showQQ
                })
                break
            case data.aboutMe.Contact:
                this.setState({
                    showContact: !showContact
                })
                break
        }
        if(RouteName) {
            NavigationUtil.goPage(params,RouteName)
        }
    }

    onClickLowerTab(tab) {
        if(!tab) return
        if(tab.url) {
            NavigationUtil.goPage({title: tab.title,url: tab.url},'WebPage')
            return
        }
        if(tab.account && tab.account.indexOf('@') > -1) {
            let url = 'mailto://' + tab.account
            Linking.canOpenURL(url).then(support => {
                if(support) return Linking.openURL(url)
                console.log('can not open URL')
            }).catch(e => console.log(e))
            return
        }
        if(tab.account) {
            Clipboard.setString(tab.account)
            this.toast.show(tab.title + tab.account + '已复制到剪切板')
        }
    }

    getItem(menu,show) {
        return <SettingItem callback={() => this.onClick(menu)}
                            expandableIco={show ? 'ios-arrow-up' : 'ios-arrow-down'}
                            text={menu.name}
                            Icons={Ionicons}
                            icon={menu.icon}/>
    }

    getLowerItem(menu,isAccount) {
        const {items} = menu
        const views = []
        for(let i in items) {
            views.push(<SettingItem key={i} callback={() => this.onClickLowerTab(items[i])}  text={isAccount ? items[i].title + ':' + items[i].account : items[i].title }/>)
        }
        return views
    }

    render() {
        const {data,showTutorial,showBlog,showQQ,showContact} =  this.state
        const content = <View>
            {/*教程*/}
            {this.getItem(data.aboutMe.Tutorial,showTutorial)}
            {showTutorial && this.getLowerItem(data.aboutMe.Tutorial,false)}
            {/*博客*/}
            {this.getItem(data.aboutMe.Blog,showBlog)}
            {showBlog && this.getLowerItem(data.aboutMe.Blog,false)}
            {/*微信*/}
            {this.getItem(data.aboutMe.QQ,showQQ)}
            {showQQ && this.getLowerItem(data.aboutMe.QQ,true)}
            {/*联系我*/}
            {this.getItem(data.aboutMe.Contact,showContact)}
            {showContact && this.getLowerItem(data.aboutMe.Contact,true)}
        </View>
        return <View style={{flex: 1}}>
            {this.aboutPageBuilder.render(content,this.state.data.author)}
            <Toast ref={toast => this.toast = toast}
                   position='bottom'
                   positionValue={200}
                   fadeInDuration={750}
                   fadeOutDuration={1000}
                   opacity={0.8}/>
        </View>

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

export default connect(mapState,mapDispatch)(AboutMePage)

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