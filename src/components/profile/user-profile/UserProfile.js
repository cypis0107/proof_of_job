import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from "../../../features/user/userSlice";
import { useLocalStorage } from '../../helper/helper';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, signOutUser } from '../../../utils/firebase/firebase';
import CountryProfile from '../country.profile';
import CityProfile from '../city.profile';
import InfoProfile from '../info.profile';
import { FcAddImage } from 'react-icons/fc';
import { BiEdit } from 'react-icons/bi';
import { CgAdd } from 'react-icons/cg';

import './user.profile.style.css';



const UserProfile = () => {
    const user = useSelector(selectUser);
    const [fullUser, setFullUser] = useState('');
    const [storedCurrentUser, setStoredCurrentUser] = useLocalStorage("curren-user", user);

    if (!storedCurrentUser) {
        setStoredCurrentUser(user);
    }
    useEffect(() => {

        const { uid } = storedCurrentUser;
        const usersRef = doc(db, 'users', uid);
        onSnapshot(usersRef, (snapshot) => {
            setFullUser(snapshot.data());
        })

        // eslint-disable-next-line
    }, [])




    const logOutUser = () => {
        signOutUser();
        setStoredCurrentUser(null);
    }

    const { displayName, city, country, email } = fullUser;

    return (
        <div className='user-profile-container'>
            <div className='up-box'>
                <div className='up-left upper-text'>
                    <div className='img-box'><FcAddImage size={100} /></div>
                    <div className='up-n-box'>{displayName}<BiEdit size={30} /></div>

                    <div className='up-n-box up-n-box-a'>
                        {country ? <> {country} <CountryProfile label='UPDATE' trigger={<BiEdit size={25} />} /> </>
                            : <> ADD COUNTRY <CountryProfile label='ADD' trigger={<CgAdd size={25} />} /></>}
                    </div>

                    <div className='up-n-box up-n-box-b'>
                        {city ?
                            <>{city}
                                <CityProfile label='UPDATE' cnt={country} trigger={<BiEdit size={25} />} />
                            </>
                            :
                            <> ADD CITY
                                <CityProfile label='ADD' cnt={country} trigger={<CgAdd size={25} />} /> </>}
                    </div>
                </div>

                <div className='up-left'>
                    <div className='up-n-box'>
                        {email ?
                            <>
                                {email}
                                <InfoProfile update_for='email' label='UPDATE' trigger={<BiEdit size={25} />} />
                            </>
                            :
                            <>
                                ADD EMAIL
                                <InfoProfile update_for='email' label='ADD' trigger={<CgAdd size={25} />} />
                            </>}
                    </div>
                </div>

                <div className='up-left'>
                    aaaaa
                </div>

            </div>

            <div className='up-box up-box-center'>
                B
            </div>
            <div className='up-box'>
                <Link to='/' onClick={logOutUser}>LOGOUT</Link>
            </div>

        </div>
    )
}

export default UserProfile