// eslint-disable
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Login.css";
import { useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const imageStyle = {
  width: 200,
  height: 200,
};

const boxStyle = {
  marginTop: 6,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const buttonStyle = {
  mt: 2,
  mb: 1,
};

const textFieldStyle = {
  mt: 2,
  mb: 1,
};

export default function Login() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [packageCode, setPackageCode] = useState("");
  const [isLoadingForLogin, setIsLoadingForLogin] = useState(false);
  const [isLoadingForPackage, setIsLoadingForPackage] = useState(false);

  const checkLogin = async (event) => {
    setIsLoadingForLogin(true);
    event.preventDefault();
    if (username == null || username == "") {
      toast.warn("Ju lutem shënoni shfrytëzuesin!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setIsLoadingForLogin(false);
      return;
    }
    if (password == null || password == "") {
      toast.warn("Ju lutem shënoni fjalëkalimin!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setIsLoadingForLogin(false);
      return;
    }
    const authorization = {
      UserName: username,
      Password: password,
    };

    //     await httpClient.post("account/login", authorization).then(
    //       (res) => {
    //         auth.saveToken(res.data.token.token);
    //         history.push("/accounts");
    //         setIsLoading(true);
    //       },
    //       (error) => {
    //         toast.error("Diçka shkoi gabim, ju lutem provoni përsëri.", {
    //           position: toast.POSITION.BOTTOM_CENTER,
    //         });
    //         setIsLoading(false);
    //       }
    //     );
  };

  const checkPackage = async (event) => {
    setIsLoadingForPackage(true);
    event.preventDefault();
    if (packageCode == null || packageCode == "") {
      toast.warn("Ju lutem shënoni kodin e paketës për gjurmim!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setIsLoadingForPackage(false);
      return;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={boxStyle}>
        <img
          src={require("../assets/light.png")}
          alt="LIGHT LOGO"
          style={imageStyle}
        />
        <Box sx={{ mt: -6 }} style={{ color: "gray", fontSize: 19 }}>
          Kyçu në platformën e Light Post
        </Box>
        <Box component="form" noValidate>
          <TextField
            onChange={(e) => setUsername(e.target.value)}
            sx={textFieldStyle}
            fullWidth
            id="username"
            label="Shfrytëzuesi"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            name="password"
            label="Fjalëkalimi"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {!isLoadingForLogin ? (
            <Button
              className="Button"
              type="submit"
              fullWidth
              variant="contained"
              sx={buttonStyle}
              onClick={checkLogin}
            >
              Kyçu
            </Button>
          ) : (
            <CircularProgress sx={{ mt: 1 }} size={30} />
          )}
        </Box>

        <Box component="form" noValidate>
          <TextField
            onChange={(e) => setPackageCode(e.target.value)}
            sx={textFieldStyle}
            fullWidth
            id="packageCode"
            label="Gjurmo pakon"
            name="packageCode"
            autoComplete="packageCode"
          />

          {!isLoadingForPackage ? (
            <Button
              className="Button"
              type="submit"
              fullWidth
              variant="contained"
              sx={buttonStyle}
              onClick={checkPackage}
            >
              Gjurmo
            </Button>
          ) : (
            <CircularProgress sx={{ mt: 1 }} size={30} />
          )}
        </Box>
        <Box>
          <a href="/register" style={{ textDecoration: "none" }}>
            Regjistrohu
          </a>
        </Box>
      </Box>
      <ToastContainer />
    </Container>
  );
}
