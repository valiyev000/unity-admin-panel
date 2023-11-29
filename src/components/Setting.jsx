import { createPortal } from 'react-dom';
import styles from '../styles/components/Setting.module.scss'
import { useContext, useEffect } from 'react';
import contextApi from '../StateManager';
import DesktopSetting from '../sub-components/DesktopSetting';
import DragSetting from '../sub-components/DragSetting';
import { useState } from 'react';
import { auth, db } from '../firebase-config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { updatePassword, updateProfile } from '@firebase/auth';

export default function Setting() {

    const { screenWidth, setIsSettingOpen, setUser, handleGetDataForAvatar } = useContext(contextApi)
    const [formData, setFormData] = useState(null)
    const [updateText, setUpdateText] = useState("update_profile")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState(auth.currentUser?.email)

    function handleGetData() {
        // Get the currently authenticated user
        const user = auth.currentUser;
        // console.log(user)

        // Use the user's UID to query Firestore
        if (user) {

            const userId = user.uid;

            // Example: Retrieve user data from Firestore
            const userDocRef = doc(db, 'users', userId);

            getDoc(userDocRef)
                .then((docSnapshot) => {
                    if (docSnapshot.exists()) {
                        // Document data is available in docSnapshot.data()
                        const userData = docSnapshot.data();
                        setFormData(userData)
                    }
                    else {
                        // Handle the case where the document does not exist

                        const emptyUserData = {
                            avatar: null,
                            email: user.email,
                            fullName: "",
                            location: "",
                            bio: "",
                            displayName: "",
                            role: ""
                        };

                        setDoc(userDocRef, emptyUserData)
                            .then(() => {
                                console.log('Empty document created successfully.');
                                getDoc(userDocRef).then(docSnapshot => {
                                    if (docSnapshot.exists()) setFormData(docSnapshot.data())
                                })
                            })
                            .catch((error) => {
                                console.error('Error creating empty document:', error);
                            });
                    }
                })
                .catch((error) => {
                    console.log('Error getting document:', error);
                });
        }
    }

    useEffect(() => {
        function overflowFunc() {
            document.body.style.overflow = "hidden"
        }
        overflowFunc()
        window.addEventListener("resize", overflowFunc)

        handleGetData()

        return () => {
            window.removeEventListener("resize", overflowFunc)
            document.body.style.overflow = "visible"
        }
    }, [])

    function handleInputFile(e) { //* elde olunan sekili base64 formatina cevirir ve ya (else vasitesile) silir

        if (e !== "delCommand") {

            const img = e.target.files[0];

            const reader = new FileReader();
            reader.readAsDataURL(img)

            reader.onload = (e) => {
                formData.avatar = e.target.result
                setFormData({ ...formData })
            };

        } else {
            setFormData({ ...formData, avatar: null })
        }

    }

    function handleLogOut() {
        setIsSettingOpen(false)
        auth.signOut()
        localStorage.removeItem("rememberMe")
    }

    async function handleUpdate() {
        setUpdateText("updating");

        // Get the currently authenticated user
        const user = auth.currentUser;

        // Use the user's UID to query Firestore
        if (user) {
            const userId = user.uid;

            // Example: Retrieve user data from Firestore
            const userDocRef = doc(db, 'users', userId);

            try {
                await setDoc(userDocRef, formData);
                console.log('Congratulations. It was SENT:)');
                setUpdateText("Updated");
                setIsSettingOpen(false);
            } catch (error) {
                console.error('Error creating empty document:', error);
                alert(error)
            }
        }

        try {
            if (password !== "") {
                await updatePassword(user, password);
                console.log('Password updated successfully');
            }
        } catch (error) {
            console.error(error.message);
        }

        try {
            await updateProfile(user, { displayName: formData.displayName });
            console.log('Display name updated successfully');
        } catch (error) {
            console.error(error.message);
        }

        // try { //todo buna basqa hell yolu tapdim
        //     await updateProfile(user, { photoURL: formData.avatar })
        //     console.log('Photo URL updated successfully');
        // } catch (error) {
        //     console.error(error.message);
        // }

        setUser({...auth.currentUser});
        handleGetDataForAvatar();
        
    }


    return createPortal(
        <>
            {screenWidth < 1200 ?
                <DragSetting styles={styles} formData={formData} setFormData={setFormData} handleInputFile={handleInputFile} handleLogOut={handleLogOut} handleUpdate={handleUpdate} updateText={updateText} email={email} setEmail={setEmail} password={password} setPassword={setPassword} />
                : <DesktopSetting styles={styles} formData={formData} setFormData={setFormData} handleInputFile={handleInputFile} handleLogOut={handleLogOut} handleUpdate={handleUpdate} updateText={updateText} email={email} setEmail={setEmail} password={password} setPassword={setPassword} />
            }
        </>,
        portal
    );
}
