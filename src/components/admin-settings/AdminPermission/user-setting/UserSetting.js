import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './UserSetting.css';

export const UserSetting = ({ user }) => {
    const [isUserHistoryVisible, setisUserHistoryVisible] = useState(false);

    const onUserHistory = () => {
        setisUserHistoryVisible(isUserHistoryVisible => !isUserHistoryVisible);
    }

    return (
        <div className='user-setting'>
            <div className='user-container'>
                <div className='user-fullname'>{user.fullname}</div>
                <div className='user-email'>{user.email}</div>
                <div className='user-history-title' onClick={onUserHistory}>
                    {`${isUserHistoryVisible ? 'hide' : 'show'} user history`}
                    <span>{isUserHistoryVisible ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</span>
                </div>
            </div>
            {isUserHistoryVisible &&
            <div className='user-history-wrapper'>
                user login history:
                <ul>
                    {user.logInHistory.map(logIn => <li key={logIn}>{logIn}</li>)}    
                </ul>    
                user purchases: 
                <ul>
                    {user.purchases.map((purchase, idx) => <li key={idx}>{`Price: ${purchase.totalPrice}, Number of Items: ${purchase.itemsCount}, Date: ${purchase.date}`}</li>)}
                </ul>
            </div>}
        </div>
    )
}
