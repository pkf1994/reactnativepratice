import React,{Component} from 'react'
import {StyleSheet, Modal, TouchableOpacity, View, Text, ViewPropTypes,StatusBar} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import PropTypes from "prop-types";
type Props = {}

export default class ListModal extends Component<Props> {

    static propTypes = {
        data: PropTypes.array,
        onSelect: PropTypes.func
    }

    state = {
        visible: false
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
    render() {
        const {visible} = this.state
        const {onClose, onSelect, data} = this.props
        return (
            <Modal transparent={true} visible={visible} onRequestClose={onClose} animationType={'fade'}>
                <TouchableOpacity onPress={() => this.dismiss()}
                                  style={styles.cover}>
                    <MaterialIcons name={'arrow-drop-up'} size={36} style={styles.arrow}/>
                    <View style={styles.container}>
                        {
                            data.map((item,index) => {
                                return <TouchableOpacity onPress={() => onSelect(item)}
                                                         underlayColor='transparent'
                                                         key={item.toString() + index}>
                                    <View style={styles.text_container}>
                                        <Text style={styles.text}>
                                            {item}
                                        </Text>
                                    </View>
                                    {
                                        index !== data.length - 1 &&
                                        <View style={styles.line}/>
                                    }
                                </TouchableOpacity>
                            })
                        }
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    cover: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        flex: 1,
        alignItems: 'center'
    },
    arrow: {
        marginTop: 35 + StatusBar.currentHeight,
        color: 'white',
        padding: 0,
        margin: -15,
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 3,
        paddingTop: 3,
        paddingBottom: 3,
        marginRight: 3
    },
    text_container: {
        fontSize: 16,
        color: 'black',
        fontWeight: '400',
        padding: 8,
        paddingLeft: 26,
        paddingRight: 26
    },
    line: {
        height: 0.3,
        backgroundColor: 'darkgray'
    }
})