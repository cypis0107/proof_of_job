import { useEffect, useState } from 'react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { closeLangMenu } from '../../features/modal/modalSlice';
import { AiFillCaretUp } from 'react-icons/ai';


const LangMenu = () => {
    const dispatch = useDispatch();
    const { i18n } = useTranslation();
    const [storedLang, setStoredLang] = useState(localStorage.getItem('i18nextLng'));


    useEffect(() => {
        if (localStorage.getItem('i18nextLng')?.length > 2) {
            i18next.changeLanguage('en');
            setStoredLang('en');
        }
    }, [])


    return (
        <div className='drop-box' style={{ marginTop: '42px' }}>
            <AiFillCaretUp style={{ marginRight: '10px' }} color={'#607D8B'} size={'1.3rem'} />
            <div className="drop-menu">
                <div className={`drop-menu-item ${storedLang === 'en' && 'current-lang'}`} onClick={() => {
                    i18n.changeLanguage('en');
                    dispatch(closeLangMenu());
                }}>English</div>
                <hr style={{ border: 'none', height: '1px', background: 'black' }} />
                <div className={`drop-menu-item ${storedLang === 'pl' && 'current-lang'}`} onClick={() => {
                    i18n.changeLanguage('pl');
                    dispatch(closeLangMenu());
                }}>Polish</div>
            </div>
        </div>
    )
}

export default LangMenu

