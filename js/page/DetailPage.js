import React,{Component} from 'react'
import {StyleSheet, View, BackHandler} from 'react-native';
import { WebView } from 'react-native-webview';
import {connect} from 'react-redux'
import {NavigationBar,LeftBackButton,RightShareButton} from '../component'
import NavigationUtil from "../navigation/NavigationUtil";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {createAction_updateFavoriteList} from "../redux/module/favorite/action";
type Props = {}
class DetailPage extends Component<Props> {

    constructor(props) {
        super(props)
        this.state = {
            canGoBack: false,
            url: ''
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

    initRightButtonGroup() {
        const {favorite,navigation} = this.props
        const {fullName,from,item} = navigation.state.params
        const isFavorite = favorite.popular.some((item) => {
            return item.key === fullName
        }) || favorite.trending.some((item) => {
            return item.key === fullName
        })
        return (
            <View style={styles.rightButtonGroup}>
                <FontAwesome name={isFavorite ? 'star' : 'star-o'}
                             onPress={() => this.props.updateFavoriteStatus(item,from,fullName)}
                             color="white"
                             size={24}
                             style={styles.star}/>
                <RightShareButton callback={()=>{}}/>
            </View>
        )
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
        const url = 'https://github.com/' + params.fullName
        return (
            <View style={styles.container}>
                <NavigationBar leftButton={<LeftBackButton callback={()=>this.onBack()}/>}
                               rightButton={this.initRightButtonGroup()}
                               style={{backgroundColor: theme}}
                               title={params.fullName}/>
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

export default connect(mapState,mapActions)(DetailPage)

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