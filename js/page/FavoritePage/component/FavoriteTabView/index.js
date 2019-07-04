import React,{Component} from 'react'
import {FlatList, StyleSheet, Text, View, RefreshControl, ActivityIndicator} from 'react-native';
import {
    createSyncAction_getMorePopularData,
    createSyncAction_getPopularData
} from "../../../../redux/module/popular/action";
import {connect} from "react-redux";
import NavigationUtil from "../../../../navigation/NavigationUtil";
import {createAction_updateFavoriteList} from "../../../../redux/module/favorite/action";
import TrendingRepositoryItem from "../../../TrendingPage/component/TrendingTabView/component/TrendingRepositoryItem";
import PopularRepositoryItem from "../../../PopularPage/component/PopularTabView/component/PopularRepositoryItem";

class FavoriteTabView extends Component {

    goDetailPage(item) {
        const {tabLabel} = this.props
        const favoriteFlag = tabLabel === '最热' ? 'popular' : 'trending'
        const fullName = tabLabel === '最热' ? item.full_name : item.author + '/' + item.name
        NavigationUtil.goPage({fullName: fullName, item: item, from: favoriteFlag},'DetailPage')
    }

    renderItem(data) {
        const {item} = data.item
        const {favorite,tabLabel} = this.props
        const favoriteFlag = tabLabel === '最热' ? 'popular' : 'trending'
        const favoriteList = favorite[favoriteFlag]
        const isFavorite = favoriteList.some((favoriteItem) => {
            return favoriteItem.key === (tabLabel === '最热' ? item.full_name : item.author + '/' + item.name)
        })
        return (
                tabLabel === '最热' ?
                <PopularRepositoryItem repositoryModel={item}
                                       isFavorite={isFavorite}
                                       onFavorite={() => this.props.updateFavoriteStatus(item,'popular')}
                                       onSelect={() => this.goDetailPage(item)}/>
                :
                <TrendingRepositoryItem repositoryModel={item}
                                    isFavorite={isFavorite}
                                    onFavorite={() => this.props.updateFavoriteStatus(item,'trending')}
                                    onSelect={() => this.goDetailPage(item)}/>
        )
    }

    render() {
        const {favorite,tabLabel} = this.props
        const favoriteFlag = tabLabel === '最热' ? 'popular' : 'trending'
        let favoriteList = favorite[favoriteFlag]
        return (
            <View>
                <FlatList
                    data={favoriteList}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => item.item.id ? item.item.id.toString() : item.item.name + item.item.url + ''}
                />
            </View>
        );
    }
}

const mapState = (state) => ({
    popular: state.popular,
    theme: state.ui.theme,
    favorite: state.favorite
})

const mapDispatch = (dispatch) => ({
    getData: (storeName,url) => {
        dispatch(createSyncAction_getPopularData(storeName,url))
    },
    getMoreData: (storeName,url,callback) => {
        dispatch(createSyncAction_getMorePopularData(storeName,url,callback))
    },
    updateFavoriteStatus: (item,id) => {
        const payload = {
            id: id,
            key: id === 'popular' ? item.full_name : item.author + '/' + item.name,
            item: item
        }
        dispatch(createAction_updateFavoriteList(payload))
    }
})

export default connect(mapState,mapDispatch)(FavoriteTabView)

const styles = StyleSheet.create({
    item: {
        marginBottom: 10
    },
    listFooterComponent: {
        alignItems: 'center'
    },
    indicator: {
        margin: 10
    }
})