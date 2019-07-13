import {
    RESORT_CHECKED_KEY_LIST_ACTION,
    UPDATE_CHECKED_KEY_LIST_ACTION,
    UPDATE_FAVORITE_LIST_ACTION
} from "./actionType";
import {createAction_updateCheckedKeyList} from "./action";

const defaultState = {
    popular: [
        {
            "path": "c",
            "name": "C",
            "checked": true
        },
        {
            "path": "c++",
            "name": "C++",
            "checked": true
        },
        {
            "path": "css",
            "name": "CSS",
            "checked": true
        },

        {
            "path": "dart",
            "name": "Dart",
            "checked": false
        },
        {
            "path": "go",
            "name": "Go",
            "checked": false
        },
        {
            "path": "html",
            "name": "HTML",
            "checked": false
        },
        {
            "path": "java",
            "name": "Java",
            "checked": false
        },
        {
            "path": "javascript",
            "short_name": "JS",
            "name": "JavaScript",
            "checked": false
        },
        {
            "path": "kotlin",
            "name": "Kotlin",
            "checked": false
        },
        {
            "path": "matlab",
            "name": "Matlab",
            "checked": false
        },
        {
            "path": "php",
            "name": "PHP",
            "checked": false
        },
        {
            "path": "python",
            "name": "Python",
            "checked": false
        },
        {
            "path": "r",
            "name": "R",
            "checked": false
        },
        {
            "path": "ruby",
            "name": "Ruby",
            "checked": false
        },
        {
            "path": "swift",
            "name": "Swift",
            "checked": false
        },
        {
            "path": "typescript",
            "name": "TypeScript",
            "checked": false
        }
    ],
    trending: [
        {
            "path": "java",
            "name": "Java",
            "checked": true
        },
        {
            "path": "c++",
            "name": "C++",
            "checked": true
        },
        {
            "path": "dart",
            "name": "Dart",
            "checked": true
        },
        {
            "path": "HTML",
            "name": "HTML",
            "checked": true
        },
        {
            "path": "javascript",
            "name": "JavaScript",
            "checked": false
        },
        {
            "path": "python",
            "name": "Python",
            "checked": false
        },
        {
            "path": "TypeScript",
            "name": "TypeScript",
            "checked": false
        },
        {
            "path": "r",
            "name": "R",
            "checked": false
        },
        {
            "path": "ruby",
            "name": "Ruby",
            "checked": false
        },
        {
            "path": "swift",
            "name": "Swift",
            "checked": false
        },
        {
            "path": "kotlin",
            "name": "Kotlin",
            "checked": false
        },
        {
            "path": "matlab",
            "name": "Matlab",
            "checked": false
        },
        {
            "path": "php",
            "name": "PHP",
            "checked": false
        },
    ]
}

export default (state = defaultState, action) => {
    if(action.type === UPDATE_CHECKED_KEY_LIST_ACTION) {
        const currentKeyList = state[action.payload.flag]
        currentKeyList.forEach((item,index) => {
            if(item.name === action.payload.item.name) {
                currentKeyList[index].checked = !action.payload.item.checked
            }
        })
        return {
            ...state,
            [action.payload.flag]: [...currentKeyList]
        }
    }

    if(action.type === RESORT_CHECKED_KEY_LIST_ACTION) {
        const currentKeyList = [...state[action.payload.flag]]
        var i = 0
        currentKeyList.forEach((item,index) => {
            if(item.checked) {
                currentKeyList[index] = action.payload.itemList[i]
                i++
            }
        })

        return {
            ...state,
            [action.payload.flag]: currentKeyList
        }

    }

    return state
}
