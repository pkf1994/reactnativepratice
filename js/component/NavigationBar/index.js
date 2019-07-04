import React, {Component} from 'react'
import {Text, ViewPropTypes, StatusBar, View, Platform,StyleSheet} from 'react-native'
import PropTypes from "prop-types";

const NAVBAR_HEIGHT_IOS = 44
const NAVBAR_HEIGHT_ANDROID = 56

const StatusBarShape = {
    barStyle: PropTypes.oneOf(['light-content','default']),
    hidden: PropTypes.bool,
    backgroundColor: PropTypes.string,
    translucent: PropTypes.bool,
}

export default class NavigationBar extends Component{

    //类型检查
    static propTypes = {
        style: ViewPropTypes.style,
        title: PropTypes.string,
        titleView: PropTypes.element,
        titleLayoutStyle: ViewPropTypes.style,
        hide: PropTypes.bool,
        statusBar: PropTypes.shape(StatusBarShape),
        rightButton: PropTypes.element,
        leftButton: PropTypes.element
    }

    //默认属性
    static defaultProps = {
        statusBar: {
            backgroundColor: 'transparent',
            barStyle: 'light-content',
            hidden: false,
            translucent: true
        }
    }

    getButtonElement(button) {
        return (
            <View style={styles.navBarButton}>
                {button?button:null}
            </View>
        )
    }

    render(){
        let statusBar = !this.props.statusBar.hidden ?
            <StatusBar {...this.props.statusBar} /> : null;

        let titleView = this.props.titleView ? this.props.titleView :
            <Text ellipsizeMode="head" numberOfLines={1} style={styles.title}>{this.props.title ? this.props.title : ''}</Text>

        let content = this.props.hide ? null :
            <View style={styles.navBar}>
                {this.getButtonElement(this.props.leftButton)}
                <View style={[styles.navBarTitleContainer, this.props.titleLayoutStyle]}>
                    {titleView}
                </View>
                {this.getButtonElement(this.props.rightButton)}
            </View>
        return (
            <View style={[styles.container, this.props.style]}>
                {statusBar}
                {content}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    statusBar: {

    },
    title: {
        fontSize: 20,
        color: 'white'
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: Platform.OS === 'ios' ? NAVBAR_HEIGHT_IOS : NAVBAR_HEIGHT_ANDROID
    },
    navBarButton: {
        alignItems: 'center'
    },
    navBarTitleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        marginHorizontal: 30,
        left: 40,
        right: 40,
        top: 0,
        bottom: 0
    },
    container: {
        paddingTop: StatusBar.currentHeight,
    }
})