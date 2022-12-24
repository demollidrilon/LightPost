// eslint-disable
import React, { useState, useEffect } from "react";
import httpClient from "../../utils/AxiosConfig";
import { ToastContainer, toast } from "react-toastify";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import IconButton from "@mui/material/IconButton";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { CSVLink } from "react-csv";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ListIcon from "@mui/icons-material/List";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const boxStyle = {
  marginTop: 6,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const buttonStyle = {
  mt: 2,
  mb: 1,
  float: "right",
};

const AdminClientsDraws = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [equations, setEquations] = useState([]);
  const [openDetails, setOpenDetails] = useState(false);
  const [openUsersForEquationDetails, setOpenUsersForEquationDetails] =
    useState(false);
  const [clickedEquationOrders, setClickedEquationOrders] = useState([]);
  const [usersForEquation, setUsersForEquation] = useState([]);
  const [selectedUserForEquation, setSelectedUserForEquation] = useState(null);

  const handleClickOpenDetails = () => {
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setClickedEquationOrders([]);
    setOpenDetails(false);
  };

  const handleClickOpenUsersForEquationDetails = () => {
    setOpenUsersForEquationDetails(true);
  };

  const handleCloseUsersForEquationDetails = () => {
    setSelectedUserForEquation(null);
    setOpenUsersForEquationDetails(false);
  };

  const getEquationOrders = async (e, equationId) => {
    e.preventDefault();
    await httpClient
      .get(`/equations/orders?equationId=${equationId}`)
      .then((res) => {
        setClickedEquationOrders(res.data.response.data);
      });
  };

  const handleCreateEquation = async (e) => {
    e.preventDefault();
    await httpClient
      .post(`/equations?clientId=${selectedUserForEquation}`)
      .then((res) => {
        console.log(res.data.response);
        if (res.data.response.data == "OK") {
          toast.success("Barazimi i krijua me sukses!");
          getEquations();
          handleCloseUsersForEquationDetails();
        } else {
          toast.error(res.data.response.data);
          handleCloseUsersForEquationDetails();
        }
      });
  };

  const getUsersForEquation = async () => {
    await httpClient.get(`/userDetails/usersForEquation`).then((res) => {
      setUsersForEquation(res.data.response.data);
    });
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
        "TOTALI I FATURAVE",
        "TOTALI I PARAVE",
        "TOTALI I REFUZIMEVE",
        "TOTALI NET",
        "TOTALI I TRANSPORTIT",
        "DATA",
      ],
    ];

    const data = dataToExport.map((elt) => [
      elt.totalOrders,
      elt.totalPrice,
      elt.totalOrderRejections,
      elt.totalNET,
      elt.totalTransportationCost,
      elt.createdDate,
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getUsersForEquation();
    getEquations();
  }, []);

  const getEquations = async () => {
    await httpClient.get(`/equations/`).then((res) => {
      setEquations(res.data.response.data);
    });
  };

  const handleClientChange = async (event) => {
    setSelectedUserForEquation(event.target.value);
  };

  const usersForEquationDialog = () => {
    return (
      <>
        <Container>
          <Dialog
            open={openUsersForEquationDetails}
            onClose={handleCloseUsersForEquationDetails}
            maxWidth="xl"
          >
            <AppBar
              sx={{
                position: "relative",
                backgroundColor: "#101F33",
              }}
            >
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleCloseUsersForEquationDetails}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                >
                  Zgjedh klientin dhe krijo barazim të ri
                </Typography>
              </Toolbar>
            </AppBar>
            <Container
              sx={{
                width: 700,
                height: 500,
                mt: 1,
              }}
              style={{
                overflow: "hidden",
                overflowY: "scroll", // added scroll
              }}
            >
              <Typography
                variant="body2"
                sx={{ textAlign: "center", color: "gray", mb: "1rem" }}
                component="div"
              >
                Në këtë barazim do të përfshihen porositë që kanë statusin
                `Dorëzuar` dhe `Refuzuar` dhë që nuk përfshihen në ndonjë
                barazim tjetër të krijuar më parë për klientin e zgjedhur!
              </Typography>
              <Paper>
                <Grid item xs={15}>
                  <FormControl fullWidth sx={{ mt: 1 }}>
                    <InputLabel id="demo-simple-select-label">
                      Klientët
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedUserForEquation}
                      label="Klientët"
                      onChange={handleClientChange}
                    >
                      {usersForEquation.map((client) => (
                        <MenuItem value={client.id}>{client.username}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Button
                  sx={{ float: "right", mt: 2 }}
                  type="submit"
                  variant="contained"
                  disabled={selectedUserForEquation == null}
                  onClick={handleCreateEquation}
                >
                  Krijo barazim
                </Button>
              </Paper>
            </Container>
            <Button sx={{ mt: 2 }} type="submit" onClick={handleCloseDetails}>
              Kthehu prapa
            </Button>
          </Dialog>
        </Container>
      </>
    );
  };

  const equationOrdersDialog = () => {
    return (
      <>
        <Container>
          <Dialog open={openDetails} onClose={handleCloseDetails} maxWidth="xl">
            <AppBar
              sx={{
                position: "relative",
                backgroundColor: "#101F33",
              }}
            >
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
                  Detajet e barazimit:{" "}
                  {clickedEquationOrders.length > 0 &&
                    clickedEquationOrders[0].equationId}
                </Typography>
              </Toolbar>
            </AppBar>
            <Container
              sx={{
                width: 1200,
                height: 600,
                mt: 1,
              }}
              style={{
                overflow: "hidden",
                overflowY: "scroll", // added scroll
              }}
            >
              <Paper>
                <TableContainer>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            fontFamily: "Monospace",
                            color: "#4caf50",
                          }}
                          align="center"
                        >
                          STATUS
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Monospace",
                            color: "#4caf50",
                          }}
                          align="center"
                        >
                          POROSIA
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Monospace",
                            color: "#4caf50",
                          }}
                          align="center"
                        >
                          EMRI DHE MBIEMRI
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Monospace",
                            color: "#4caf50",
                          }}
                          align="center"
                        >
                          ADRESA
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Monospace",
                            color: "#4caf50",
                          }}
                          align="center"
                        >
                          QYTETI
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Monospace",
                            color: "#4caf50",
                          }}
                          align="center"
                        >
                          SHTETI
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Monospace",
                            color: "#4caf50",
                          }}
                          align="center"
                        >
                          KOMENT
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Monospace",
                            color: "#4caf50",
                          }}
                          align="center"
                        >
                          NUMRI I TELEFONIT
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Monospace",
                            color: "#4caf50",
                          }}
                          align="center"
                        >
                          ÇMIMI
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Monospace",
                            color: "#4caf50",
                          }}
                          align="center"
                        >
                          DATA E KRIJIMIT
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Monospace",
                            color: "#4caf50",
                          }}
                          align="center"
                        >
                          METODA E PAGESES
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Monospace",
                            color: "#4caf50",
                          }}
                          align="center"
                        >
                          ÇMIMI I TRANSPORTIT
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {clickedEquationOrders
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => (
                          <TableRow
                            key={row.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              align="center"
                              sx={{
                                fontWeight: "bold",
                                color:
                                  row.status === "DOREZUAR"
                                    ? "#4caf50"
                                    : "#f44336",
                              }}
                            >
                              {row.status != null && row.status != ""
                                ? row.status
                                : "/"}
                            </TableCell>
                            <TableCell align="center">
                              {row.code != null && row.code != ""
                                ? row.code
                                : "/"}
                            </TableCell>
                            <TableCell align="center">
                              {row.nameSurname != null && row.nameSurname != ""
                                ? row.nameSurname
                                : "/"}
                            </TableCell>
                            <TableCell align="center">
                              {row.address != null && row.address != ""
                                ? row.address
                                : "/"}
                            </TableCell>
                            <TableCell align="center">
                              {row.city != null && row.city != ""
                                ? row.city
                                : "/"}
                            </TableCell>
                            <TableCell align="center">
                              {row.country != null && row.country != ""
                                ? row.country
                                : "/"}
                            </TableCell>
                            <TableCell align="center">
                              {row.comment != null && row.comment != ""
                                ? row.comment
                                : "/"}
                            </TableCell>
                            <TableCell align="center">
                              {row.telephoneNumber != null &&
                              row.telephoneNumber != ""
                                ? row.telephoneNumber
                                : "/"}
                            </TableCell>
                            <TableCell align="center">
                              {row.price != null && row.price != ""
                                ? "€ " + row.price
                                : "/"}
                            </TableCell>
                            <TableCell align="center">
                              {row.createdDate != null && row.createdDate != ""
                                ? row.createdDate
                                : "/"}
                            </TableCell>
                            <TableCell align="center">
                              {row.method != null && row.method != ""
                                ? row.method
                                : "/"}
                            </TableCell>
                            <TableCell align="center">
                              {row.transportationPrice != null &&
                              row.transportationPrice != ""
                                ? "€ " + row.transportationPrice
                                : "/"}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Container>
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
      {openUsersForEquationDetails == true && usersForEquationDialog()}
      {openDetails == true && equationOrdersDialog()}
      <Container component="main" maxWidth="xl">
        <AppBar position="static" color="transparent">
          <Toolbar>
            <Typography component={"span"} variant={"h6"} sx={{ flexGrow: 1 }}>
              BARAZIMET
            </Typography>
          </Toolbar>
        </AppBar>
        <Button
          startIcon={<CurrencyExchangeIcon />}
          size="large"
          sx={buttonStyle}
          onClick={handleClickOpenUsersForEquationDetails}
        >
          Krijo barazim të ri
        </Button>
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
                    onClick={() =>
                      exportPDF("BARAZIMET", "equations", equations)
                    }
                  />
                </IconButton>

                <CSVLink data={equations} filename={"equations.csv"}>
                  <AnalyticsIcon sx={{ color: "gray" }} />
                </CSVLink>
                <TableRow>
                  <TableCell align="center">Totali i faturave</TableCell>
                  <TableCell align="center">Totali i parave</TableCell>
                  <TableCell align="center">Totali i refuzimeve</TableCell>
                  <TableCell align="center">Totali NET</TableCell>
                  <TableCell align="center">Totali i transportit</TableCell>
                  <TableCell align="center">Data</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {equations
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="center">
                        {row.totalOrders != null && row.totalOrders != ""
                          ? row.totalOrders
                          : "/"}
                      </TableCell>
                      <TableCell align="center">
                        {row.totalPrice != null && row.totalPrice != ""
                          ? row.totalPrice
                          : "/"}
                      </TableCell>
                      <TableCell align="center">
                        {row.totalOrderRejections != null
                          ? row.totalOrderRejections
                          : "/"}
                      </TableCell>
                      <TableCell align="center">
                        {row.totalNET != null && row.totalNET != ""
                          ? row.totalNET
                          : "/"}
                      </TableCell>
                      <TableCell align="center">
                        {row.totalTransportationCost != null &&
                        row.totalTransportationCost != ""
                          ? row.totalTransportationCost
                          : "/"}
                      </TableCell>

                      <TableCell align="center">
                        {row.createdDate != null && row.createdDate != ""
                          ? row.createdDate
                          : "/"}{" "}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          sx={{ p: "10px", color: "#01579b" }}
                          onClick={handleClickOpenDetails}
                        >
                          <ListIcon
                            onClick={(e) => getEquationOrders(e, row.id)}
                          />
                        </IconButton>
                      </TableCell>
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
            count={equations.length}
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

export default AdminClientsDraws;
