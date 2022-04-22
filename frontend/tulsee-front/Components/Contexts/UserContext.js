import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { useCreateUser } from '../../api/user/createUserMutation';
import { useToast } from '@chakra-ui/react';
import { useGetUser } from '../../api/user/getUser';
import { useRouter } from 'next/router';

export const UserContext = createContext()

const UserContextProvider = ({children}) => {

    const [userID, setUserID] = useState();
    const [UserDetails, setUserDetails] = useState()

    const auth = getAuth()
    const {push,pathname} = useRouter()

    const {mutate: addUser} = useCreateUser()

    const toast = useToast();

    const {data: User} = useGetUser(userID, !!userID);

    useEffect(() => {
        if(User) setUserDetails(User);
    },[User])

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              setUserID(uid);
              // ...
            } else {
                console.log("user is logged out")
                if(pathname !== '/login') {
                    setUserDetails(null)
                    setUserID(null)
                    push('/login')
                }
              // User is signed out
              // ...
            }
          });
    },[])


    const createUser = details => {
        const {email, password} = details;
        createUserWithEmailAndPassword(auth, email, password)
        .then(credential => {
            console.log(credential.user)
            addUser({publicId: credential.user.uid,...details}, {
                onSuccess: d => {
                    console.log(d);
                    toast({title:"User registered successfully!", status:'success', duration: 2000});
                },
                onError: e => {
                    console.log(e);
                    toast({title:e.message?e.message:'User could not be registered', status:'error', duration: 2000});
                }
            })
        })
        .catch( error => {
            console.log(error.message)
        })
    }

    const loginUser = details => {
        const {email, password} = details
        console.log('logging in...')
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            toast({title:'User logged in successfully!', status:'success', duration: 2000});
            // ...
        })
        .catch((e) => {
            console.log(e);
            toast({title:e.message?e.message:'User could not login', status:'error', duration: 2000});
        });
    }

    const logout = () => {
        signOut(auth).then(
        () => {}
        ).catch((e) => console.log(e))
    }
 
    return (
        <UserContext.Provider value={{createUser,loginUser,UserDetails,logout}}>
            {children}
        </UserContext.Provider>
    );
};



export default UserContextProvider;