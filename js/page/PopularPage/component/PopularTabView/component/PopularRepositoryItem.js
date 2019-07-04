import React, {Component} from 'react'
import {Image,StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import PropTypes from "prop-types";
import {BaseItem} from "../../../../../component";

export default class PopularRepositoryItem extends BaseItem{
    static propTypes = {
        repositoryModel: PropTypes.object,
        onSelect: PropTypes.func,
        isFavorite: PropTypes.bool,
        onFavorite: PropTypes.func
    }


    render() {
        const {repositoryModel,onSelect} = this.props
        if(!repositoryModel || !repositoryModel.owner) return null
        return (
            <TouchableOpacity onPress={onSelect}>

                <View style={styles.container}>
                    {/*仓库全名*/}
                    <Text style={styles.title}>
                        {repositoryModel.full_name}
                    </Text>
                    {/*仓库描述*/}
                    <Text style={styles.description}>
                        {repositoryModel.description}
                    </Text>

                    {/*仓库信息*/}
                    <View style={styles.metaRow}>

                        {/*仓库作者*/}
                        <View style={styles.row}>
                            <Text>Author: </Text>
                            <Image source={{uri:repositoryModel.owner.avatar_url}}
                                   style={styles.avatar}/>
                        </View>

                        {/*仓库star数*/}
                        <View style={styles.row}>
                            <Text>Star:</Text>
                            <Text>{repositoryModel.stargazers_count}</Text>
                        </View>

                        {/*star按钮*/}
                        {this.generateFavoriteIcon()}
                    </View>

                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        marginHorizontal: 5,
        marginVertical: 3,
        borderColor: '#dddddd',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2
    },
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121'
    },
    description: {
        fontSize: 14,
        lineHeight: 18,
        marginBottom: 2,
        color: '#757575'
    },
    metaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        height: 22,
        width: 22
    },
    starButton: {
        padding: 6
    }
})