//import { TestingIcon } from "../../assets/icon";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import { logout } from "../../features/user/userSlice";
//import { deleteUser, updateUserId, updateUserName, calculateTotal } from "../../features/user/userSlice";
import { signOutUser } from '../../utils/firebase/firebase'
import { useLocalStorage } from '../helper/helper';
import './test.style.css'

const Test = () => {
    // const dispatch = useDispatch();
    //const { displayName, uid } = useSelector((store) => store.user)
    const user = useSelector(selectUser);
    const [storedCurrentUser, setStoredCurrentUser] = useLocalStorage("curren-user", user);

    const dispatch = useDispatch();

    const logoutOfApp = () => {
        dispatch(logout());
        signOutUser();
        setStoredCurrentUser(null);
    };
    return (
        <div className="test-container">

            <button onClick={() => { logoutOfApp() }}>
                signOut
            </button>

            {/* <div>USER: {name} {id}

            </div>
            <hr /><br />
            <div className="icon"><TestingIcon /></div>
            <button onClick={() => { dispatch(deleteUser()) }}>
                Delete User
            </button>
            <button onClick={() => { dispatch(updateUserId('02')) }}>
                Update User Id
            </button>
            <button onClick={() => { dispatch(updateUserName('Czesiek')) }}>
                Update User Name
            </button>
            <button onClick={() => { dispatch(calculateTotal()) }}>
                Total
            </button> */}
        </div >
    )
}

export default Test