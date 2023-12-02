import { createPortal } from 'react-dom';
import styles from '../styles/components/Setting.module.scss'
import { useContext, useEffect, useState } from 'react';
import contextApi from '../StateManager';
import DesktopSetting from '../sub-components/DesktopSetting';
import DragSetting from '../sub-components/DragSetting';
import { auth, db, storage } from '../firebase-config';
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
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

        if (e !== "delCommand" && e.target.files[0]) {

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

    // async function handleUpdate() {
    //     setUpdateText("updating");

    //     let temporaryImgLinkHolder;

    //     // Get the currently authenticated user
    //     const user = auth.currentUser;

    //     // Use the user's UID to query Firestore
    //     if (user) {

    //         if (formData.avatar) { //todo Bu hissede formdata.avatar'daki base64 file'i firebase storage'e set olunur ve link elde olunur
    //             const storageRef = ref(storage, `avatars/user_avatar${Math.random()}`);

    //             uploadString(storageRef, formData.avatar, 'data_url')
    //                 .then(() => {
    //                     // Get the download URL of the uploaded image
    //                     return getDownloadURL(storageRef);
    //                 })
    //                 .then((downloadURL) => {
    //                     setFormData({...formData, avatar: downloadURL})
    //                     temporaryImgLinkHolder = downloadURL
    //                 })
    //                 .catch((error) => {
    //                     console.error('Error uploading file:', error);
    //                 });
    //         }


    //         // Example: Retrieve user data from Firestore
    //         const userDocRef = doc(db, 'users', user.uid);

    //         try { //todo Istifadecinin umumi datasini firestore documentine set etmek ucun olan hisse;
    //             console.log(temporaryImgLinkHolder)
    //             await setDoc(userDocRef, {...formData, avatar: temporaryImgLinkHolder});
    //             console.log('Congratulations. It was SENT:)');
    //             setUpdateText("Updated");
    //             setIsSettingOpen(false);
    //         } catch (error) {
    //             console.error('Error sending new data to document:', error);
    //             alert(error)
    //         }
    //     }

    //     try { //todo Authorization da olan hazirki profile update edilir;
    //         console.log(formData.avatar)
    //         await updateProfile(user, { displayName: formData.displayName, photoURL: temporaryImgLinkHolder });
    //         console.log('Display name and new avatar updated successfully');
    //     } catch (error) {
    //         console.error(error.message);
    //     }

    //     try { //todo Istidadeci yeni kod yazibsa hemin kodu update etmek ucun olan hisse;
    //         if (password !== "") {
    //             await updatePassword(user, password);
    //             console.log('Password updated successfully');
    //         }
    //     } catch (error) {
    //         console.error(error.message);
    //     }

    //     setUser({...auth.currentUser});
    //     handleGetDataForAvatar();

    // }
   
    async function handleUpdate() {
        setUpdateText("updating");
    
        let temporaryImgLinkHolder = null
    
        // Get the currently authenticated user
        const user = auth.currentUser;
    
        // Use the user's UID to query Firestore
        if (user) {
            // Wrap the asynchronous code in a Promise
            await new Promise(async (resolve, reject) => {
                if (formData.avatar) {

                    if (formData.avatar.startsWith("http")) { //todo Eger sekil evvelceden linkdirse(ve ya linke cevrilib) bele olan halda if/else vasitesile firebase storage'e yeniden vurulmur
                        resolve()
                    } else {

                        const storageRef = ref(storage, `avatars/user_avatar${Math.random()}`);
        
                        try {
                            await uploadString(storageRef, formData.avatar, 'data_url');
                            const downloadURL = await getDownloadURL(storageRef);
                            setFormData({ ...formData, avatar: downloadURL });
                            temporaryImgLinkHolder = downloadURL;
                            resolve(); // Resolve the Promise to signal completion
                        } catch (error) {
                            console.error('Error uploading file:', error);
                            reject(error); // Reject the Promise if an error occurs
                        }
                        
                    }
                    
                } else {
                    resolve(); // Resolve the Promise if no avatar to upload
                }
            });
    
            const userDocRef = doc(db, 'users', user.uid);
    
            try {
                console.log(temporaryImgLinkHolder);
                await setDoc(userDocRef, { ...formData, avatar: temporaryImgLinkHolder });
                console.log('Congratulations. It was SENT:)');
                setUpdateText("Updated");
                setIsSettingOpen(false);
            } catch (error) {
                console.error('Error sending new data to document:', error);
                alert(error);
            }
        }
    
        try {
            console.log(formData.avatar);
            await updateProfile(user, { displayName: formData.displayName, photoURL: temporaryImgLinkHolder });
            console.log('Display name and new avatar updated successfully');
        } catch (error) {
            console.error(error.message);
        }
    
        try {
            if (password !== "") {
                await updatePassword(user, password);
                console.log('Password updated successfully');
            }
        } catch (error) {
            console.error(error.message);
        }
    
        setUser({ ...auth.currentUser });
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
