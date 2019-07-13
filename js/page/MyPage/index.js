import React,{Component} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, ScrollView,Linking} from 'react-native';
import {connect} from "react-redux";
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {NavigationBar,LeftBackButton,SettingItem} from '../../component'
import {CustomThemeDialog} from './component'
import {createAction_changeTheme} from "../../redux/module/ui/action";
import {MENU_META} from "./menu";
import GlobalStyles from "../../util/GlobalStyles";
import NavigationUtil from "../../navigation/NavigationUtil";
type Props = {}
class MyPage extends Component<Props> {

    constructor(props) {
        super(props)
        this.state = {
            showCustomThemeModal: false
        }
    }

    getRightButton() {
        return (
            <TouchableOpacity onPress={()=>{}} style={styles.rightButton}>
                <Feather name="search" size={24} style={{color:'white'}}/>
            </TouchableOpacity>
        )
    }


    onClick = (menu) => {
        let RouteName, params = {}
        switch (menu) {
            case MENU_META.Tutorial:
                RouteName = 'WebPage'
                params = {
                    title: '欢迎',
                    url: 'https://github.com/'
                }
                break
            case MENU_META.About:
                RouteName = 'AboutPage'
                break
            case MENU_META.About_Author:
                RouteName = 'AboutMePage'
                break
            case MENU_META.Custom_key:
                RouteName = 'CustomKeyPage'
                params = {
                    flag: 'popular'
                }
                break
            case MENU_META.Sort_Key:
                RouteName = 'SortKeyPage'
                params = {
                    flag: 'popular'
                }
                break
            case MENU_META.Sort_Language:
                RouteName = 'SortKeyPage'
                params = {
                    flag: 'trending'
                }
                break
            case MENU_META.Custom_Language:
                RouteName = 'CustomKeyPage'
                params = {
                    flag: 'trending'
                }
                break
            case MENU_META.Custom_Theme:
                this.customThemeDialog.show()
                break
        }
        if(RouteName) {
            NavigationUtil.goPage(params,RouteName)
        }
    }

    onBack() {
        const {navigation} = this.props
        NavigationUtil.goBack(navigation)
    }

    getItem(menu) {
        return <SettingItem callback={() => this.onClick(menu)}
                            text={menu.name}
                            Icons={menu.Icons}
                            icon={menu.icon}/>
    }

    render() {
        const {changeTheme,theme} = this.props
        return (
            <View style={GlobalStyles.root_container}>
                <NavigationBar title="我的"
                               style={{backgroundColor: theme}}
                               leftButton={<LeftBackButton callback={()=>this.onBack()}/>}
                               rightButton={this.getRightButton()}/>
                <ScrollView>
                    <TouchableOpacity onPress={() => this.onClick(MENU_META.About)} style={styles.item}>
                        <View style={styles.about_left}>
                            <Ionicons name={MENU_META.About.icon}
                                      size={40}
                                      style={{marginRight: 10,color: theme}}/>
                            <Text>GitHub Popular</Text>
                        </View>
                        <Ionicons name='ios-arrow-forward'
                                  size={16}
                                  style={{marginRight: 10,color: theme}}/>
                    </TouchableOpacity>
                    <View style={GlobalStyles.line}/>
                    {/*教程*/}
                    {this.getItem(MENU_META.Tutorial)}

                    <Text style={styles.groupTitle}>趋势管理</Text>
                    {/*自定义语言*/}
                    {this.getItem(MENU_META.Custom_Language)}
                    {/*语言排序*/}
                    {this.getItem(MENU_META.Sort_Language)}

                    <Text style={styles.groupTitle}>最热管理</Text>
                    {/*自定义标签*/}
                    {this.getItem(MENU_META.Custom_key)}
                    {/*标签排序*/}
                    {this.getItem(MENU_META.Sort_Key)}

                    <Text style={styles.groupTitle}>设置</Text>
                    {/*自定义主题*/}
                    {this.getItem(MENU_META.Custom_Theme)}
                    {/*关于作者*/}
                    {this.getItem(MENU_META.About_Author)}
                    {/*反馈*/}
                    {this.getItem(MENU_META.Feedback)}
                </ScrollView>

                <CustomThemeDialog ref={customThemeDialog => this.customThemeDialog = customThemeDialog}/>
            </View>
        );
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

export default connect(mapState,mapDispatch)(MyPage)

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
        marginTop: 7,
        marginBottom: 7,
        fontSize: 12,
        color: 'gray'
    }
})