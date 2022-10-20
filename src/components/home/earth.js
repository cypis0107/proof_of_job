import { Sphere, useTexture } from "@react-three/drei";
import { Object3D } from "three";
import { useRef } from "react";
import EarthColor from "./textures/earth-color.jpg";
import Ocean from "./textures/earth-ocean.jpg";
import Clouds from "./clouds";
import Point from "./point";
import { coordToVec3 } from "../helper/helper";
import { ContinentsCoordinates } from "../../data/continents.coordinates";
import { CountriesCoordinates } from "../../data/countries.coordinates";
import { useDispatch } from "react-redux";
import { cameraFov, cameraAutoRotateOn, cameraAutoRotateOff } from '../../features/earth/earthSlice';



const Earth = () => {
    const coords = [...ContinentsCoordinates, ...CountriesCoordinates];
    const dispatch = useDispatch();

    const forwardRef = useRef(Object3D);
    const [earthColor, ocean] = useTexture([
        EarthColor, Ocean
    ])
    const radius = 1;

    const handleClick = event => {
        switch (event.detail) {
            case 1: {
                dispatch(cameraAutoRotateOff());
                //dispatch(cameraFov(40));
                break;
            }
            case 2: {
                dispatch(cameraAutoRotateOn());
                dispatch(cameraFov(40));
                break;
            }
            default: { break }
        }
    };

    return (
        <group rotation={[0, 2, 0]} >
            {
                coords.map((cord) =>
                    <Point
                        key={cord.title}
                        position={coordToVec3(cord.lat, cord.lon, radius).position}
                        coord={cord}
                        forwardRef={forwardRef}
                    />
                )
            }
            <Clouds />
            <Sphere ref={forwardRef} args={[radius, 32, 32]} scale={[1, 1, 1]} onClick={handleClick}>
                <meshPhongMaterial
                    specularMap={ocean}
                    specular={0x404040}
                    map={earthColor}
                    shininess={20}
                />
            </Sphere>
        </group >
    );
}

export default Earth;

