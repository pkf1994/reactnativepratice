import {BackHandler} from 'react-native'

export default class AboutPageBuilder {

    constructor(updateState) {
        this.updateState = updateState
    }

    componentDidMount() {
        fetch('http://www.devio.org/io/GitHubPopular/json/github_app_config.json').then((response) => {
            if(response.ok) {
                return response.json()
            }
            throw new Error("fetch response is not okay")
        }).then(config => {
            if (config) {
                this.updateState({
                    data: config
                })
            }
        }).catch(e => console.log(e))
    }
}