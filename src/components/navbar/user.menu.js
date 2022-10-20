import { Link } from 'react-router-dom';
import { logout, selectUser } from '../../features/user/userSlice';
import { signOutUser } from '../../utils/firebase/firebase';
import { useLocalStorage } from '../helper/helper';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillCaretUp } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";



const UserMenuDrop = () => {

    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [storedCurrentUser, setStoredCurrentUser] = useLocalStorage("curren-user", user);
    const navigate = useNavigate();

    const logOutUser = () => {
        dispatch(logout());
        signOutUser();
        if (storedCurrentUser) setStoredCurrentUser(null);
        navigate('/');
    }

    return (
        <div className='drop-box' style={{ marginTop: '35px' }}>
            <AiFillCaretUp style={{ marginRight: '10px' }} color={'#607D8B'} size={'1.3rem'} />
            <div className="drop-menu" style={{ borderRadius: '10px', paddingBottom: '10px' }}>
                <div className="drop-menu-item" style={{ paddingTop: '10px', paddingBottom: '10px' }}>

                    {user.type === 'U' ?
                        <Link to='/user_profile' >Manage your Profile</Link>
                        :
                        <Link to='/employer_profile' >Manage your Profile</Link>
                    }


                </div>
                <hr style={{ border: 'none', height: '1px', background: 'black' }} />
                <div className="drop-menu-item" style={{ paddingTop: '2px', paddingBottom: '7px' }}>

                    <Link to='/user_profile' >Settings</Link>

                </div>
                <hr style={{ border: 'none', height: '1px', background: 'black' }} />

                <div className="drop-menu-item" onClick={() => logOutUser()}>
                    <Link to='/'>Sign out</Link>
                </div>
            </div>
        </div>
    )
}

export default UserMenuDrop