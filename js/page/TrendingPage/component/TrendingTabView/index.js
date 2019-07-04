import React,{Component} from 'react'
import {FlatList, StyleSheet, Text, View, RefreshControl, ActivityIndicator,DeviceEventEmitter} from 'react-native';
import {TrendingRepositoryItem} from './component'
import {connect} from "react-redux";
import Toast, {DURATION} from 'react-native-easy-toast'
import {
    createSyncAction_getMoreTrendingData,
    createSyncAction_getTrendingData
} from "../../../../redux/module/trending/action";
import {EVENT_TYPE_SINCE_OF_TRENDING_CHANGE} from "../../../../constant/deviceEvent";
import NavigationUtil from "../../../../navigation/NavigationUtil";
import {createAction_updateFavoriteList} from "../../../../redux/module/favorite/action";

const URL = "https://github-trending-api.now.sh/repositories?since=daily&language="

class TrendingTabView extends Component {

    componentDidMount(): void {
        this.getInitialData()
        this.sinceChangeListener = DeviceEventEmitter.addListener(EVENT_TYPE_SINCE_OF_TRENDING_CHANGE,since => {
            this.since = since
            this.getInitialData()
        })
    }

    componentWillUnmount(): void {
        this.sinceChangeListener && this.sinceChangeListener.remove()
    }

    getInitialData() {
        const {tabLabel} = this.props
        const url = URL + tabLabel + '&since=' + (this.since ? this.since : 'daily')
        this.props.getData(tabLabel,url)
    }

    getNextPageData() {
        const {trending,tabLabel} = this.props
        let store = trending[tabLabel]
        if(store.loadingMore) return
        this.props.getMoreData(tabLabel,(msg) => {
            this.refs.toast.show(msg,DURATION.LENGTH_SHORT);
        },trending)
    }

    goDetailPage(item) {
        NavigationUtil.goPage({fullName: item.author + '/' + item.name,item: item,from: 'trending'},'DetailPage')
    }

    renderItem(data) {
        const item = data.item
        const {favoriteList} = this.props
        const isFavorite = favoriteList.some((favoriteItem) => {
            return favoriteItem.key === item.author + '/' + item.name
        })
        return <TrendingRepositoryItem repositoryModel={item}
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
        const {trending,tabLabel,theme} = this.props
        let store = trending[tabLabel]
        if(!store) {
            store = {
                items: [],
                loading: false,
                loadingMore: false,
                cursorIndex: trending.pageScale
            }
        }
        const data = store.items ? store.items.slice(0,store.cursorIndex) : store.items
        return (
            <View>
                <FlatList
                    data={data}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => "" + item.name + item.url}
                    refreshControl={<RefreshControl
                        title={'loading'}
                        titleColor={theme}
                        colors={[theme]}
                        refreshing={store.loading}
                        onRefresh={() => this.getInitialData()}
                        tintColor={theme}
                    />}
                    ListFooterComponent={() => {
                        if(!store.items || store.items.length <= store.cursorIndex) return null
                        return this.listFooterComponent(store)
                    }}
                    onEndReached={() => this.getNextPageData()}
                    onEndReachedThreshold={0.2}
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
    trending: state.trending,
    theme: state.ui.theme,
    favoriteList: state.favorite.trending
})

const mapDispatch = (dispatch) => ({
    getData: (storeName,url) => {
        dispatch(createSyncAction_getTrendingData(storeName,url))
    },
    getMoreData: (storeName,callback,trending) => {
        if(trending[storeName].items.length  <= trending[storeName].cursorIndex) return
        dispatch(createSyncAction_getMoreTrendingData(storeName,callback))
    },
    updateFavoriteStatus: (item) => {
        const payload = {
            id: 'trending',
            key: item.author + '/' + item.name,
            item: item
        }
        dispatch(createAction_updateFavoriteList(payload))
    }
})

export default connect(mapState,mapDispatch)(TrendingTabView)

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