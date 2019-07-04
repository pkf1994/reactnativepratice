import React,{Component} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {connect} from "react-redux";
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {NavigationBar,LeftBackButton} from '../component'
import {createAction_changeTheme} from "../redux/module/ui/action";
type Props = {}
class MyPageDeleted extends Component<Props> {

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

    render() {
        const {changeTheme,theme} = this.props
        return (
            <View style={styles.container}>
                <NavigationBar title="我的"
                               style={{backgroundColor: theme}}
                               leftButton={<LeftBackButton callback={()=>{}}/>}
                               rightButton={this.getRightButton()}/>
               <ScrollView>

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

export default connect(mapState,mapDispatch)(MyPageDeleted)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#B3F7DB'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center'
    },
    rightButton: {
        padding: 5,
        marginRight: 8
    },
    leftButton: {
        padding: 5,
        marginLeft: 8
    }
})