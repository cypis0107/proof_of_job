import { useRef } from "react";
import { useSelector } from 'react-redux';
import { selectUser } from "../../features/user/userSlice";
import { getCities } from "countries-cities-geo";
import { useForm, Controller } from "react-hook-form";
import CreatableSelect from 'react-select/creatable';
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase";
import Popup from 'reactjs-popup';



const CityProfile = (props) => {

    const user = useSelector(selectUser);
    const refPopup = useRef();
    const closeTooltip = () => refPopup.current.close();

    const { handleSubmit, control, formState: { errors } } = useForm({
        mode: "onBlur"
    });

    const { uid } = user;

    const onSubmit = data => {
        if (uid === '') return;
        const docRef = doc(db, 'users', uid)
        updateDoc(docRef, { city: data.city }).then(response => {
            console.log(response);
        }).catch(error => console.log(error.message))
        closeTooltip();
    }


    return (
        <Popup
            ref={refPopup}
            trigger={<div>{props.trigger}</div>}
            position={'right center'}
            closeOnDocumentClick
        >
            <form className="c-user-container">
                <label className="c-user-label">{props.label} City:</label>
                <div className="c-user-box">
                    <Controller
                        name="city"
                        control={control}
                        //defaultValue={null}
                        render={({ field: { onChange, value } }) => (
                            <CreatableSelect className="c-user-box-a"
                                options={
                                    props.cnt &&
                                    getCities(props.cnt).map(o => ({ value: o, label: o }))

                                }
                                onChange={(e) => {
                                    onChange(e.value);
                                }}
                                value={{ value: value, label: value }}
                            />
                        )}
                    />
                    <div className="c-user-button" onClick={handleSubmit(onSubmit)}>SAVE</div>
                </div>
            </form>
        </Popup>
    )
}

export default CityProfile;