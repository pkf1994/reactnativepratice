import React from 'react'
import {Platform, Text, View, Image, StyleSheet, Dimensions, StatusBar} from 'react-native'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import GlobalStyles from "../../util/GlobalStyles";
import {LeftBackButton, RightShareButton} from "../../component";

const AVATAR_SIZE = 90
const PARALLAX_HEADER_HEIGHT = 270
const STICKY_HEADER_HEIGHT = (Platform.OS === 'ios' ? GlobalStyles.nav_bar_height_ios : GlobalStyles.nav_bar_height_android + StatusBar.currentHeight)
const window = Dimensions.get('window');

export const FLAG_ABOUT = {
    flag_about_me: 'flag_about_me',
    flag_about: 'flag_about',
}

export default class AboutPageBuilder {
    constructor(params,updateState) {
        this.params = params
        this.updateState = updateState
    }

    componentDidMount() {
        fetch('http://www.devio.org/io/GitHubPopular/json/github_app_config.json').then((response) => {
            if(response.ok) {
                return response.json()
            }
            throw new Error("fetch response is not okay")
        }).then(config => {
            if (config) {
                this.updateState({
                    data: config
                })
            }
        }).catch(e => console.log(e))
    }

    goBack() {
        const {navigation} = this.params
        navigation.goBack()
    }

    config(aboutConfig) {
        let avatar = typeof (aboutConfig.avatar) === 'string' ? {uri: aboutConfig.avatar} : aboutConfig.avatar
        return {
            renderBackground:() => (
                <View key="background">
                    <Image source={{uri: aboutConfig.backgroundImg,
                        width: window.width,
                        height: PARALLAX_HEADER_HEIGHT}}/>
                    <View style={{position: 'absolute',
                        top: 0,
                        width: window.width,
                        backgroundColor: 'rgba(0,0,0,.4)',
                        height: PARALLAX_HEADER_HEIGHT}}/>
                </View>
            ),
            renderForeground: () => (
                <View key="parallax-header" style={ styles.parallaxHeader }>
                    <Image style={ styles.avatar } source={avatar}/>
                    <Text style={ styles.sectionSpeakerText }>
                        {aboutConfig.name}
                    </Text>
                    <Text style={ styles.sectionTitleText }>
                        {aboutConfig.description}
                    </Text>
                </View>
            ),
            renderStickyHeader: () => (
                <View key="sticky-header" style={styles.stickySection}>
                    <Text style={styles.stickySectionText}>{aboutConfig.name}</Text>
                </View>
            ),
            renderFixedHeader: () => (
                <View key="fixed-header" style={styles.fixedSection}>
                    <LeftBackButton callback={() => this.goBack()}/>
                    <RightShareButton callback={() => {}}/>
                </View>
            )
        }
    }

    render(contentView,aboutConfig) {
        const {theme} = this.params
        return (
            <ParallaxScrollView
                backgroundColor={theme ? theme : "blue"}
                contentBackgroundColor={GlobalStyles.backgroundColor}
                parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                {...this.config(aboutConfig)}
            >
                {contentView}
            </ParallaxScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        width: 300,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight,
    },
    stickySectionText: {
        color: 'white',
        fontSize: 20
    },
    fixedSection: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        top: 0,
        left: 0,
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingTop: StatusBar.currentHeight,
        alignItems: 'center'
    },
    fixedSectionText: {
        color: '#999',
        fontSize: 20
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 100
    },
    avatar: {
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2
    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 24,
        paddingVertical: 5
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 16,
        lineHeight: 22,
        paddingVertical: 5,
        paddingHorizontal: 15
    }
});
