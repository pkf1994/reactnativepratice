import React,{Component} from 'react'
import {StyleSheet, View, BackHandler} from 'react-native';
import { WebView } from 'react-native-webview';
import {connect} from 'react-redux'
import {NavigationBar,LeftBackButton,RightShareButton} from '../../component'
import NavigationUtil from "../../navigation/NavigationUtil";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {createAction_updateFavoriteList} from "../../redux/module/favorite/action";
type Props = {}
class WebPage extends Component<Props> {

    constructor(props) {
        super(props)
        const params = props.navigation.state.params
        this.state = {
            canGoBack: false,
            url: params.url,
            title: params.title
        }
        BackHandler.addEventListener('hardwareBackPress', () => this.onBackButtonPressAndroid())
    }

    componentWillUnmount(): void {
        BackHandler.removeEventListener('hardwareBackPress', () => this.onBackButtonPressAndroid())
    }

    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url
        })
    }

    onBackButtonPressAndroid() {
        if(this.state.canGoBack) {
            this.webView.goBack()
            return true
        } else {
            return false
        }
    }


    onBack() {
        if(this.state.canGoBack) {
            this.webView.goBack()
        } else {
            NavigationUtil.goBack(this.props.navigation)
        }
    }

    render() {
        const {theme,navigation} = this.props
        const params = navigation.state.params
        const {url,title} = this.state
        return (
            <View style={styles.container}>
                <NavigationBar leftButton={<LeftBackButton callback={()=>this.onBack()}/>}
                               style={{backgroundColor: theme}}
                               title={title}/>
                <WebView ref={webView => this.webView = webView}
                         style={styles.webView}
                         source={{uri: url}}
                         javaScriptEnabled={true}
                         onNavigationStateChange={navState => this.onNavigationStateChange(navState)}
                         startInLoadingState={true} />
            </View>
        );
    }
}

const mapState = (state) => ({
    theme: state.ui.theme,
    favorite: state.favorite
})

const mapActions = (dispatch) => ({
    updateFavoriteStatus: (item,id,key) => {
        const payload = {
            id: id,
            key: key,
            item: item
        }
        dispatch(createAction_updateFavoriteList(payload))
    }
})

export default connect(mapState,mapActions)(WebPage)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    webView: {
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center'
    },
    star: {
        padding: 5,
        marginVertical: 8
    },
    rightButtonGroup: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})