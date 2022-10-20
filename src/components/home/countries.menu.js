import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { displayEarthOff, countryTitle, countryLatitude, countryLongitude } from '../../features/earth/earthSlice';
import { CountriesCoordinates } from "../../data/countries.coordinates";


const CountriesMenu = (props) => {
    const { continentId } = useSelector((store) => store.earth);
    const dispatch = useDispatch();

    if (continentId === props.id) {
        return (
            <ul>
                {
                    CountriesCoordinates.map((country) =>
                        country.continent === continentId &&
                        <li key={country.title} onClick={() => {

                            dispatch(displayEarthOff());
                            dispatch(countryTitle(country.title));
                            dispatch(countryLatitude(country.lat));
                            dispatch(countryLongitude(country.lon));
                        }}>
                            {country.title}
                        </li>


                    )
                }
            </ul>

        )
    }
    else return;
}

export default CountriesMenu


