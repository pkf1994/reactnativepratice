import React,{Component} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {connect} from "react-redux";
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {NavigationBar,LeftBackButton,SettingItem} from '../../component'
import {createAction_changeTheme} from "../../redux/module/ui/action";
import {MENU_META} from "./menu";
import GlobalStyles from "../../util/GlobalStyles";
import NavigationUtil from "../../navigation/NavigationUtil";
type Props = {}
class MyPage extends Component<Props> {

    getRightButton() {
        return (
            <TouchableOpacity onPress={()=>{}} style={styles.rightButton}>
                <Feather name="search" size={24} style={{color:'white'}}/>
            </TouchableOpacity>
        )
    }

    getLeftButton() {
        return (
            <TouchableOpacity onPress={()=>{}} style={styles.leftButton}>
                <Ionicons name="ios-arrow-back" size={24} style={{color:'white'}}/>
            </TouchableOpacity>
        )
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
        const {changeTheme,theme} = this.props
        return (
            <View style={GlobalStyles.root_container}>
                <NavigationBar title="我的"
                               style={{backgroundColor: theme}}
                               leftButton={<LeftBackButton callback={()=>{}}/>}
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
                    {/*标签移除*/}
                    {this.getItem(MENU_META.Remove_Key)}

                    <Text style={styles.groupTitle}>设置</Text>
                    {/*自定义主题*/}
                    {this.getItem(MENU_META.Custom_Theme)}
                    {/*关于作者*/}
                    {this.getItem(MENU_META.About_Author)}
                    {/*反馈*/}
                    {this.getItem(MENU_META.Feedback)}
                </ScrollView>
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
        marginTop: 10,
        marginBottom: 5,
        fontSize: 12,
        color: 'gray'
    }
})