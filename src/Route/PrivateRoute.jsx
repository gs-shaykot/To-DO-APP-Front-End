import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
const PrivateRoute = ({ children }) => {

    const { user, loader } = useContext(AuthContext);
    const location = useLocation()
    if (loader) {
        return (
            <div className='w-screen h-screen flex justify-center items-center'><span className="loading loading-ring loading-lg"></span></div>
        )
    }
    if (user) {
        return children
    }

    return (
        <Navigate state={location.pathname} to="/login"></Navigate>
    );

};

export default PrivateRoute;