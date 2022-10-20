import { useRef } from "react";
import { useForm } from "react-hook-form";
import Popup from "reactjs-popup";


const InfoProfile = (props) => {

    const refPopup = useRef();
    const closeTooltip = () => refPopup.current.close();

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur"
    });

    const onSubmit = async (data) => {
        const { displayName, email, password } = data;
        try {
            console.log(data)

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('cannot create user, email already in use');
            }
            else if (error.code === 'auth/weak-password') {
                alert('Password should be at least 6 characters');
            }
            else {
                console.log("User creation error", error);
            }
        }
    }

    return (
        <Popup
            ref={refPopup}
            trigger={<div>{props.trigger}</div>}
            position={'right center'}
            closeOnDocumentClick
        >
            <div>
                <form className="c-user-container" onSubmit={handleSubmit(onSubmit)}>


                    {props.update_for === 'displayName' &&
                        <>
                            <label className="c-user-label font-size-1-1">Username:</label>
                            <input type="text" placeholder="" {...register("displayName", {
                                minLength: { value: 2, message: "Min length is 2 characters" },
                                maxLength: { value: 30, message: "Max length is 30 characters" }
                            })} />
                            {errors.displayName && <p>{errors.displayName.message}</p>}
                        </>
                    }

                    {props.update_for === 'email' &&
                        <>
                            <label className="c-user-label font-size-1-1">{props.label} Email</label>
                            <div className="c-user-box">
                                <input className="c-user-input primary-text-color font-size-1"
                                    placeholder="" type="email" {...register("email", {

                                        pattern: {
                                            value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                            message: "Invalid email address"
                                        }
                                    })} />
                                {errors.email && <p>{errors.email.message}</p>}
                                <button className="c-user-button" type="submit">SAVE</button>
                            </div>
                        </>

                    }


                </form>


            </div>
        </Popup>
    )
}

export default InfoProfile;