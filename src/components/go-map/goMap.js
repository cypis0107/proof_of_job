import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import { displayEarthOn } from '../../features/earth/earthSlice';

import { CgCloseO } from 'react-icons/cg';

import './go-map.style.css';

const GoMap = (props) => {

    const dispatch = useDispatch();

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    });
    if (!isLoaded) return <div>loading ..</div>

    const point = { lat: (props.lat), lng: (props.lon) };

    return (

        <div className="back-map-container">
            <div className="map-main-container">
                <GoogleMap
                    zoom={5}
                    center={point}
                    mapContainerClassName="map-container">
                    <MarkerF
                        position={point}
                    />
                </GoogleMap>
                <div>
                    <CgCloseO
                        className="close-map-icon"
                        size={'2.6rem'}
                        onClick={() => {
                            dispatch(displayEarthOn());
                        }}
                    />
                </div>
            </div>
        </div>

    );
}

export default GoMap;





    //const point = useMemo(() => ({ lat: 52.237049, lng: 21.017532 }), []);
    //const point = useMemo(() => ({ lat: (props.lat), lng: (props.lon) }), []);