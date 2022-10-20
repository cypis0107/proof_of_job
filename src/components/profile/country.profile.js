import { useRef } from "react";
import { useSelector } from 'react-redux';
import { selectUser } from "../../features/user/userSlice";
import { getCountryNames } from "countries-cities-geo";
import { useForm, Controller } from "react-hook-form";
import CreatableSelect from 'react-select/creatable';
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase";
import Popup from 'reactjs-popup';
import { findContinent } from "../helper/helper";

const CountryProfile = (props) => {

    const user = useSelector(selectUser);
    const refPopup = useRef();
    const closeTooltip = () => refPopup.current.close();

    const { handleSubmit, control } = useForm({ mode: "onBlur" });

    const countriesGetList = getCountryNames().map(o => ({ value: o, label: o }));

    const { uid } = user;

    const onSubmit = data => {
        if (uid === '') return;


        const docRef = doc(db, 'users', uid)
        updateDoc(docRef, { country: data.country, continent: findContinent(data.country) }).then(response => {
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
                <label className="c-user-label">{props.label} Country:</label>
                <div className="c-user-box">
                    <Controller
                        name="country"
                        control={control}
                        //defaultValue={null}
                        render={({ field: { onChange, value } }) => (
                            <CreatableSelect className="c-user-box-a primary-text-color"
                                options={countriesGetList}
                                onChange={(e) => { onChange(e.value); }}
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

export default CountryProfile;