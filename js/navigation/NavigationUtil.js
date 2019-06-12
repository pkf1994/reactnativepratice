
export default class NavigationUtil {

    static resetToHomePage(params) {
        const {navigation} = params
        navigation.navigate("Main")
    }

    /**
     * 返回
     * @param navigation
     */
    static goBack(navigation) {
        navigation.goBack()
    }

    /**
     * 跳转至指定页面
     * @param params 传参
     * @param page 路由名
     */
    static goPage(params,page) {
        const navigation = NavigationUtil.topNavigation
        if(!navigation) {
            console.log('topNavigation can not be null')
            return
        }
        navigation.navigate(
            page,
            {
                ...params
            }
        )
    }
}