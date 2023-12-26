import React from 'react';
import s from './Users.module.css';
import {UsersPropsType} from './UsersContainer';
import axios from 'axios';
import img from '../../assets/images/noavatar.jpg'

export const Users = (props: UsersPropsType) => {
    const getUsers =()=> {
        if (props.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users?count=4')
                .then(response => {
                    props.setUsers(response.data.items)
                })
    }

        /*props.setUsers( [
            {
                id: v1(),
                photoUrl: 'https://i.pinimg.com/474x/fe/bb/d4/febbd478ad268919fbf80b0b5e069165.jpg',
                fullName: 'Dmitriy K.',
                status: 'I\'m a boss',
                location: {country: 'Belarus', city: 'Minsk'},
                followed: true
            },
            {
                id: v1(),
                photoUrl: 'https://nymock.com/cdn/shop/files/7_40dd5edf-993c-4e5e-abc8-eff4c4b7c73b.jpg?v=1695932057',
                fullName: 'Oleg N.',
                status: 'I\'m Oleg',
                location: {country: 'Russia', city: 'Moscow'},
                followed: true
            },
            {
                id: v1(),
                photoUrl: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.6435-9/48368395_1087172471453961_7531645519165128704_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=dd63ad&_nc_ohc=8cNBLLLDddYAX9HcUtt&_nc_ht=scontent-waw1-1.xx&oh=00_AfCLPm9-uAd5UNKsz2kgQv90vpVYKfGdwvC8_i0NaXi-cA&oe=658BB135',
                fullName: 'Svetlana L.',
                status: 'I\'m Sveta',
                location: {country: 'Ukraine', city: 'Kiev'},
                followed: true
            },
            {
                id: v1(),
                photoUrl: 'https://i.pinimg.com/736x/84/91/3c/84913ce28e78c83ae28eae12fd1eb64a.jpg',
                fullName: 'Valeriy P.',
                status: 'I like pizza with cheese',
                location: {country: 'Belarus', city: 'Minsk'},
                followed: true
            }])*/
    }

    return (
        <div>
            <button onClick={getUsers}>Get Users</button>
            <div className={s.pageName}>Users</div>
            <div className={s.usersMap}>
                {
                    props.users.map(u => <div key={u.id} className={s.user}>
                        <div>
                            <img src={u.photos.small !== null ? u.photos.small: img} className={s.userPhoto}/>
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
            <div className={s.showMore}>
                <button>Show more</button>
            </div>
        </div>
    );
};