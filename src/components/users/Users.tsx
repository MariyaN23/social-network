import React from 'react';
import s from './Users.module.css';
import img from '../../assets/images/noavatar.jpg'
import {FilterType, UserType} from '../../redux/users-reducer';
import {Preloader} from '../common/Preloader';
import {NavLink} from 'react-router-dom';
import {UsersSearchForm} from './UsersSearchForm';
import noResultsImg from '../../assets/images/noResults.jpg'

type UsersPropsType = {
    currentPage: number
    onPageChanged: (currentPage: number) => void
    users: UserType[]
    onFollowClick: (userId: string) => void
    onUnfollowClick: (userId: string) => void
    isFetching: boolean
    followingInProgress: string[]
    onFilterChanged: (filter: FilterType)=> void
    totalUsersCount: number
}

export const Users = (props: UsersPropsType) => {
    const goToTheFirstBtn = () => {
        props.onPageChanged(1)
    }
    const goToTheNextBtn = (currentPage: number) => {
        props.onPageChanged(currentPage + 1)
    }
    const pagesCount = Math.ceil(props.totalUsersCount / 4)
    const pages = []
    const currentPage = props.currentPage
    for (let i = currentPage < 4 ? 1 : currentPage - 2; i < (currentPage < 4 ? (props.totalUsersCount<20? props.totalUsersCount/4 + 1 : 6) : currentPage + 3<= pagesCount ? currentPage + 3 : pagesCount + 1); i++) {
        pages.push(i)
    }
    return <div>
        <div className={s.pageName}>Users</div>
        <div className={s.UsersSearchForm}>
            <UsersSearchForm onFilterChanged={props.onFilterChanged}/>
        </div>
        {props.isFetching && <Preloader/>}
        {!props.isFetching && <div className={s.usersMap}>
            {props.users.length ?
                (props.users.map(u => <div key={u.id} className={s.user}>
                    <div>
                        <NavLink to={'/profile/'+u.id}>
                            <img src={u.photos.small !== null ? u.photos.small : img} className={s.userPhoto} alt={"avatar"}/>
                        </NavLink>
                        <div>
                            {u.followed
                                ? <button disabled={props.followingInProgress.some(id => id === u.id)} className={s.unfollow} onClick={() => {
                                    props.onUnfollowClick(u.id)
                                }}>Unfollow</button>
                                : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                    props.onFollowClick(u.id)
                                }}>Follow</button>}
                        </div>
                    </div>
                    <div>
                        <div className={s.name}>{u.name}</div>
                        <div className={s.status}>{u.status}</div>
                    </div>
                </div>))
                : <div className={s.noResults}>
                    <div>
                        <img src={noResultsImg} alt={'No results found'}/>
                    </div>
                    <div>No Results Found</div>
                </div>
            }
        </div>}
        <div className={s.paginationWrap}>
            {(currentPage >= 4) && < button onClick={goToTheFirstBtn} className={s.goToBtn}>To the first</button>}
            {pages.map(p => <button className={p === props.currentPage ? s.selectedPage : s.paginationBtn}
                                    onClick={() => props.onPageChanged(p)}>{p} </button>)}
            {pages.length > 1 && pagesCount > 4 && currentPage<pagesCount && <button onClick={() => goToTheNextBtn(props.currentPage)} className={s.goToBtn}>Next</button>}
        </div>
    </div>
}