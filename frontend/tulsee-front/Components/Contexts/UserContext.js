import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, EmailAuthProvider, getAuth, onAuthStateChanged, reauthenticateWithCredential, signInWithEmailAndPassword, signOut, updatePassword} from 'firebase/auth';
import { useCreateUser } from '../../api/user/createUserMutation';
import { useColorMode, useToast } from '@chakra-ui/react';
import { useGetUser } from '../../api/user/getUser';
import { useRouter } from 'next/router';
import { useLogoutUser } from '../../api/user/logoutUser';

export const UserContext = createContext()

const UserContextProvider = ({children}) => {
    console.log('firebaseId: ', process.env.FIREBASE_AUTH_DOMAIN)


    const [userID, setUserID] = useState();
    const [UserDetails, setUserDetails] = useState()

    const auth = getAuth()

    const user = auth.currentUser

    const {push,pathname} = useRouter()

    const {mutate: addUser} = useCreateUser()

    const {mutate: logoutUser, isLoading: loggingOut} = useLogoutUser()

    const toast = useToast();

    const {data: User} = useGetUser(userID, !!userID);

    const { colorMode, toggleColorMode } = useColorMode();

    useEffect(() => {
        if(User) setUserDetails(User);
    },[User])
 
    // useEffect(() => {
    //     console.log('current user: ', user.email)
    // },[user])

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              console.log(uid)
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
    },[user])


    const createUser = details => {
        const {email, password} = details;
        createUserWithEmailAndPassword(auth, email, password)
        .then(credential => {
            console.log(credential.user)
            addUser({
                publicId: credential.user.uid,
                ...details
            }, {
                onSuccess: data => {
                    console.log(data);
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
            toast({title:'Either the email or password is incorrect', status:'error', duration: 2000});
        });
    }

    const changePassword = (currentPassword, password) => {
        const credential = EmailAuthProvider.credential(
            user.email,
            currentPassword
        )
        reauthenticateWithCredential(user,credential).then(() => {
            console.log('user authenticated');
            updatePassword(user, password).then(() => {
                toast({title: 'Password changed successfully', status: "success", duration: 2000})
            }).catch(e => {
                toast({title: 'Something went wrong!', status: "error", duration: 2000})
            })
        }).catch(e => {
            toast({title: 'Wrong current password!', status: "warning", duration: 2000})
        })
        
    }

    const logout = () => {
        logoutUser(userID,{
            onSuccess: d => {
                signOut(auth).then(
                    () => {
                        if(colorMode === "dark") toggleColorMode();
                        toast({title: 'User logged out successfully', status: "success", duration: 2000})
                    }
                    ).catch((e) => {
                        toast({title:"Something went wrong!", status: 'error', duration: 2000})
                        console.log(e)
                    })
            },
            onError: e => {
                toast({title:"Something went wrong!", status: 'error', duration: 2000})
            }
        })

    }
 
    return (
        <UserContext.Provider value={{createUser,loginUser,UserDetails,userID,logout,setUserDetails,changePassword,loggingOut}}>
            {children}
        </UserContext.Provider>
    );
};



export default UserContextProvider;