import { Link } from 'react-router-dom';
import { AiFillCaretUp } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

const LoginMenu = () => {
    const { t } = useTranslation();
    return (
        <div className='drop-box' style={{ marginTop: '16px', alignItems: 'flex-start' }}>
            <AiFillCaretUp style={{ marginRight: '10px' }} color={'#607D8B'} size={'1.3rem'} />
            <div className="drop-menu" style={{ paddingBottom: '10px' }}>
                <div className="drop-menu-item" style={{ paddingRight: '2px', paddingLeft: '2px' }}>
                    <Link to='/login-user'>
                        {t('job.seeker')}
                    </Link>
                </div>
                <hr style={{ border: 'none', height: '1px', background: 'black' }} />
                <div className="drop-menu-item" style={{ paddingRight: '2px', paddingLeft: '2px' }}>
                    <Link to='/login-employer'>
                        {t('employer')}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LoginMenu