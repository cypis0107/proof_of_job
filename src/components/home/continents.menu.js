import { ContinentsMenuList } from "../../data/continents.menu.list";
import CountriesMenu from "./countries.menu";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
    cameraPosition,
    cameraFov,
    cameraAutoRotateOff,
    cameraAutoRotateOn,
    setContinentId
} from '../../features/earth/earthSlice';

const ContinentsMenu = () => {

    const dispatch = useDispatch();
    const { continentId } = useSelector((store) => store.earth);

    return (
        <div className="continents">

            {
                ContinentsMenuList.map((cont) =>
                    <ul key={cont.key} onClick={() => {
                        if (continentId === cont.id) {
                            dispatch(setContinentId(''));
                            dispatch(cameraFov(40));
                            dispatch(cameraAutoRotateOn());
                        } else {
                            dispatch(setContinentId(cont.id));
                            dispatch(cameraPosition(cont.position));
                            dispatch(cameraFov(cont.fov));
                            dispatch(cameraAutoRotateOff());
                        }
                    }}>{cont.title}
                        <CountriesMenu id={cont.id} />
                    </ul>
                )
            }

        </div>
    )
}

export default ContinentsMenu;