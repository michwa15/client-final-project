import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../helpers/auth';
import { AdminPage } from './AdminPermission/AdminPage';
import { NonPermission } from './non-permission/NonPermission';

export const Admin = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/sign-in');
        }
    }, [navigate])

    const isAdmin = isAuthenticated() && isAuthenticated().role === 'admin';

    return (
        isAdmin ? <AdminPage /> : <NonPermission />
    )
}
