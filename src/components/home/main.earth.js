
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls, PerspectiveCamera, Html } from "@react-three/drei";
import Earth from "./earth";
import GoMap from "../go-map/goMap";

import { useSelector } from "react-redux";

//import { BiLeftArrowCircle } from 'react-icons/bi';
import { store } from '../../store';
import { Provider } from 'react-redux';

const MainEarth = () => {

    const { camPosition,
        camAutoRotate,
        camFov,
        displayEarth,
        countryTitle,
        countryLat,
        countryLon,
    } = useSelector((store) => store.earth);

    const windowHeight = `${-window.innerHeight / 4}px`;
    const windowWidth = `${-window.innerWidth / 4}px`;
    console.log(windowHeight, windowWidth);

    return (
        <div className="earth">
            <div className="inner" >
                <Suspense
                    fallback={
                        <div className="loading">
                            <p>Spinner</p>
                        </div>
                    }>
                    <Canvas dpr={[1, 2]} >
                        <color attach="background" args={[0x000000]} />
                        <PerspectiveCamera fov={camFov} position={camPosition} makeDefault>
                            <directionalLight color={0xffffff} intensity={2} position={[0, -5, 5]} />
                        </PerspectiveCamera>
                        <Stars />
                        {displayEarth ?
                            <Earth /> :
                            <Html style={{
                                top: `${-window.innerHeight / 3}px`,
                                left: `${-window.innerWidth / 2.5}px`
                            }}>
                                <Provider store={store}><GoMap title={countryTitle} lat={countryLat} lon={countryLon} /></Provider>
                            </Html>

                        }
                        <OrbitControls
                            enablePan={false}
                            autoRotateSpeed={0.4}
                            autoRotate={camAutoRotate}
                            minDistance={2.5}
                            maxDistance={3.5}
                            zoom={1}
                        />
                    </Canvas>
                </Suspense>
            </div >
        </div >
    );
}

export default MainEarth;


// const [openSideMenu, setOpenSideMenu] = useState(false);
// const [continentId, setContinentId] = useState();


// const [displayEarth, setDisplayEarth] = useState(true);
// const [countryTitle, setCountryTitle] = useState();
// const [countryLat, setCountryLat] = useState();
// const [countryLon, setCountryLon] = useState();
//const [camPosition, setCamPosition] = useState([-27, 44, -30]);
//const [camAutoRotate, setCamAutoRotate] = useState(true);
//const [camFov, setCamFov] = useState(40);

// displayEarth ?
//{/* <Html>

                            // <div className={openSideMenu ? "countries" : "continents"}>
                            //     <div className={openSideMenu ? "countries-container" : "continents-container"}>
                            //         <ul>
                            //             {
                            //                 openSideMenu ?
                            //                     <ul>
                            //                         <li onClick={() => {
                            //                             setOpenSideMenu(false);
                            //                             setCamFov(40);
                            //                             setCamAutoRotate(false);
                            //                         }}>
                            //                             <BiLeftArrowCircle
                            //                                 className="arrow-move"
                            //                                 size={'2.8rem'}
                            //                                 color={'#ef0454'}
                            //                             />
                                                    // </li>

                                                    // {CountriesCoordinates.map((country) =>
                                                    //     country.continent === continentId &&

                                                    //     < li key={country.title} onClick={() => {
                                                    //         setCountryTitle(country.title);
                                                    //         setCountryLat(country.lat);
                                                    //         setCountryLon(country.lon);

                                                    //         setDisplayEarth(false);
                                                    //     }}>
                                                    //         {country.title}
                                                    //     </li>

                                                    // )}

                                //                 </ul>
                                //                 :
                                //                 ContinentsMenuList.map((cont) =>
                                //                     <li key={cont.key} onClick={() => {
                                //                         onClickContinent({
                                //                             position: cont.position,
                                //                             auto: cont.auto,
                                //                             fov: cont.fov
                                //                         })
                                //                         setOpenSideMenu(true);
                                //                         setContinentId(cont.id);
                                //                         // setContinentTitle(cont.title);
                                //                     }}>{cont.title}
                                //                     </li>
                                //                 )

                                //         }
                                //     </ul>
                                // </div>

    //                         </div>


    //                     </Html> */}

    //    // :
        // <GoMap title={countryTitle} lat={countryLat} lon={countryLon} />






/*
 document.getElementById('root')
                         <Html>
                            <div className="continents">
                                <div className={openSideMenu ? "countries-container" : "continents-container"}>

                                  

                                    <ul>
                                        {
                                            ContinentsMenuList.map((cont) =>
                                                <li key={cont.key} onClick={() => {
                                                    onClickContinent({
                                                        position: cont.position,
                                                        auto: cont.auto,
                                                        fov: cont.fov
                                                    })
                                                    setOpenSideMenu(!openSideMenu);
                                                    setContinentId(cont.id);
                                                    setContinentTitle(cont.title);
                                                    console.log(continentId, continentTitle);
                                                }}>{cont.title}
                                                </li>
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                        </Html>






                                       <ul>
                                        <li onClick={() => { onClickContinent({ position: [-27, 45, -30], auto: false, fov: 30 }) }}>Europe</li>
                                        <li onClick={() => { onClickContinent({ position: [40, 45, -10], auto: false, fov: 30 }) }}>NorthAmerica</li>
                                        <li onClick={() => { onClickContinent({ position: [70, -30, -80], auto: false, fov: 30 }) }}>South America</li>
                                        <li onClick={() => { onClickContinent({ position: [-57, 65, 20], auto: false, fov: 30 }) }}>Asia</li>
                                        <li onClick={() => { onClickContinent({ position: [-27, 5, -30], auto: false, fov: 30 }) }}>Africa</li>
                                        <li onClick={() => { onClickContinent({ position: [-37, -35, 80], auto: false, fov: 30 }) }}>Australia</li>

                                        <li onClick={() => { onClickContinent({ position: [-27, 45, -30], auto: false, fov: 30 }) }}>Europe</li>
                                        <li onClick={() => { onClickContinent({ position: [40, 45, -10], auto: false, fov: 30 }) }}>NorthAmerica</li>
                                        <li onClick={() => { onClickContinent({ position: [70, -30, -80], auto: false, fov: 30 }) }}>South America</li>
                                        <li onClick={() => { onClickContinent({ position: [-57, 65, 20], auto: false, fov: 30 }) }}>Asia</li>
                                        <li onClick={() => { onClickContinent({ position: [-27, 5, -30], auto: false, fov: 30 }) }}>Africa</li>
                                        <li onClick={() => { onClickContinent({ position: [-37, -35, 80], auto: false, fov: 30 }) }}>Australia</li>

                                        <li onClick={() => { onClickContinent({ position: [-27, 45, -30], auto: false, fov: 30 }) }}>Europe</li>
                </ul> 

                        onClick={() => {
                            setCamFov(40);
                            setCamAutoRotate(true);
                        }}


onClick={event => CameraPosition(event, [10, 10, 10])}
[148, 130, 4]
<div className='bx bx-menu' id='menu-icon'></div>

<section id='aboutSection'>
<a href='#aboutSection'>

<Earth coords={Coord} />


     <Text
                            scale={[5, 5, 5]}
                            color="white" // default
                            anchorX="center" // default
                            anchorY="middle" // default
                        >
                            IDD SOLUTION
                        </Text>
 minDistance={1.8}
                            maxDistance={3.1}
*/