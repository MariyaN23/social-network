import axios from 'axios';
import {FilterType, UserType} from '../redux/users-reducer';
import {PhotosType, ProfileType} from '../redux/profile-reducer';
import {DataType} from '../redux/auth-reducer';
import {AuthFormType} from '../components/login/LoginForm';
import {ProfileFormType} from '../components/profile/profileInfo/profileData/ProfileDataForm';

type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
}

type getUsersResponseType = {
    items: UserType[]
    totalCount: number
    error: string | null
}

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'fcbd2d1d-5aab-433e-b249-8b4e322d91d2'
    }
})

export type AuthorApiType = {
    id: string
    name: string
}

export type PostApiType = {
    id: string
    message: string
    likeCounts: number
    author: AuthorApiType
}

export const api = {
    getUsers (currentPage: number, pageSize: number, filter: FilterType) {
        return instance.get<getUsersResponseType>(`users?page=${currentPage}&count=${pageSize}&term=${filter.term}` + (filter.friend === null ? '' : `&friend=${filter.friend}`))
            .then(response => {
                return response.data
            })
    },
    follow(userId: string) {
        return instance.post<ResponseType>(`follow/${userId}`, {})
            .then(response => {
                return response.data
            })
    },
    unfollow(userId: string) {
        return instance.delete<ResponseType>(`follow/${userId}`)
            .then(response => {
                return response.data
            })
    },
    authMe() {
        return instance.get<ResponseType<DataType>>(`auth/me`)
            .then(response => {
                return response.data
            })
    },
    login(loginData: AuthFormType) {
        return instance.post<ResponseType<DataType>>(`auth/login`, loginData)
            .then(response => {
                return response.data
            })
    },
    logout() {
        return instance.delete<ResponseType>(`auth/login`)
            .then(response => {
                return response.data
            })
    },
    getUsersProfile(userId: string) {
        return instance.get<ProfileType>(`profile/${userId}`)
            .then(response => {
                return response.data
            })
    },
    getStatus(userId: string) {
        return instance.get<string>(`/profile/status/${userId}`)
            .then(response => {
                return response.data
            })
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(`/profile/status`, {status})
    },
    updatePhoto(imageFile: any) {
        const formData = new FormData()
        formData.append('image', imageFile)
        return instance.put<ResponseType<{photos: PhotosType}>>(`/profile/photo`, formData)
    },
    updateProfile(profileData: ProfileFormType) {
        return instance.put<ResponseType>(`/profile`, profileData)
    },
    getCaptcha() {
        return instance.get<{ url: string }>(`/security/get-captcha-url`)
    },
    getPosts(): Promise<PostApiType[]>{
        return new Promise((res)=> {
            setTimeout(()=> {
                res([{id: "1",
                    message: 'I like React',
                    likeCounts: 10,
                    author: {
                        id: "1",
                        name: "MariyaN23"
                    }
                },
                    {id: "2",
                        message: 'Hello world',
                        likeCounts: 100,
                        author: {
                            id: "1",
                            name: "MariyaN23"
                        }
                    },
                    {id: "3",
                        message: 'I like Pizza',
                        likeCounts: 228,
                        author: {
                            id: "2",
                            name: "YuraN24"
                        }
                    }
                ])
            }, 1000)
        })
    }
}