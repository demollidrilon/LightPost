// eslint-disable
import React, { useState, useEffect } from "react";
import * as auth from "../../utils/Auth";
import httpClient from "../../utils/AxiosConfig";
import { ToastContainer } from "react-toastify";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import IconButton from "@mui/material/IconButton";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { CSVLink } from "react-csv";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "react-toastify/dist/ReactToastify.css";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import ListIcon from "@mui/icons-material/List";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const boxStyle = {
  marginTop: 6,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const buttonStyle = {
  mt: 0.9,
};

const AdminClientsOrders = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orders, setOrders] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [openDetails, setOpenDetails] = useState(false);
  const [order, setOrder] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);

  const deleteOrder = async (e, code) => {
    const body = {
      code: code,
    };
    e.preventDefault();
    await httpClient.post("/orders/deleteOrder", body).then((res) => {
      getOrders();
    });
  };

  const handleClickOpenDetails = () => {
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOrder(null);
    setSelectedDriver(null);
    setOpenDetails(false);
  };

  const setChosenDriver = async (event) => {
    setSelectedDriver(event.target.value);
  };

  const setSelectedOrder = async (code) => {
    setOrder(code);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const exportPDF = (title, note, dataToExport) => {
    const unit = "pt";
    const size = "A4";
    const orientation = "landscape";

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(10);

    const headers = [
      [
        "Id",
        "STATUSI",
        "KODI",
        "EMRI DHE MBIEMRI",
        "NUMRI I TELEFONIT",
        "ADRESA",
        "QYTETI",
        "SHTETI",
        "DATA E MODIFIKIMIT",
        "DATA E NDRYSHIMIT",
      ],
    ];

    const data = dataToExport.map((elt) => [
      elt.id,
      elt.status,
      elt.code,
      elt.nameSurname,
      elt.telephoneNumber,
      elt.address,
      elt.city,
      elt.country,
      elt.createdDate,
      elt.lastUpdate,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save(note + ".pdf");
  };

  const getOrders = async () => {
    await httpClient.get("/orders/allOrders").then((res) => {
      setOrders(res.data.response.data);
    });
  };

  const getDrivers = async () => {
    await httpClient.get("/userDetails/drivers").then((res) => {
      setDrivers(res.data.response.data);
    });
  };

  const setDriverForOrder = async () => {
    await httpClient
      .post(
        `/orders/setDriverForOrder?code=${order}&driverId=${selectedDriver}`
      )
      .then((res) => {
        handleCloseDetails();
        getOrders();
      });
  };

  useEffect(() => {
    getOrders();
    getDrivers();
  }, []);

  const setDriverForOrderDialog = () => {
    return (
      <>
        <Container component="main" maxWidth="xs">
          <Dialog
            open={openDetails}
            onClose={handleCloseDetails}
            scroll={"paper"}
          >
            <AppBar sx={{ position: "relative", backgroundColor: "#101F33" }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleCloseDetails}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                >
                  Cakto shoferin për porosinë e zgjedhur
                </Typography>
              </Toolbar>
            </AppBar>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
            >
              <Card
                sx={{
                  width: 600,
                  height: 200,
                  mt: 1,
                }}
              >
                <CardContent>
                  <Grid container spacing={1} columns={30}>
                    <Grid item xs={15} sx={{ mt: 2, fontSize: 14 }}>
                      CAKTO SHOFERIN PËR POROSI:
                    </Grid>
                    <Grid item xs={15} sx={{ mt: 2, fontSize: 14 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Shoferi
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Shoferi"
                          onChange={setChosenDriver}
                        >
                          {drivers.map((driver) => (
                            <MenuItem value={driver.id}>
                              {driver.username}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Button
                    sx={{ float: "right", mt: 2 }}
                    type="submit"
                    variant="contained"
                    onClick={() => {
                      setDriverForOrder();
                    }}
                    disabled={selectedDriver == null}
                  >
                    Cakto
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Button sx={{ mt: 2 }} type="submit" onClick={handleCloseDetails}>
              Kthehu prapa
            </Button>
          </Dialog>
        </Container>
      </>
    );
  };

  return (
    <>
      {openDetails == true && setDriverForOrderDialog()}

      <Container component="main" maxWidth="xl">
        <AppBar position="static" color="transparent">
          <Toolbar>
            <Typography component={"span"} variant={"h6"} sx={{ flexGrow: 1 }}>
              POROSITË E KLIENTËVE
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper sx={{ width: "100%", overflow: "hidden", mt: 4 }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <PictureAsPdfIcon
                    onClick={() => exportPDF("POROSITE", "orders", orders)}
                  />
                </IconButton>
                <CSVLink data={orders} filename={"orders.csv"}>
                  <AnalyticsIcon sx={{ color: "gray" }} />
                </CSVLink>
                <TableRow>
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Kodi</TableCell>
                  <TableCell align="center">Emri dhe Mbiemri</TableCell>
                  <TableCell align="center">Numri i telefonit</TableCell>
                  <TableCell align="center">Adresa</TableCell>
                  <TableCell align="center">Qyteteti</TableCell>
                  <TableCell align="center">Shteti</TableCell>
                  <TableCell align="center">Çmimi</TableCell>
                  <TableCell align="center">Data e Krijimit</TableCell>
                  <TableCell align="center">Data e Modifikimit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="center">
                        {row.id != null && row.id != "" ? row.id : "/"}
                      </TableCell>
                      <TableCell align="center">
                        {row.status != null && row.status != ""
                          ? row.status
                          : "/"}
                      </TableCell>
                      <TableCell align="center">
                        {row.code != null && row.code != "" ? row.code : "/"}
                      </TableCell>
                      <TableCell align="center">
                        {row.nameSurname != null && row.nameSurname != ""
                          ? row.nameSurname
                          : "/"}
                      </TableCell>
                      <TableCell align="center">
                        {row.telephoneNumber != null &&
                        row.telephoneNumber != ""
                          ? row.telephoneNumber
                          : "/"}
                      </TableCell>

                      <TableCell align="center">
                        {row.address != null && row.address != ""
                          ? row.address
                          : "/"}
                      </TableCell>
                      <TableCell align="center">
                        {row.city != null && row.city != "" ? row.city : "/"}
                      </TableCell>
                      <TableCell align="center">
                        {row.country != null && row.country != ""
                          ? row.country
                          : "/"}
                      </TableCell>
                      <TableCell align="center">
                        {row.country != null && row.country != ""
                          ? row.country
                          : "/"}
                      </TableCell>
                      <TableCell align="center">
                        {row.createdDate != null && row.createdDate != ""
                          ? row.createdDate
                          : "/"}
                      </TableCell>
                      <TableCell align="center">
                        {row.lastUpdate != null && row.lastUpdate != ""
                          ? row.lastUpdate
                          : "/"}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          sx={{ p: "10px", color: "#01579b" }}
                          onClick={handleClickOpenDetails}
                        >
                          <ListIcon
                            onClick={(e) => setSelectedOrder(row.code)}
                          />
                        </IconButton>
                      </TableCell>
                      {row.status != null &&
                        row.status != "" &&
                        row.status == "KRIJUAR" && (
                          <TableCell align="center">
                            <IconButton
                              sx={{ p: "10px", color: "red " }}
                              onClick={(e) => deleteOrder(e, row.code)}
                            >
                              <HighlightOffIcon />
                            </IconButton>
                          </TableCell>
                        )}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            sx={{
              color: "#01579b",
              mt: 1,
            }}
            rowsPerPageOptions={["10", "25", "50", "100"]}
            component="div"
            count={orders.length}
            rowsPerPage={[rowsPerPage]}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <ToastContainer />
      </Container>
    </>
  );
};

export default AdminClientsOrders;
