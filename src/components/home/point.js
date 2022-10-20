import { Html } from '@react-three/drei'
import { useDispatch } from "react-redux";
import { displayEarthOff, countryTitle, countryLatitude, countryLongitude } from '../../features/earth/earthSlice';


const Point = (props) => {

    const dispatch = useDispatch();

    const handleClick = () => {

        dispatch(displayEarthOff());
        dispatch(countryTitle(props.coord.title));
        dispatch(countryLatitude(props.coord.lat));
        dispatch(countryLongitude(props.coord.lon));
        //console.log('Point', props.coord.title, props.coord.lat, props.coord.lon);
        // <GoMap title={props.coord.title} lat={props.coord.lat} lon={props.coord.lon} />
    }

    return (
        !props.coord.continent ?
            <Html
                className={'point-continent'}
                position={props.position}
                occlude={[props.forwardRef]}>
                {props.coord.title}
            </Html>
            :
            < Html
                className={`point  ${props.coord.hash ? 'hasHash' : ''}`}
                position={props.position}
                occlude={[props.forwardRef]}
            >
                {/* <TbPinned size={'1.9rem'} /> */}
                {
                    props.coord.icon ? (
                        <img
                            onClick={(e) => (window.location.hash = props.coord.hash)}
                            alt={props.coord.title}
                            title={props.coord.title}
                            src={props.coord.icon}
                        />
                    ) : (
                        <button onClick={(e) => (window.location.hash = props.coord.hash)} />
                    )
                }
                < div className="text" onClick={handleClick} > {props.coord.title}</div >
            </Html >
    )
}

export default Point;

