import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, EmailAuthProvider, getAuth, GoogleAuthProvider, onAuthStateChanged, reauthenticateWithCredential, signInWithEmailAndPassword, signInWithPopup, signOut, updatePassword} from 'firebase/auth';
import { useCreateUser } from '../../api/user/createUserMutation';
import { useColorMode, useToast } from '@chakra-ui/react';
import { useGetUser } from '../../api/user/getUser';
import { useRouter } from 'next/router';
import { useLogoutUser } from '../../api/user/logoutUser';

export const UserContext = createContext()

const UserContextProvider = ({children}) => {
    console.log('firebaseId: ', process.env.FIREBASE_AUTH_DOMAIN)


    const [userID, setUserID] = useState(null);
    const [UserDetails, setUserDetails] = useState()
    const [google, setGoogle] = useState(false);
    // const [login]

    const auth = getAuth()

    const user = auth.currentUser

    const {push,pathname} = useRouter()

    const {mutate: addUser, isLoading: isRegistering} = useCreateUser()

    const {mutate: logoutUser, isLoading: loggingOut} = useLogoutUser()

    const toast = useToast();

    const {data: User, refetch: refetchUser,isError, isLoading: isLoggingIn} = useGetUser(userID, !!userID);

    const { colorMode, toggleColorMode } = useColorMode();

    const googleProvider = new GoogleAuthProvider();

    console.log(pathname)

    useEffect(() => {
        if(User) {
            setUserDetails(User);
        } 
    },[User])

    useEffect(() => {
        if(google && isError) {
            let request = {
                publicId: user.uid,
                firstName: user.displayName.split(' ')[0],
                lastName: user.displayName.split(' ')[1],
                email: user.email,
                profilePhotoUrl: user.photoURL,
                password:`${user.displayName.split(' ')[0]}1234`,
                type:'google'
            }
            addUser(request,{
                onSuccess: d =>  {
                    setUserDetails(d)
                    toast({title:'User logged in successfully!', status:'success', duration: 2000});
                },
                onError: e => {
                    toast({title:'Either the email or password is incorrect', status:'error', duration: 2000});
                }
            })
        }
    },[google,isError])
 

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
                setUserID(uid);
                if(user.providerData[0].providerId !== 'password') {
                setGoogle(true)
              }
              // ...
            } else {
                if(pathname !== '/login' && pathname !== '/team') {
                    setUserDetails(null)
                    setUserID(null)
                    setGoogle(false)
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
                type:'password',
                ...details
            }, {
                onSuccess: data => {
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
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            toast({title:'User logged in successfully!', status:'success', duration: 2000});
            // ...
        })
        .catch((e) => {
            console.log(e);
            toast({title:'Either the email or password is incorrect', status:'error', duration: 2000});
        });
    }

    const googleSignIn = () => {
        signInWithPopup(auth,googleProvider).then(result => {
            setGoogle(true)
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
        }).catch(e => {
            toast({title: e.message, status: 'error', duration: 2000})
        })
    }

    const changePassword = (currentPassword, password) => {
        const credential = EmailAuthProvider.credential(
            user.email,
            currentPassword
        )
        reauthenticateWithCredential(user,credential).then(() => {
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
                console.log('logout successfull')
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
        <UserContext.Provider 
            value={{
                createUser,
                loginUser,
                UserDetails,
                userID,
                logout,
                setUserDetails,
                changePassword,
                loggingOut,
                googleSignIn, 
                isLoggingIn, 
                isRegistering,
                refetchUser
            }}
        >
            {children}
        </UserContext.Provider>
    );
};



export default UserContextProvider;