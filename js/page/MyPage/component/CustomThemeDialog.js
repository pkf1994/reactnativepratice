import React,{Component} from 'react'
import {
    StyleSheet,
    Modal,
    TouchableOpacity,
    TouchableHighlight,
    View,
    Text,
    ScrollView,
    StatusBar
} from 'react-native';
import {connect} from 'react-redux'
import {createAction_changeTheme} from "../../../redux/module/ui/action";
type Props = {}

const ThemeFlags = {
    Default:'#4caf50',
    Red: '#F44336',
    Pink:'#E91E63',
    Purple:'#9C27B0',
    DeepPurple:'#673AB7',
    Indigo:'#3F51B5',
    Blue:'#2196F3',
    LightBlue:'#03A9F4',
    Cyan:'#00BCD4',
    Teal:'#009688',
    Green:'#4CAF50',
    LightGreen:'#8BC34A',
    Lime:'#CDDC39',
    Yellow:'#FFEB3B',
    Amber:'#FFC107',
    Orange:'#FF9800',
    DeepOrange:'#FF5722',
    Brown:'#795548',
    Grey:'#9E9E9E',
    BlueGrey:'#607D8B',
    Black:'#000000'
}

class CustomThemeDialog extends Component<Props> {
    state = {
        visible:false
    }
    show() {
        this.setState({
            visible: true
        })
    }
    dismiss() {
        this.setState({
            visible: false
        })
    }

    getItem(key,value) {
        const {changeTheme} = this.props
        return (
            <TouchableHighlight  underlayColor='white' style={{flex: 1}}
                                 onPress={async ()=>{await changeTheme(value);this.dismiss()}}>
                <View style={[styles.item_container,{backgroundColor: value}]}>
                    <Text style={{color: 'white',fontSize:20}}>{key}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    renderItemList() {
        const itemViews = []
        for(let i = 0, keys = Object.keys(ThemeFlags), l = keys.length; i < l; i += 3) {
            const key1 = keys[i]
            const key2 = keys[i + 1]
            const key3 = keys[i + 2]
            itemViews.push(<View key={i} style={{flexDirection:'row'}}>
                {this.getItem(key1,ThemeFlags[key1])}
                {this.getItem(key2,ThemeFlags[key2])}
                {this.getItem(key3,ThemeFlags[key3])}
            </View>)
        }
        return itemViews
    }

    render() {
        const {visible} = this.state
        const {onClose, onSelect, data} = this.props
        return (
            <Modal transparent={true} visible={visible} onRequestClose={onClose} animationType={'slide'}>
                <View style={styles.container}>
                    <ScrollView>
                        {this.renderItemList()}
                    </ScrollView>
                </View>
            </Modal>
        )
    }
}

const mapState = (state) => ({
})


const mapDispatch = (dispatch) => ({
    changeTheme: (newTheme) => {
        dispatch(createAction_changeTheme({
            theme: newTheme
        }))
    }
})

export default connect(mapState,mapDispatch,null,{forwardRef: true})(CustomThemeDialog)

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        margin: 5,
        marginTop: 5 + StatusBar.currentHeight,
        shadowColor: 'gray',
        shadowOffset: {width:2,height:2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        padding: 4
    },
    item_container: {
        height: 120,
        margin: 3,
        padding: 3,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    line: {
        height: 0.3,
        backgroundColor: 'darkgray'
    }
})