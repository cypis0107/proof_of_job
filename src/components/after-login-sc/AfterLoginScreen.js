import { Link } from 'react-router-dom';
//import { SiGoogleassistant } from 'react-icons/si';
import AssistIcon from '../../assets/robot.png';
import './after.login.style.css'

const AfterLoginScreen = () => {
    return (
        <div className="al-container-background">
            <div className="al-container">

                <div className='al-boxes'>

                    <div className='al-box'>
                        <img src={AssistIcon} width={130} height={130} alt='' />
                        <div className='al-circle'></div>
                        <div className='al-circle' style={{ width: '25px', height: '25px' }}></div>
                        <div className='al-circle' style={{ width: '30px', height: '30px' }}></div>
                        <div className='al-circle' style={{ width: '35px', height: '35px' }}></div>
                        <div className='al-title'>
                            complete your profile to take full advantage of our portal
                        </div>
                    </div>
                    {/* <div className='al-box'><SiGoogleassistant size={150} color={'#13314A'} />
                    </div> */}





                </div>

                <div className='al-directions'>
                    <Link className='al-acc-a' to='/user_profile'>
                        PROFILE
                    </Link>
                    <Link className='al-acc-a' to='/'>
                        B
                    </Link>
                    <Link className='al-acc-a' to='/'>
                        C
                    </Link>
                    <Link className='al-acc-a' to='/'>
                        D
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default AfterLoginScreen