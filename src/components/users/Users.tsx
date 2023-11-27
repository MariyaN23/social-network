import React from 'react';
import s from './Users.module.css'
import {userPropsType, UsersPropsType} from '../../redux/users-reducer';

type UsersComponentPropsType = {
    users: userPropsType[]
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    setUsers: (users: UsersPropsType) => void
}

export const Users = (props: UsersComponentPropsType) => {
    return (
        <div>
            <div className={s.pageName}>Users</div>
            <div className={s.usersMap}>
                {
                    props.users.map(u => <div key={u.id} className={s.user}>
                        <div>
                            <img src={u.photoUrl} className={s.userPhoto}/>
                            <div>
                                {u.followed
                                    ? <button className={s.unfollow} onClick={() => {
                                        props.unfollow(u.id)
                                    }}>Unfollow</button>
                                    : <button onClick={() => {
                                        props.follow(u.id)
                                    }}>Follow</button>}
                            </div>
                        </div>
                        <div>
                            <div className={s.name}>{u.fullName}</div>
                            <div className={s.status}>{u.status}</div>
                        </div>
                        <div className={s.location}>
                            <div>{u.location.city},</div>
                            <div>{u.location.country}</div>
                        </div>
                    </div>)
                }
            </div>
            <div className={s.showMore}>
                <button>Show more</button>
            </div>
        </div>
    );
};