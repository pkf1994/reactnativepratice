import React,{Component,Fragment} from 'react'
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {createMaterialTopTabNavigator,createAppContainer} from "react-navigation"
import { SearchBar } from 'react-native-elements';
import {PopularRepositoryItem} from './PopularPage/component/PopularTabView/component'
import Toast, {DURATION} from 'react-native-easy-toast'
import {connect} from 'react-redux'
import Feather from "react-native-vector-icons/Feather";
import NavigationUtil from "../navigation/NavigationUtil";
import {createAsyncAction_getMoreSearchData, createAsyncAction_getSearchData} from "../redux/module/search/action";
import GlobalStyles from "../util/GlobalStyles";
import {createSyncAction_getMorePopularData} from "../redux/module/popular/action";
import AnalyticsModule from '../util/AnalyticsUtil'
type Props = {}

const URL = 'https://api.github.com/search/repositories?q='

class SearchPage extends Component<Props> {
    state = {
        searchText: '',
    };

    componentDidMount(): void {
        //this.getInitialData()
    }

    getInitialData() {
        const {searchText} = this.state
        const {search} = this.props
        const url = URL + searchText + '&page=1&per_page=' + search.pageScale
        this.props.getData(url)
    }

    getNextPageData() {
        const {search} = this.props
        const {loadingMore,paginationLinks} = search
        if(loadingMore) return
        const url = paginationLinks.next

        this.props.getMoreData(url,(msg) => {
            this.refs.toast.show(msg,DURATION.LENGTH_SHORT);
        })
    }

    updateSearch = searchText => {
        this.setState({ searchText });
    };


    goDetailPage(item) {
        //AnalyticsModule.onEvent('goToSearchPage')
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

    listFooterComponent(search) {
        if(search.items === [] || !search.loadingMore) return null
        return <View style={styles.listFooterComponent}>
            <ActivityIndicator style={{...styles.indicator,color: this.props.theme}}/>
            <Text>Loading More...</Text>
        </View>
    }

    render() {
        const {searchText} = this.state
        const {theme,navigation,search} = this.props
        const {items,loading,loadingMore} = search
        return (
            <View style={GlobalStyles.root_container}>
                {/*<StatusBar barStyle={'dark-content'}/>*/}
                <SearchBar
                    platform="android"
                    containerStyle={{paddingTop: StatusBar.currentHeight,backgroundColor: theme}}
                    placeholder="请输入搜索关键词"
                    onChangeText={this.updateSearch}
                    value={searchText}
                    inputStyle={{color: 'white'}}
                    placeholderTextColor={'white'}
                    searchIcon={{color: 'white'}}
                    clearIcon={{color: 'white'}}
                    cancelIcon={{color: 'white',onPress: ()=>NavigationUtil.goBack(navigation)}}
                    selectionColor={'white'}
                    underlineColorAndroid={'transparent'}
                    onSubmitEditing={() => this.getInitialData()}
                />

                {
                    loading ?
                        <ActivityIndicator size="large" color={theme} style={styles.loadingIcon}/>
                        :
                        <FlatList
                            data={items}
                            renderItem={data => this.renderItem(data)}
                            keyExtractor={item => "" + item.id}
                            refreshControl={
                                <RefreshControl
                                    title={'loading'}
                                    titleColor={theme}
                                    colors={[theme]}
                                    refreshing={loading}
                                    onRefresh={() => this.getInitialData()}
                                    tintColor={theme}
                                />
                            }
                            ListFooterComponent={() => this.listFooterComponent(search)}
                            onEndReached={() => this.getNextPageData()}
                            onEndReachedThreshold={0.5}
                        />
                }

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
    theme: state.ui.theme,
    tabList: state.customKey.popular,
    favoriteList: state.favorite.popular,
    search: state.search
})

const mapDispatch = (dispatch) => ({
    getData: (url) => {
        dispatch(createAsyncAction_getSearchData(url))
    },
    getMoreData: (url,callback) => {
        dispatch(createAsyncAction_getMoreSearchData(url,callback))
    },
})

export default connect(mapState,mapDispatch)(SearchPage)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B3F7DB'
    },
    rightButton: {
        padding: 5,
        marginRight: 8
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center'
    },
    tabStyle: {
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: 'white'
    },
    labelStyle: {
        fontSize: 18,
    },
    item: {
        marginBottom: 10
    },
    listFooterComponent: {
        alignItems: 'center'
    },
    indicator: {
        margin: 10
    },
    loadingIcon: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
})