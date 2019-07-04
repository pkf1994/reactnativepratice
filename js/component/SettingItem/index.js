import React, {Component,Fragment} from 'react';
import {TouchableOpacity,StyleSheet,Text, View} from 'react-native'
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import Ionicons from "react-native-vector-icons/Ionicons";
import GlobalStyles from "../../util/GlobalStyles";

class SettingItem extends Component{
    static propTypes = {
        callback: PropTypes.func,
        text: PropTypes.string,
        color: PropTypes.string,
        icon: PropTypes.string,
    }

    render() {
        const {callback,Icons,icon,text,color,theme,expandableIco} = this.props
        return (
            <Fragment>
                <TouchableOpacity onPress={callback}
                                  style={styles.setting_item_container}>
                    <View style={{alignItems: 'center',flexDirection: 'row'}}>
                        {
                            Icons && icon ?
                                <Icons name={icon}
                                       size={16}
                                       style={{color:(color ? color : theme),marginRight:10}}/>
                                :
                                <View style={{height:16,width: 16,opacity: 1,marginRight:10}}/>
                        }
                        <Text>{text}</Text>
                    </View>
                    <Ionicons name={expandableIco ? expandableIco : 'ios-arrow-forward'}
                              size={16}
                              style={{marginRight: 10,color: (color ? color : theme)}}/>
                </TouchableOpacity>
                <View style={GlobalStyles.line}/>
            </Fragment>
        )
    }

}

const mapState = (state) => ({
    theme: state.ui.theme
})

export default connect(mapState,null)(SettingItem)

const styles = StyleSheet.create({
    setting_item_container: {
        backgroundColor: 'white',
        padding: 10,
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
})