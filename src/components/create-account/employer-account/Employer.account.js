import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import CreatableSelect from 'react-select/creatable';
import { getCountryNames } from "countries-cities-geo";
import { industries } from "@teclone/industries";
import { continentsList } from "../../../data/continents.list";
import { findContinent } from "../../helper/helper";
import { createEmployer } from "../../../utils/firebase/firebase";
import { useDispatch } from "react-redux";
import { updateType, updateName } from "../../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

import './employer.account.style.css';

const countriesGetList = getCountryNames().map(o => ({ value: o, label: o }));
const industriesList = industries.map(o => ({ value: o.name, label: o.name }));



const CreateEmployerAccount = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, control, getValues, setValue, formState: { errors }, watch } = useForm({
        mode: "onBlur" // "onChange"
    });


    const onSubmit = async (data) => {
        if (data.region === 'Domestic') {
            data.continent = findContinent(data.country);
        }
        await createEmployer(data);
        dispatch(updateName(data.displayName));
        dispatch(updateType('E'));
        navigate('/log_sc');

    }

    const regionSelect = watch("region");
    switch (regionSelect) {
        case "Global":
            setValue("continent", "");
            setValue("country", "");
            break;
        case "Continent":
            setValue("country", "");
            break;
        default:
            break;
    }


    const selectedChoice = () => {

        switch (regionSelect) {
            case "Global":
                break;
            case "Continent":
                return (
                    <div className="select-o-b">
                        <label>Continent:</label>
                        <Controller
                            name="continent"
                            control={control}
                            defaultValue={null}
                            render={({ field: { onChange, value } }) => (
                                <Select className="select-o-c"
                                    options={
                                        continentsList
                                    }
                                    onChange={(e) => {
                                        onChange(e.value);
                                    }}
                                    value={{ value: value, label: value }}
                                />
                            )}
                        />
                    </div>
                );
            // break;
            case "Domestic":
                return (
                    <div className="select-o-b">
                        <label>Country:</label>
                        <Controller
                            name="country"
                            control={control}
                            //defaultValue={null}
                            render={({ field: { onChange, value } }) => (
                                <Select className="select-o-c"
                                    options={
                                        countriesGetList
                                    }
                                    onChange={(e) => {
                                        onChange(e.value);
                                    }}
                                    value={{ value: value, label: value }}
                                />
                            )}
                        />
                    </div>
                );
            // break;
            case "Other":
                return <label>Other</label>
            // break;
            default: break;
        };

    }

    return (
        <div className="company-account-container">
            <div className="ca-form">

                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Company Name:</label>
                    <input type="text" placeholder="" {...register("displayName", {
                        required: "this is required",
                        minLength: { value: 2, message: "Min length is 2 characters" },
                        maxLength: { value: 30, message: "Max length is 30 characters" }
                    })} />
                    {errors.dispalyName && <p>{errors.displayName.message}</p>}

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

                    <label>Industry:</label>
                    <Controller
                        name="industry"
                        control={control}
                        render={({ field }) => {
                            return (

                                <CreatableSelect className="select-option"
                                    options={
                                        industriesList
                                    }
                                    onChange={({ value }) => {
                                        field.onChange(value);
                                    }}

                                    value={{ value: field.value, label: field.value }}
                                />
                            );
                        }}
                    />
                    <div className="select-o-a">
                        <div className="select-o-b">
                            <label>Region of operation:</label>
                            <Controller
                                name="region"
                                control={control}
                                defaultValue={null}
                                render={({ field: { onChange, value } }) => (
                                    <Select className="select-o-c"
                                        options={[
                                            { value: "Global", label: "Global" },
                                            { value: "Continent", label: "Continent" },
                                            { value: "Domestic", label: "Domestic" },

                                        ]}
                                        onChange={(e) => {
                                            onChange(e.value);
                                        }}
                                        value={{ value: value, label: value }}
                                    />
                                )}
                            />
                        </div>

                        {selectedChoice()}

                    </div>


                    <button type="submit">CREATE ACCOUNT</button>

                </form>


            </div>

        </div>
    )
}

export default CreateEmployerAccount
