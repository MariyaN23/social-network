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
    goToTheFirstBtn =()=> {
        this.onPageChanged(1)
    }
    goToTheNextBtn =(currentPage: number)=> {
        this.onPageChanged(currentPage + 1)
    }
    render() {
        const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
        const pages = []
        const currentPage = this.props.currentPage
        if (currentPage < 4) {
            for (let i = 1; i < 6; i++) {
                pages.push(i)
            }
        }
        if (currentPage >= 4) {
            for (let i = currentPage -2; i < currentPage + 3; i++) {
                pages.push(i)
            }
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
            <div className={s.paginationWrap}>
                {(currentPage >= 4) && < button onClick={this.goToTheFirstBtn} className={s.goToBtn}>To the first</button>}
                {pages.map(p => <button className={p === this.props.currentPage ? s.selectedPage : s.paginationBtn}
                                       onClick={()=>this.onPageChanged(p)}>{p} </button>)}
                <button onClick={()=>this.goToTheNextBtn(this.props.currentPage)} className={s.goToBtn}>Next</button>
            </div>
        </div>
    }
}