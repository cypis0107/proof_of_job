
import { Link } from 'react-router-dom';

import { SiGoogleassistant } from 'react-icons/si';
import './create.accounts.style.css';

const CreateAccounts = () => {


    return (
        <div className='account-container-background'>
            <div className="create-account-container">
                <div className='ca-boxes'>
                    <div className='ca-title'>
                        Tell us who you are
                    </div>
                    < SiGoogleassistant size={150} color={'#607D8B'} />
                </div>

                <div className='ca-accounts'>
                    <Link className='ca-acc-a' to='/create_account/user'>
                        I'm a Job Seeker
                    </Link>
                    <Link className='ca-acc-a' to='/create_account/employer'>
                        I'm an Employer
                    </Link>

                </div>

            </div>
        </div>
    )
}

export default CreateAccounts;

