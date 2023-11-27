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
            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photoUrl} className={s.userPhoto}/>
                            <div>
                                {u.followed
                                    ? <button onClick={() => {
                                        props.unfollow(u.id)
                                    }}>Unfollow</button>
                                    : <button onClick={() => {
                                        props.follow(u.id)
                                    }}>Follow</button>}
                            </div>
                        </div>
                    </span>
                    <span>
                        <div>{u.fullName}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{u.location.country}</div>
                         <div>{u.location.city}</div>
                    </span>
                </div>)
            }
        </div>
    );
};