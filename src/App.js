import { useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { login, logout } from './features/user/userSlice';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import LogInUser from "./components/log-in/user/LogInUser";
import AfterLoginScreen from "./components/after-login-sc/AfterLoginScreen";
import CreateUserAccount from "./components/create-account/user-account/UserAccount";
import CreateEmployerAccount from "./components/create-account/employer-account/Employer.account";

import Test from "./components/test/Test";
import UserProfile from "./components/profile/user-profile/UserProfile";
import LogInEmployer from "./components/log-in/employer/LogInEmployer";
import EmployerProfile from "./components/profile/employer-profile/EmployerProfile";


function App() {
  const auth = getAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
          })
        );
        return unsubscribe;
      } else {
        dispatch(logout());
      }
    });

  }, [auth, dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login-user' element={<LogInUser />} />
        <Route path='/login-employer' element={<LogInEmployer />} />

        <Route path='/create_account/user' element={<CreateUserAccount />} />

        <Route path='/create_account/employer' element={<CreateEmployerAccount />} />
        <Route path='/log_sc' element={<AfterLoginScreen />} />
        <Route path='/user_profile' element={<UserProfile />} />
        <Route path='/employer_profile' element={<EmployerProfile />} />
        <Route path='/contact' element={<Test />} />

      </Route>
    </Routes >
  );
}

export default App;
