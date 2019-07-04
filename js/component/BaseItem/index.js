import React, {Component} from 'react';
import {TouchableOpacity,StyleSheet} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import PropTypes from "prop-types";

export default class BaseItem extends Component{
    static propTypes = {
        repositoryModel: PropTypes.object,
        onSelect: PropTypes.func,
        isFavorite: PropTypes.bool,
        onFavorite: PropTypes.func
    }


    generateFavoriteIcon() {
        return (
            <TouchableOpacity style={styles.starButton}
                              onPress={() => this.props.onFavorite()}>
                <FontAwesome name={this.props.isFavorite ? 'star' : 'star-o'}
                             size={24}
                             style={{color: '#678'}}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    starButton: {
        padding: 6
    }
})