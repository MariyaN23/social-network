import axios from 'axios';
import {FilterType, UserType} from '../redux/users-reducer';
import {ProfileType} from '../redux/profile-reducer';
import {DataType} from '../redux/auth-reducer';
import {AuthFormType} from '../components/login/LoginForm';

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
    withCredentials: true
})

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
    }
}