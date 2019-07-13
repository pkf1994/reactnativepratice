import React,{Component} from 'react'
import {View} from 'react-native';
import {connect} from "react-redux";
import { CheckBox } from 'react-native-elements'
import {NavigationBar,LeftBackButton,SettingItem} from '../../component'
import GlobalStyles from "../../util/GlobalStyles";
import NavigationUtil from "../../navigation/NavigationUtil";
import {createAction_updateCheckedKeyList} from "../../redux/module/customKey/action";
type Props = {}
class CustomKeyPage extends Component<Props> {

    onBack() {
        const {navigation} = this.props
        NavigationUtil.goBack(navigation)
    }

    render() {
        const {theme,customKey,navigation,updateCheckedKeyList} = this.props
        const params = navigation.state.params
        const {flag} = params
        const keyList = customKey[flag]
        const title = flag === 'popular' ? '自定义最热标签' : '自定义趋势标签'
        return (
            <View style={GlobalStyles.root_container}>
                <NavigationBar title={title}
                               style={{backgroundColor: theme}}
                               leftButton={<LeftBackButton callback={()=>this.onBack()}/>}/>
                {
                    keyList.map((item) => {
                        return <CheckBox title={item.name}
                                         checked={item.checked}
                                         key={item.name} onPress={() => updateCheckedKeyList(item,flag)}/>
                    })
                }
            </View>
        );
    }

}

const mapState = (state) => ({
    theme: state.ui.theme,
    customKey: state.customKey
})

const mapDispatch = (dispatch) => ({
    updateCheckedKeyList: (item,flag) => {
        const action = createAction_updateCheckedKeyList({
            flag: flag,
            item: item
        })
        dispatch(action)
    }
})

export default connect(mapState,mapDispatch)(CustomKeyPage)
