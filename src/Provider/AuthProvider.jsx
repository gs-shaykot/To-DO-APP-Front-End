// Failed to resolve import "firebase/auth" from "src/Provider/AuthProvider.jsx". Does the file exist? 
import React, { createContext, useEffect, useState } from 'react';
import auth from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import useAxiosPublic from '../Hooks/useAxiosPublic';

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loader, setLoader] = useState(true);
    const axiosPub = useAxiosPublic()
    const createUser = (email, password) => {
        setLoader(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logInUser = (email, password) => {
        setLoader(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const LogOut = () => {
        setLoader(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                setLoader(false) 
                const user = { Name: currentUser.displayName, email: currentUser.email }
                axiosPub.post('/jwt', user, { withCredentials: true })
                    .then(data => {
                        console.log(data)
                    })
            } else {
                console.log("No user signed in");
                axiosPub.post('/jwtlogout  ', {}, { withCredentials: true })
                    .then(data => {
                        console.log(data.status)
                    })
                setLoader(false)
            }
        });

        return () => { unsubscribe() };
    }, []);




    const authInfo = {
        user,
        loader,
        setUser,
        setLoader,
        createUser,
        logInUser,
        LogOut,
    }

    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;