import { useState } from "react";
import { getCountries } from "countries-cities-geo";



export const coordToVec3 = (lat, lon, radius) => {
    var latRad = lat * (Math.PI / 180);
    var lonRad = -lon * (Math.PI / 180);
    return {
        position: [
            Math.cos(latRad) * Math.cos(lonRad) * radius,
            Math.sin(latRad) * radius,
            Math.cos(latRad) * Math.sin(lonRad) * radius,
        ],
        rotation: [0.0, -lonRad, latRad - Math.PI * 0.5],

    };
}
export const getFirstLettersUpper = (str) => {
    if (str) {
        const firstLetters = str
            .split(' ')
            .map(word => word[0])
            .join('');

        return firstLetters.toUpperCase();
    }
    else {
        return null;
    }
}

export const findContinent = (countryName) => {
    const findCont = getCountries().find(obj => {
        return obj.name.common === countryName;
    })
    let continent = findCont.region;
    if (findCont.region === 'Americas') {
        const sub = findCont.subregion;
        switch (sub) {
            case 'Northern America':
                continent = 'North America';
                break;
            default:
                continent = sub;
                break;
        }
    }
    return continent;
}


export const errorCodesFromAuth = (error) => {
    switch (error.code) {
        case 'auth/user-not-found':
            alert('No user associated with this email');
            break;
        case 'auth/wrong-password':
            alert('Incorrect password for email');
            break;
        case 'auth/account-exists-with-different-credential':
            alert('auth/account-exists-with-different-credential');
            break;
        case 'auth/email-already-in-use':
            alert('cannot create user, email already in use');
            break;
        case 'auth/weak-password':
            alert('Password should be at least 6 characters');
            break;
        default:
            console.log("User log-in error", error);
    }
}
export const errorCodes = (error) => {
    switch (error) {
        case 1:
            alert('Account Exists With Different Credential');
            break;
        default:
            console.log(error);
    }
}


// Hook
export const useLocalStorage = (key, initialValue) => {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }
        try {
            // Get from local storage by key
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return initialValue;
        }
    });
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    };
    return [storedValue, setValue];
}











// Google Map Api
// AIzaSyAp4b6QiaaeDuy0cRiTCdFBvl7xs9swM7A




/*
opfer
find


hire
employer
employee


    const handleClick = event => {
        switch (event.detail) {
            case 1: {
                console.log('one click');
                break;
            }
            case 2: {
                camAutoRot(true)
                camFov(40)
                console.log('double click')
            }
            default: { break }

        }
    };



position={[-1, 0, 0]}

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { softShadows, MeshWobbleMaterial, OrbitControls } from '@react-three/drei';
import { useSpring, a } from 'react-spring';
import './projects.style.scss'

const Box3D = ({ position, args, color }) => {

    const [expand, setExpande] = useState(false);
    const props = useSpring({
        scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
    })
    const mesh = useRef(null);
    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
    return (
        <mesh
            onClick={() => setExpande(!expand)}
            castShadow
            position={position}
            ref={mesh}>
            <boxBufferGeometry attach="geometry" args={args} />
            <MeshWobbleMaterial
                attach="material"
                color={color}
                speed={1.8}
                factor={0.6}
            />

        </mesh>
    );
}


// #000000  "#ffffff"


const Projects = () => {
    return (
        <Canvas



            camera={{ position: [-5, 2, 10], fov: 60 }} style={{
                background: "#000000",
                display: "flex",
                height: "100vh"
            }}>
            <ambientLight intensity={0.3} />
            <directionalLight
                castShadow
                position={[0, 10, 0]}
                intensity={1.5}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
            />
            <pointLight position={[-10, 0, -20]} intensity={0.5} />
            <pointLight position={[0, -10, 0]} intensity={1.5} />

            <group>
                <mesh
                    receiveShadow
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, -3, 0]}>
                    <planeBufferGeometry attach='geometry' args={[100, 100]} />
                    <shadowMaterial attach='material' />
                </mesh>
            </group>
            <Box3D position={[0, 1, 0]} args={[2, 2, 2]} color={"red"} />
            <Box3D position={[-2, 1, -5]} color={"blue"} />
            <Box3D position={[5, 1, -2]} color={"brown"} />
            <OrbitControls />
        </Canvas>

    );
}

export default Projects;


*/