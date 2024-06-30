import {addPostActionCreator, deletePostActionCreator, profilePagePropsType, profileReducer} from './profile-reducer';

let startState: profilePagePropsType

beforeEach(() => {
    startState = {
        profile: null,
        allIds: ["1","2"],
        byId: {
            '1': {
                id: '1',
                message: 'I like React',
                likeCounts: 10,
                author: {
                    id: '1',
                    name: 'MariyaN23'
                }
                },
                '2': {
                    id: '2',
                    message: 'Hello world',
                    likeCounts: 100,
                    author: {
                        id: '1',
                        name: 'MariyaN23'
                    }
                }
            },
            status: ''
        }
    }
)

    test('correct post should be added', () => {
        const endState = profileReducer(startState, addPostActionCreator('hello world', {id: '1', name: 'MariyaN23'}))

        expect(endState.allIds.length).toBe(3)
        expect(endState.byId[endState.allIds[0]].message).toBe('hello world')
    })

    test('correct post should be deleted', () => {
        const endState = profileReducer(startState, deletePostActionCreator('1'))

        expect(endState.allIds.length).toBe(1)
    })