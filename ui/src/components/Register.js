// eslint-disable
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import httpClient from "../utils/AxiosConfig";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { ToastContainer, toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Login.css";

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
  mt: 1,
  mb: 0.2,
};

export default function Register() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [isLoadingForRegister, setIsLoadingForRegister] = useState(false);

  const checkRegister = async (event) => {
    setIsLoadingForRegister(true);
    event.preventDefault();
    if (username == null || username == "") {
      toast.warn("Ju lutem shënoni shfrytëzuesin!");
      setIsLoadingForRegister(false);
      return;
    }
    if (password == null || password == "") {
      toast.warn("Ju lutem shënoni fjalëkalimin!");
      setIsLoadingForRegister(false);
      return;
    }
    if (name == null || name == "") {
      toast.warn("Ju lutem shënoni emrin!");
      setIsLoadingForRegister(false);
      return;
    }
    if (surname == null || surname == "") {
      toast.warn("Ju lutem shënoni mbiemrin!");
      setIsLoadingForRegister(false);
      return;
    }
    if (phoneNumber == null || phoneNumber == "") {
      toast.warn("Ju lutem shënoni numrin e telefonit!");
      setIsLoadingForRegister(false);
      return;
    }
    if (address == null || address == "") {
      toast.warn("Ju lutem shënoni adresën!");
      setIsLoadingForRegister(false);
      return;
    }
    if (city == null || city == "") {
      toast.warn("Ju lutem shënoni qytetin!");
      setIsLoadingForRegister(false);
      return;
    }

    const authorization = {
      Username: username,
      Password: password,
      Name: name,
      Surname: surname,
      TelephoneNumber: phoneNumber,
      Address: address,
      City: city,
    };

    await httpClient.post("/register", authorization).then(
      (res) => {
        if (res.data.response.status_code == 200) {
          toast.success("Jeni regjistruar me sukses në platformën LightPost");
          setTimeout(() => {
            history.push("/");
          }, 2000);
          setIsLoadingForRegister(true);
        }

        if (
          res.data.response.status_code == 400 &&
          res.data.response.exception_message == "Username already exists!"
        ) {
          toast.info(
            "Shfrytëzuesi ekziston! Ju lutem zgjedhni një shfrytëzues tjetër!"
          );
          setIsLoadingForRegister(false);
        } else if (
          res.data.response.status_code == 400 &&
          res.data.response.exception_message ==
            "Telephone number already exists!"
        ) {
          toast.info(
            "Ky numër telefoni ekziston tek një shfrytëzues tjerër! Ju lutem rishikoni numrin tuaj të telefonit"
          );
          setIsLoadingForRegister(false);
        }
      },
      (error) => {
        toast.error("Diçka shkoi gabim, ju lutem provoni përsëri.");
        setIsLoadingForRegister(false);
      }
    );
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
          Regjistrohu në platformën e Light Post
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
            sx={textFieldStyle}
            name="password"
            label="Fjalëkalimi"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            onChange={(e) => setName(e.target.value)}
            sx={textFieldStyle}
            fullWidth
            id="name"
            label="Emri"
            name="name"
            autoComplete="name"
          />
          <TextField
            onChange={(e) => setSurname(e.target.value)}
            sx={textFieldStyle}
            fullWidth
            id="surname"
            label="Mbiemri"
            name="surname"
            autoComplete="surname"
          />
          <TextField
            onChange={(e) => setPhoneNumber(e.target.value)}
            sx={textFieldStyle}
            fullWidth
            id="phone"
            label="Telefon"
            name="phone"
            autoComplete="phone"
          />
          <TextField
            onChange={(e) => setAddress(e.target.value)}
            sx={textFieldStyle}
            fullWidth
            id="address"
            label="Adresa"
            name="address"
            autoComplete="address"
          />
          <TextField
            onChange={(e) => setCity(e.target.value)}
            sx={textFieldStyle}
            fullWidth
            id="city"
            label="Qyteti"
            name="city"
            autoComplete="city"
          />
          {!isLoadingForRegister ? (
            <Button
              className="Button"
              type="submit"
              variant="contained"
              sx={buttonStyle}
              onClick={checkRegister}
            >
              Regjistrohu
            </Button>
          ) : (
            <CircularProgress sx={{ mt: 1 }} size={30} />
          )}
        </Box>
        <Box>
          <a href="/" style={{ textDecoration: "none" }}>
            Kyçu
          </a>
        </Box>
      </Box>
      <ToastContainer />
    </Container>
  );
}
