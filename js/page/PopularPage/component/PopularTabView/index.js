import React,{Component} from 'react'
import {FlatList, StyleSheet, Text, View, RefreshControl, ActivityIndicator} from 'react-native';
import {
    createSyncAction_getMorePopularData,
    createSyncAction_getPopularData
} from "../../../../redux/module/popular/action";
import {PopularRepositoryItem} from './component'
import {connect} from "react-redux";
import Toast, {DURATION} from 'react-native-easy-toast'
import NavigationUtil from "../../../../navigation/NavigationUtil";
import {createAction_updateFavoriteList} from "../../../../redux/module/favorite/action";

const URL = "https://api.github.com/search/repositories?q="
const QUERY_STR = "&sort=stars"

class PopularTabView extends Component {

    componentDidMount(): void {
        this.getInitialData()
    }

    getInitialData() {
        const {tabLabel,popular} = this.props
        const pageScale = popular.pageScale
        const url = URL + tabLabel + QUERY_STR + 'page=1&per_page=' + pageScale
        this.props.getData(tabLabel,url)
    }

    getNextPageData() {
        const {popular,tabLabel} = this.props
        let store = popular[tabLabel]
        if(store.loadingMore) return
        const url = popular[tabLabel].paginationLinks.next

        this.props.getMoreData(tabLabel,url,(msg) => {
            this.refs.toast.show(msg,DURATION.LENGTH_SHORT);
        })
    }


    goDetailPage(item) {
        NavigationUtil.goPage({fullName: item.full_name, item: item, from: 'popular'},'DetailPage')
    }


    renderItem(data) {
        const item = data.item
        const {favoriteList} = this.props
        const isFavorite = favoriteList.some((favoriteItem) => {
            return favoriteItem.key === item.full_name
        })
        return <PopularRepositoryItem repositoryModel={item}
                                      isFavorite={isFavorite}
                                      onFavorite={() => this.props.updateFavoriteStatus(item)}
                                      onSelect={() => this.goDetailPage(item)}/>
    }

    listFooterComponent(store) {
        if(!store || !store.items || store.items === []) return null
        return <View style={styles.listFooterComponent}>
            <ActivityIndicator style={{...styles.indicator,color: this.props.theme}}/>
            <Text>Loading More...</Text>
        </View>
    }

    render() {
        const {popular,tabLabel,theme} = this.props
        let store = popular[tabLabel]
        if(!store) {
            store = {
                items: [],
                loading: false,
                loadingMore: false
            }
        }
        return (
            <View style={styles.container}>
                <FlatList
                    data={store.items}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => "" + item.id}
                    refreshControl={
                        <RefreshControl
                            title={'loading'}
                            titleColor={theme}
                            colors={[theme]}
                            refreshing={store.loading}
                            onRefresh={() => this.getInitialData()}
                            tintColor={theme}
                        />
                    }
                    ListFooterComponent={() => this.listFooterComponent(store)}
                    onEndReached={() => this.getNextPageData()}
                    onEndReachedThreshold={0.5}
                />
                <Toast ref="toast"
                       position='top'
                       positionValue={200}
                       fadeInDuration={750}
                       fadeOutDuration={1000}
                       opacity={0.8}/>
            </View>
        );
    }
}

const mapState = (state) => ({
    popular: state.popular,
    theme: state.ui.theme,
    favoriteList: state.favorite.popular
})

const mapDispatch = (dispatch) => ({
    getData: (storeName,url) => {
        dispatch(createSyncAction_getPopularData(storeName,url))
    },
    getMoreData: (storeName,url,callback) => {
        dispatch(createSyncAction_getMorePopularData(storeName,url,callback))
    },
    updateFavoriteStatus: (item) => {
        const payload = {
            id: 'popular',
            key: item.full_name,
            item: item
        }
        dispatch(createAction_updateFavoriteList(payload))
    }
})

export default connect(mapState,mapDispatch)(PopularTabView)

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