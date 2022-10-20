import { useRef } from "react";
import { Mesh } from "three";
import { Sphere, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import EarthClouds from "./textures/earth-clouds.jpg";

const Clouds = () => {
    const earthClouds = useTexture(EarthClouds);
    const cloudsRef = useRef(Mesh);

    useFrame(({ clock }) => {
        if (!cloudsRef.current) return
        cloudsRef.current.rotation.y = -clock.elapsedTime * 0.008
    })

    return (
        <Sphere ref={cloudsRef}
            args={[1.005, 32, 32]}
            scale={[1, 1, 1]}>
            <meshPhongMaterial
                transparent
                bumpMap={earthClouds}
                bumpScale={0.005}
                alphaMap={earthClouds}
            />
        </Sphere>
    );
}

export default Clouds;