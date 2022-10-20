import { useForm } from "react-hook-form";
import {
    signInWithGooglePopup,
    signInWithFacebookPopup,
    signInWithTwitterPopup,
    signInAuthUserWithEmailAndPassword,
    checkUserType,
    signOutUser
} from "../../../utils/firebase/firebase";
import { useDispatch } from "react-redux";
import { logout, updateType } from "../../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook, BsTwitter } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { errorCodesFromAuth, errorCodes, useLocalStorage } from "../../helper/helper";
import './login.user.style.css';


const LogInUser = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [storedCurrentUser, setStoredCurrentUser] = useLocalStorage("curren-user", null);

    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur"
    });

    const checkUser = async () => {
        const userType = await checkUserType();
        if (userType) {
            dispatch(updateType(userType));
            navigate('/log_sc');
        } else {
            signOutUser();
            dispatch(logout());
            if (storedCurrentUser) setStoredCurrentUser(null);
            errorCodes(1);
        }
    }

    const onSubmit = async (data) => {
        const { email, password } = data;
        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            checkUser();
        }
        catch (error) {
            errorCodesFromAuth(error);
        }

    }

    const logInGoogleUser = async () => {
        try {
            await signInWithGooglePopup();
            checkUser();
        } catch (error) {
            errorCodesFromAuth(error);
        }

    }

    const logInFacebookUser = async () => {
        try {
            await signInWithFacebookPopup();
            checkUser();
        } catch (error) {
            errorCodesFromAuth(error);
        }
    }
    const logInTwitterUser = async () => {
        try {
            await signInWithTwitterPopup();
            checkUser();

        } catch (error) {
            errorCodesFromAuth(error);
        }
    }

    return (
        <div className="sign-in-container">
            <div className="cu-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Email:</label>
                    <input placeholder="" type="email" {...register("email", {
                        required: t('email.is.required'),
                        pattern: {
                            value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: t('invalid.email.address')
                        }
                    })} />
                    {errors.email && <p>{errors.email.message}</p>}

                    <label>{t('password')}: </label>
                    <input type="password"
                        {...register("password", {
                            required: t('password.is.required'),
                            minLength: { value: 6, message: t('min.length') }
                        })}
                    />
                    {errors.password && (<p>{errors.password.message}</p>)}
                    <button type="submit">{t('log.in')}</button>
                </form>
            </div>
            <div className="cu-or">{t('or')}</div>

            <div className="cu-form">
                <div className="cu-more">


                    <hr />
                    <div className="cu-spacing">{t('log.in.using')}</div>
                    <div className="buttons" onClick={logInGoogleUser}>Google<FcGoogle size={30} /></div>
                    <div className="buttons" onClick={logInFacebookUser}>Facebook<BsFacebook size={30} /></div>
                    <div className="buttons" onClick={logInTwitterUser}>Twitter<BsTwitter size={30} /></div>


                </div>
            </div>

        </div>
    );
}

export default LogInUser;

