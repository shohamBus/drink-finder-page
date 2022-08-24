import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SignInUser, SignOutUser } from "../../redux/slices/userSlice";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import { AppBar, Box } from "@mui/material";
import axios from "axios";
import "./Header.css";

function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { allUsers } = useSelector((state) => state.allUsers);
  const clientId =
    "1030310592003-21c8fhjajnkpve3hol5v2d9mkgdhd35n.apps.googleusercontent.com";

  //configure the google signin
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: { clientId },
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  //create new user
  const NewUser = (res) => {
    axios
      .post("http://localhost:5000/api/users", res)
      .then((res) => res.send(res.data));
  };

  //sign-in :details of the user apdate state
  const responseGoogle = (response) => {
    dispatch(SignInUser(response.profileObj));
    //check if user new
    const uniq = allUsers.filter((user) => {
      return user.email !== response.profileObj.email;
    });
    return uniq.length === allUsers.length ? NewUser(response.profileObj) : "";
  };

  //logout:update the state
  const logout = () => {
    dispatch(SignOutUser());
  };

  return (
    <Box sx={{ flexGrow: 1 }} className="header">
      <AppBar sx={{ bgcolor: "#FF5757" }} position="static">
        <div className="session">
          {user.name === "" && (
            <GoogleLogin
              clientId={clientId}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          )}
          {user.name !== "" && (
            <GoogleLogout
              clientId={clientId}
              buttonText="Logout"
              onLogoutSuccess={logout}
            />
          )}
          {user && <div>{user.name}</div>}
        </div>
        <div className="logo">
          <img src="./Buskilas.png" alt="koktail" width={200} height={150} />
        </div>
      </AppBar>
    </Box>
  );
}

export default Header;
