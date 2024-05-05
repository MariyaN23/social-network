import {addPostActionCreator, deletePostActionCreator, profilePagePropsType, profileReducer} from './profile-reducer';

let startState: profilePagePropsType

beforeEach(()=>{
    startState = {
        profile: null,
        posts: [
            {id: "1", message: 'Hi, how are you?', likeCounts: 15},
            {id: "2", message: 'It\'s my first post', likeCounts: 20}
        ],
        status: ''
    }
})

test ('correct post should be added', ()=> {
    const endState = profileReducer(startState, addPostActionCreator('hello world'))

    expect(endState.posts.length).toBe(3)
    expect(endState.posts[0].message).toBe('hello world')
})

test ('correct post should be deleted', ()=> {
    const endState = profileReducer(startState, deletePostActionCreator("1"))

    expect(endState.posts.length).toBe(1)
})