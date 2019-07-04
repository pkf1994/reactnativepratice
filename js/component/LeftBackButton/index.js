import React,{Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import Ionicons from "react-native-vector-icons/Ionicons";
type Props = {}

export default class LeftBackButton extends Component<Props> {

    static propTypes = {
        callback: PropTypes.func
    }


    render() {
        const {callback} = this.props
        return (
            <TouchableOpacity onPress={callback} style={styles.leftButton}>
                <Ionicons name="ios-arrow-back" size={26} style={{color:'white'}}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    leftButton: {
        padding: 5,
        marginLeft: 8
    }
})