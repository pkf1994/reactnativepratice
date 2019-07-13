import React,{Component} from 'react'
import {StyleSheet, Text, View, TouchableHighlight, ScrollView,Linking} from 'react-native';
import {connect} from "react-redux";
import SortableListView from 'react-native-sortable-listview'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {NavigationBar,LeftBackButton,SettingItem} from '../../component'
import GlobalStyles from "../../util/GlobalStyles";
import NavigationUtil from "../../navigation/NavigationUtil";
import {
    createAction_resortCheckedKeyList,
    createAction_updateCheckedKeyList
} from "../../redux/module/customKey/action";
import Ionicons from "react-native-vector-icons/Ionicons";
type Props = {}
class SortKeyPage extends Component<Props> {

    constructor(props) {
        super(props)
        const {customKey,navigation} = props
        const params = navigation.state.params
        const {flag} = params
        const checkedKeyList = customKey[flag].filter((item) => {
            return item.checked
        })
        this.state = {
            flag: flag,
            checkedKeyList: checkedKeyList
        }
    }

    onBack() {
        const {navigation} = this.props
        NavigationUtil.goBack(navigation)
    }

    updateCheckedKeyList(to,from) {
        const {flag} = this.state
        const {resortCheckedKeyList} = this.props
        const newCheckedKeyList = [...this.props.customKey[flag]].filter((item) => {
            return item.checked
        })
        newCheckedKeyList.splice(to, 0, newCheckedKeyList.splice(from, 1)[0])
        this.setState({
            checkedKeyList: newCheckedKeyList
        })
        resortCheckedKeyList(newCheckedKeyList,flag)
    }


    render() {
        const {theme,resortCheckedKeyList} = this.props
        const {checkedKeyList,flag} = this.state
        const order = Object.keys(checkedKeyList)
        const title = flag === 'popular' ? '最热标签排序' : '趋势标签排序'
        return (
            <View style={GlobalStyles.root_container}>
                <NavigationBar title={title}
                               style={{backgroundColor: theme}}
                               leftButton={<LeftBackButton callback={()=>this.onBack()}/>}/>
                <SortableListView
                    style={{ flex: 1 }}
                    data={checkedKeyList}
                    order={order}
                    onRowMoved={e => {
                        this.updateCheckedKeyList(e.to,e.from)
                        this.forceUpdate()
                    }}
                    renderRow={row => <RowComponent data={row} theme={theme}/>}
                />
            </View>
        );
    }
}

class RowComponent extends Component{
    render() {
        const {data,theme} = this.props
        return (
            <TouchableHighlight style={styles.item_container}
                                underlayColor={'#eee'}
                                {...this.props.sortHandlers}>
                <View style={{alignItems: 'center',flexDirection: 'row'}}>
                    <FontAwesome name='sort' size={20} color={theme} style={{marginRight: 8}}/>
                    <Text>{data.name}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

const mapState = (state) => ({
    theme: state.ui.theme,
    customKey: state.customKey
})

const mapDispatch = (dispatch) => ({
    resortCheckedKeyList: (itemList,flag) => {
        const action = createAction_resortCheckedKeyList({
            flag: flag,
            itemList: itemList
        })
        dispatch(action)
    }
})

export default connect(mapState,mapDispatch)(SortKeyPage)

const styles = StyleSheet.create({
    item_container: {
        backgroundColor: 'white',
        padding: 10,
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
})