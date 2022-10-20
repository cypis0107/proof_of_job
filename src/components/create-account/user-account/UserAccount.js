
import { useForm } from "react-hook-form";
import {
    createUser,
    createUserWithGooglePopup,
    createUserWithFacebookPopup,
    createUserWithTwitterPopup,
} from '../../../utils/firebase/firebase';
import { useDispatch } from "react-redux";
import { updateName, updateType } from "../../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook, BsTwitter } from 'react-icons/bs';

import "./user.account.style.css";

const CreateUserAccount = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, getValues, formState: { errors } } = useForm({
        mode: "onBlur"
    });


    const createFromGoogleUser = async () => {
        await createUserWithGooglePopup();
        dispatch(updateType('U'));
        navigate('/log_sc');
    }

    const createFromFacebookUser = async () => {
        await createUserWithFacebookPopup();
        dispatch(updateType('U'));
        navigate('/log_sc');
    }
    const createFromTwitterUser = async () => {
        await createUserWithTwitterPopup();
        dispatch(updateType('U'));
        navigate('/log_sc');
    }
    const createFromCeramicNetwork = () => {

    }

    const onSubmit = async (data) => {
        const { displayName, email, password } = data;
        await createUser(displayName, email, password);
        dispatch(updateName(displayName));
        dispatch(updateType('U'));
        navigate('/log_sc');
    }

    return (
        <div className="user-account-container ">
            <div className="cu-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Username:</label>
                    <input type="text" placeholder="" {...register("displayName", {
                        required: "this is required",
                        minLength: { value: 2, message: "Min length is 2 characters" },
                        maxLength: { value: 30, message: "Max length is 30 characters" }
                    })} />
                    {errors.displayName && <p>{errors.displayName.message}</p>}

                    <label>Email:</label>
                    <input placeholder="" type="email" {...register("email", {
                        required: "this is required",
                        pattern: {
                            value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: "Invalid email address"
                        }
                    })} />
                    {errors.email && <p>{errors.email.message}</p>}
                    <label>Password: </label>
                    <input type="password"
                        {...register("password", {
                            required: "Password is required!",
                            minLength: { value: 6, message: "Min length is 6 characters" }
                        })}
                    />
                    {errors.password && (<p>{errors.password.message}</p>)}

                    <label>Confirm Password: </label>
                    <input type="password"
                        {...register("passwordConfirmation", {
                            required: "Please confirm password!",
                            validate: {
                                matchesPreviousPassword: (value) => {
                                    const { password } = getValues();
                                    return password === value || "Passwords should match!";
                                }
                            }
                        })}
                    />
                    {errors.passwordConfirmation && (<p>{errors.passwordConfirmation.message} </p>)}

                    <button type="submit">CREATE ACCOUNT</button>
                </form>

            </div>
            <div className="cu-or">OR</div>
            <div className="cu-form">
                <div className="cu-more">
                    <hr />
                    <div className="cu-spacing">Create Account Using:</div>
                    <div className="buttons" onClick={createFromGoogleUser}>Google<FcGoogle size={30} /></div>
                    <div className="buttons" onClick={createFromFacebookUser}>Facebook<BsFacebook size={30} /></div>
                    <div className="buttons" onClick={createFromTwitterUser}>Twitter<BsTwitter size={30} /></div>
                    {/* <div className="buttons" onClick={createFromCeramicNetwork}>MetaMask<BsTwitter size={30} /></div> */}
                </div>
            </div>
        </div>
    )
}

export default CreateUserAccount;