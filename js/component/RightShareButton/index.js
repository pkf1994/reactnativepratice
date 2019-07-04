import React,{Component} from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import Ionicons from "react-native-vector-icons/Ionicons";
type Props = {}

export default class RightShareButton extends Component<Props> {

    static propTypes = {
        callback: PropTypes.func
    }


    render() {
        const {callback} = this.props
        return (
            <TouchableOpacity onPress={callback} style={styles.rightButton}>
                <Ionicons name="md-share" size={24} style={{color:'white'}}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    rightButton: {
        padding: 5,
        marginRight: 8
    }
})