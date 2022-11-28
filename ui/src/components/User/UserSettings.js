// eslint-disable
import React, { useState, useEffect } from "react";
import * as auth from "../../utils/Auth";
import httpClient from "../../utils/AxiosConfig";
import { ToastContainer, toast } from "react-toastify";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

const boxStyle = {
  marginTop: 6,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const buttonStyle = {
  mt: 2,
};
const textFieldStyle = {
  mt: 2,
  mb: 1,
};

const UserSettings = () => {
  const [userData, setUserData] = useState([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(auth.getId());

  const headers = {
    ApiKey: "a9dfaq8d0cf3-4r53-42c3-9fq0-1ee7e3rd",
    "Content-Type": "application/json",
  };

  const updatePassword = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    if (password == null || password == "") {
      toast.warn("Ju lutem shënoni fjalëkalimin e ri!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setIsLoading(false);
      return;
    }
    if (confirmPassword == null || confirmPassword == "") {
      toast.warn("Ju lutem shënoni konfirmimin e fjalëkalimit!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setIsLoading(false);
      return;
    }
    if (password != confirmPassword) {
      toast.warn("Fjalëkalimet duhet të përputhen!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setIsLoading(false);
      return;
    }

    const headers = {
      ApiKey: "a9dfaq8d0cf3-4r53-42c3-9fq0-1ee7e3rd",
      "Content-Type": "application/json",
    };

    const body = {
      Password: password,
      SetPassword: confirmPassword,
      Id: userData.id,
    };

    await httpClient
      .post("/UserDetails/changePassword", body, { headers: headers })
      .then(
        (res) => {
          toast.info("Fjalëkalimi u përditësua me sukses!", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          setIsLoading(false);
        },
        (error) => {
          toast.error("Diçka shkoi gabim, ju lutem provoni përsëri.", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          setIsLoading(false);
        }
      );
  };

  const getData = async () => {
    await httpClient
      .get(`/UserDetails?id=${id}`, { headers: headers })
      .then((res) => {
        setUserData(res.data.response.data[0]);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container component="main" maxWidth="xl">
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography component={"span"} variant={"h6"} sx={{ flexGrow: 1 }}>
            Konfigurimet
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={boxStyle}>
        <Grid container spacing={2}>
          <Grid xs={12} md={5} lg={8}>
            <Card sx={{ maxWidth: 800, maxHeight: 1000, mt: 1 }}>
              <CardContent>
                <AppBar position="static" color="transparent">
                  <Toolbar>
                    <Typography
                      component={"snpan"}
                      variant={"h6"}
                      sx={{ flexGrow: 1 }}
                    >
                      Të dhënat e shfrytëzuesit
                    </Typography>
                  </Toolbar>
                </AppBar>
                <p></p>
                <Typography sx={{ fontWeight: "bold" }}>
                  Shfrytëzuesi
                </Typography>
                <Typography mt={2}>
                  {userData.username != null && userData.username != ""
                    ? userData.username
                    : "/"}
                </Typography>
                <br />

                <Typography sx={{ fontWeight: "bold" }}>Emri</Typography>
                <Typography mt={2}>
                  {(userData.name && userData.username) != null &&
                  (userData.name && userData.username) != ""
                    ? userData.name + " " + userData.surname
                    : "/"}
                </Typography>
                <br />

                <Typography sx={{ fontWeight: "bold" }}>Roli</Typography>
                <Typography mt={2}>{"Shfrytëzues"}</Typography>
                <br />

                <Typography sx={{ fontWeight: "bold" }}>Qyteti</Typography>
                <Typography mt={2}>
                  {userData.city != null && userData.city != ""
                    ? userData.city
                    : "/"}
                </Typography>
                <br />

                <Typography sx={{ fontWeight: "bold" }}>
                  Numri i telefonit
                </Typography>
                <Typography mt={2}>
                  {userData.telephoneNumber != null &&
                  userData.telephoneNumber != ""
                    ? userData.telephoneNumber
                    : "/"}
                </Typography>
                <br />

                <Typography sx={{ fontWeight: "bold" }}>Adresa</Typography>
                <Typography mt={2}>
                  {userData.address != null && userData.address != ""
                    ? userData.address
                    : "/"}
                </Typography>
                <br />

                <Typography sx={{ fontWeight: "bold" }}>
                  Cmimi i transportit [KS]
                </Typography>
                <Typography mt={2}>
                  {userData.cmimiTransportitKS != null &&
                  userData.cmimiTransportitKS != ""
                    ? userData.cmimiTransportitKS + " €"
                    : "/"}
                </Typography>
                <br />

                <Typography sx={{ fontWeight: "bold" }}>
                  Cmimi i transportit [AL]
                </Typography>
                <Typography mt={2}>
                  {userData.cmimiTransportitAL != null &&
                  userData.cmimiTransportitAL != ""
                    ? userData.cmimiTransportitAL + " €"
                    : "/"}
                </Typography>
                <br />

                <Typography sx={{ fontWeight: "bold" }}>
                  Cmimi i transportit [MK]
                </Typography>
                <Typography mt={2}>
                  {userData.cmimiTransportitMK != null &&
                  userData.cmimiTransportitMK != ""
                    ? userData.cmimiTransportitMK + " €"
                    : "/"}
                </Typography>
                <br />
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} md={5} lg={4}>
            <Card sx={{ maxWidth: 800, maxHeight: 500, mt: 1 }}>
              <CardContent>
                <AppBar position="static" color="transparent">
                  <Toolbar>
                    <Typography
                      component={"span"}
                      variant={"h6"}
                      sx={{ flexGrow: 1 }}
                    >
                      Ndrysho fjalëkalimin
                    </Typography>
                  </Toolbar>
                </AppBar>
                <Grid container spacing={1} sx={{ mt: 2 }} columns={30}>
                  <Grid item xs={15} sx={{ mt: 4 }}>
                    Fjalëkalimi i ri
                  </Grid>
                  <Grid item xs={15}>
                    <TextField
                      onChange={(e) => setPassword(e.target.value)}
                      sx={textFieldStyle}
                      id="password"
                      label="Fjalëkalimi i ri"
                      type="password"
                      autoComplete="current-password"
                      autoFocus
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ mt: 2 }} columns={30}>
                  <Grid item xs={15} sx={{ mt: 1 }}>
                    Konfirmo fjalëkalimin e ri
                  </Grid>
                  <Grid item xs={15}>
                    <TextField
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      name="password"
                      id="confirmPassword"
                      label="Konfirmo fjalëkalimin e ri"
                      type="password"
                      autoComplete="current-password"
                    />
                  </Grid>
                </Grid>
                {!isLoading ? (
                  <Button
                    type="submit"
                    variant="contained"
                    sx={buttonStyle}
                    onClick={updatePassword}
                  >
                    Ndrysho fjalëkalimin
                  </Button>
                ) : (
                  <CircularProgress sx={{ mt: 1 }} size={30} />
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default UserSettings;
