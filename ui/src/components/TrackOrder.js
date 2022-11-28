// eslint-disable
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import httpClient from "../utils/AxiosConfig";
import { ToastContainer } from "react-toastify";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TrackOrder = (props) => {
  const history = useHistory();
  const [trackOrder, setTrackOrder] = useState([]);
  const [data, setData] = useState([]);
  const [code, setCode] = useState(props.match.params.code);

  const boxStyle = {
    marginTop: 6,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  const imageStyle = {
    width: 200,
    height: 200,
  };

  const getOrderDetails = async () => {
    await httpClient.get(`/orders/orderComments?code=${code}`).then((res) => {
      setTrackOrder(res.data.response.data);
      setData(res.data.response.data[0]);
    });
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  return trackOrder.length > 0 ? (
    <Container component="main" maxWidth="xl">
      <AppBar position="static" color="transparent">
        <Toolbar style={{ backgroundColor: " #01579b" }}>
          <Typography
            component={"span"}
            variant={"h6"}
            sx={{ flexGrow: 1, color: "white" }}
          >
            GJURMIMI I POROSISE -{" "}
            {data.orderCode != null && data.orderCode != ""
              ? data.orderCode
              : "/"}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={boxStyle}>
        <Grid
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Grid xs={12} md={5} lg={8}>
            <Card>
              <CardContent
                direction="column"
                justify="center"
                alignItems="center"
                spacing={0}
                style={{ minHeight: "80vh" }}
              >
                <AppBar position="static" color="transparent">
                  <Toolbar>
                    <Grid
                      container
                      spacing={{ xs: 2, md: 3 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      <Grid item xs={2} sm={4} md={4}>
                        <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
                          POSTA: LightPost
                        </Typography>
                      </Grid>
                      <Grid item xs={2} sm={4} md={4}>
                        <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
                          STATUSI:
                          {data.actualStatus != null && data.actualStatus != ""
                            ? data.actualStatus
                            : "/"}
                        </Typography>
                      </Grid>
                      <Grid item xs={2} sm={4} md={4}>
                        <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
                          DATA E KRIJIMIT:
                          {data.orderCreatedDate != null &&
                          data.orderCreatedDate != ""
                            ? data.orderCreatedDate
                            : "/"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Toolbar>
                </AppBar>
                <Paper sx={{ width: "100%", overflow: "hidden", mt: 4 }}>
                  <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Status</TableCell>
                          <TableCell align="center">Koment</TableCell>
                          <TableCell align="center">Data</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {trackOrder.map((row) => (
                          <TableRow
                            key={row.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="center">
                              {row.status != null && row.status != ""
                                ? row.status
                                : "/"}
                            </TableCell>
                            <TableCell align="center">
                              {row.comment != null && row.comment != ""
                                ? row.comment
                                : "/"}
                            </TableCell>
                            <TableCell align="center">
                              {row.createdDate != null && row.createdDate != ""
                                ? row.createdDate
                                : "/"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </CardContent>
            </Card>
            <Button
              sx={{ mt: 2 }}
              type="submit"
              variant="contained"
              onClick={() => history.push("/")}
            >
              Kthehu prapa
            </Button>
          </Grid>
        </Grid>
        <img
          src={require("../assets/light.png")}
          alt="LIGHT LOGO"
          style={imageStyle}
        />
      </Box>
      <ToastContainer />
    </Container>
  ) : (
    <Container component="main" maxWidth="xl">
      <AppBar position="static" color="transparent">
        <Toolbar style={{ backgroundColor: " #01579b" }}>
          <Typography
            component={"span"}
            variant={"h6"}
            sx={{ flexGrow: 1, color: "white" }}
          >
            KODI PËR GJUMRIM ËSHTË GABIM OSE PAKO ME KËTË KOD NUK EKZISTON!
          </Typography>
        </Toolbar>
      </AppBar>
      <Button
        sx={{ mt: 2 }}
        type="submit"
        variant="contained"
        onClick={() => history.push("/")}
      >
        Kthehu prapa
      </Button>
    </Container>
  );
};

export default TrackOrder;
