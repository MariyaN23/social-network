import {v1} from 'uuid';
import {ActionType, PostPropsType, profilePagePropsType} from './store';

const ADD_POST = 'ADD-POST'
const CHANGE_NEW_POST_TEXT = 'CHANGE-NEW-POST-TEXT'

export const profileReducer = (state: profilePagePropsType, action: ActionType)=> {
    switch (action.type) {
        case ADD_POST: {
            const newPost: PostPropsType = {
                id: v1(),
                message: state.newPostText,
                likeCounts: 0
            }
            state.posts.push(newPost)
            state.newPostText = ''
            return state
        }
        case CHANGE_NEW_POST_TEXT: {
            state.newPostText = action.newPostText
            return state
        }
        default: {
            return state
        }
    }
}

export const addPostActionCreator = ()=> ({type: ADD_POST}) as const
export const changeNewPostTextActionCreator =(text: string)=> ({type: CHANGE_NEW_POST_TEXT, newPostText: text}) as const