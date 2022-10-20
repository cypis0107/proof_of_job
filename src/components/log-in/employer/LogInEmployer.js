import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { errorCodesFromAuth, useLocalStorage, errorCodes } from "../../helper/helper";
import { useNavigate } from "react-router-dom";
import { signInAuthUserWithEmailAndPassword, checkEmployerType, signOutUser } from "../../../utils/firebase/firebase";
import { useDispatch } from "react-redux";
import { updateType, logout } from "../../../features/user/userSlice";


const LogInEmployer = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [storedCurrentUser, setStoredCurrentUser] = useLocalStorage("curren-user", null);

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur"
    });

    const checkEmployer = async () => {
        const employerType = await checkEmployerType();
        if (employerType) {
            dispatch(updateType(employerType));
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
            checkEmployer();
        }
        catch (error) {
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
        </div>
    )
}

export default LogInEmployer