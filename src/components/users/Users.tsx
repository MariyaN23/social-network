import React from 'react';
import s from './Users.module.css';
import {UsersPropsType} from './UsersContainer';
import axios from 'axios';
import img from '../../assets/images/noavatar.jpg'

export class Users extends React.Component<UsersPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
        .then(response => {
            this.props.setUsers(response.data.items)
            this.props.setUsersCount(response.data.totalCount)
        })
    }
    onPageChanged =(currentPage: number)=> {
        this.props.setCurrentPage(currentPage)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }
    render() {
        const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
        const pages = []
        for (let i = this.props.currentPage-2; i <= this.props.currentPage+2; i++) {
            pages.push(i)
        }
        return <div>
            <div className={s.pageName}>Users</div>
            <div className={s.usersMap}>
                {
                    this.props.users.map(u => <div key={u.id} className={s.user}>
                        <div>
                            <img src={u.photos.small !== null ? u.photos.small : img} className={s.userPhoto}/>
                            <div>
                                {u.followed
                                    ? <button className={s.unfollow} onClick={() => {
                                        this.props.unfollow(u.id)
                                    }}>Unfollow</button>
                                    : <button onClick={() => {
                                        this.props.follow(u.id)
                                    }}>Follow</button>}
                            </div>
                        </div>
                        <div>
                            <div className={s.name}>{u.name}</div>
                            <div className={s.status}>{u.status}</div>
                        </div>
                        <div className={s.location}>
                            <div>{'u.location.city'},</div>
                            <div>{'u.location.country'}</div>
                        </div>
                    </div>)
                }
            </div>
            <div>
                <button>В начало</button>
                {pages.map(p => <button className={p === this.props.currentPage ? s.selectedPage : ""}
                                       onClick={()=>this.onPageChanged(p)}>{p} </button>)}
                <button>Next</button>
            </div>
        </div>
    }
}