
import { Outlet, Link } from 'react-router-dom';
import { Fragment, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import { openLangMenu, closeLangMenu, openUserMenu, closeUserMenu, openCreateMenu, closeCreateMenu, openLoginMenu, closeLoginMenu } from '../../features/modal/modalSlice';
import { useTranslation } from 'react-i18next';
import { BsGlobe } from 'react-icons/bs';
import { getFirstLettersUpper } from '../helper/helper';
import LangMenu from './lang.menu';
import UserMenuDrop from './user.menu';
import CreateMenu from './create.menu';
import './navbar.style.css';
import LoginMenu from './login.menu';


const Navbar = () => {

    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const { isOpenLangMenu, isOpenUserMenu, isOpenCreateMenu, isOpenLoginMenu } = useSelector((store) => store.modal);
    const { t } = useTranslation();
    const langRef = useRef();
    const userRef = useRef();
    const creatRef = useRef();
    const loginRef = useRef();

    useEffect(() => {
        const closeDropMenu = e => {
            if (user) {
                if (!userRef.current.contains(e.target)) {
                    dispatch(closeUserMenu());
                }
            }
            if (!langRef.current.contains(e.target)) {
                dispatch(closeLangMenu());
            }
            if (!creatRef.current.contains(e.target)) {
                dispatch(closeCreateMenu());
            }
            if (!loginRef.current.contains(e.target)) {
                dispatch(closeLoginMenu());
            }


        }
        document.body.addEventListener('click', closeDropMenu);

        return () => {
            document.body.removeEventListener('click', closeDropMenu);
        }
    }, [dispatch, user])


    return (
        <Fragment>
            <div className='nav-container'>
                <Link className='logo' to='/'>Proof-<span className='logo-red'>Of</span>-Job</Link>
                <div className='h-btn'>
                    <ul className='nav-ul'>
                        <div className='nav-li-box'><Link to='/home'><li className='nav-li'>{t('find.job')}</li></Link></div>
                        <div className='nav-li-box'><Link to='/home'><li className='nav-li'>{t('employers')}</li></Link></div>
                        <div className='nav-li-box'><Link to='/contact'><li className='nav-li'>{t('contact')}</li></Link></div>
                    </ul>
                    <div ref={langRef} className='nav-lang'>
                        <BsGlobe size={'2rem'} color={'#607D8B'} onClick={() => {
                            isOpenLangMenu ? dispatch(closeLangMenu()) : dispatch(openLangMenu());
                        }} />
                        {isOpenLangMenu && <LangMenu />}
                    </div>

                    {user ?
                        (
                            <div ref={userRef} className='user-btn' onClick={() => {
                                isOpenUserMenu ? dispatch(closeUserMenu()) : dispatch(openUserMenu());
                            }}>
                                {getFirstLettersUpper(user.displayName)}
                                {isOpenUserMenu && <UserMenuDrop />}
                            </div>
                        ) :
                        (<div className='sign-box'>

                            <div ref={creatRef} className='sign-up' onClick={() => {
                                isOpenCreateMenu ? dispatch(closeCreateMenu()) : dispatch(openCreateMenu());
                            }}>
                                {t('create.account')}
                                {isOpenCreateMenu && <CreateMenu />}
                            </div>

                            <div ref={loginRef} className='sign-in' onClick={() => {
                                isOpenLoginMenu ? dispatch(closeLoginMenu()) : dispatch(openLoginMenu());
                            }}>{t('log.in')}
                                {isOpenLoginMenu && <LoginMenu />}
                            </div>

                        </div>
                        )
                    }

                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navbar


    //const { displayName, uid, email } = useSelector((store) => store.user)
/* <select
                 className='nav-lang'
                 value={localStorage.getItem('i18nextLng')}
                 onChange={handleLangChange}>
                 <option value='en'>English</option>
                 <option value='pl'>Polish</option>
             </select> */
    // useEffect(() => {
    //     if (localStorage.getItem('i18nextLng')?.length > 2) {
    //         i18next.changeLanguage('en');
    //     }
    // }, [])

    // const handleLangChange = (e) => {
    //     i18n.changeLanguage(e.target.value);
    // }

    // const closeDrop = e => {
    //     // dispatch(closeModal());
    // }

    // document.body.addEventListener('click', closeDrop);

    // return () => document.body.removeEventListener('click', closeDrop);
// rafce 