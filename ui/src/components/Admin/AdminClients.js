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

const boxStyle = {
  marginTop: 6,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const buttonStyle = {
  mt: 0.9,
};

const AdminClients = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [users, setUsers] = useState([]);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [role, setRole] = useState(null);
  const [status, setStatus] = useState(null);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleClickOpenDetails = () => {
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setSelectedUser(null);
    setOpenDetails(false);
  };

  const openSelectedUser = async (e, id) => {
    console.log(id);
    e.preventDefault();
    setSelectedUser(id);
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
        "SHFRYTEZUESI",
        "EMRI",
        "MBIEMRI",
        "NUMRI I TELEFONIT",
        "ADRESA",
        "QYTETI",
        "STATUSI",
      ],
    ];

    const data = dataToExport.map((elt) => [
      elt.id,
      elt.username,
      elt.name,
      elt.surname,
      elt.telephoneNumber,
      elt.address,
      elt.city,
      elt.enable,
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

  const headers = {
    ApiKey: "a9dfaq8d0cf3-4r53-42c3-9fq0-1ee7e3rd",
    "Content-Type": "application/json",
  };

  const getUsers = async () => {
    await httpClient
      .get("/UserDetails/users", { headers: headers })
      .then((res) => {
        setUsers(res.data.response.data);
      });
  };

  const changeUserRoleBody = {
    id: selectedUser,
    role: role,
  };

  const changeUserRole = async () => {
    await httpClient
      .post("/UserDetails/changeRole", changeUserRoleBody, {
        headers: headers,
      })
      .then((res) => {
        getUsers();
      });
  };

  const changeUserStatusBody = {
    id: selectedUser,
    status: status == 1 ? true : false,
  };

  const changeUserStatus = async () => {
    await httpClient
      .post("/UserDetails/changeStatus", changeUserStatusBody, {
        headers: headers,
      })
      .then((res) => {
        getUsers();
      });
  };

  const updateUserDetails = async () => {
    console.log(selectedUser, role, status);
    if (role != null) changeUserRole();

    if (status != null) changeUserStatus();

    handleCloseDetails();
  };

  useEffect(() => {
    getUsers();
    console.log(users);
  }, []);

  const userDetailsDialog = () => {
    return (
      <>
        <Container component="main" maxWidth="xs">
          n
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
                  Konfigurimet e përdoruesit
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
                  height: 250,
                  mt: 1,
                }}
              >
                <CardContent>
                  <Grid container spacing={1} columns={30}>
                    <Grid item xs={15} sx={{ mt: 2, fontSize: 14 }}>
                      NDRYSHO STATUSIN:
                    </Grid>
                    <Grid item xs={15} sx={{ mt: 2, fontSize: 14 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Statusi
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Statusi"
                          onChange={handleStatusChange}
                        >
                          <MenuItem value={1}>Aktiv</MenuItem>
                          <MenuItem value={0}>Jo aktiv</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Divider />
                  <Grid container spacing={1} columns={30}>
                    <Grid item xs={15} sx={{ mt: 2, fontSize: 14 }}>
                      NDRYSHO ROLIN:
                    </Grid>
                    <Grid item xs={15} sx={{ mt: 2, fontSize: 14 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Roli
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Roli"
                          onChange={handleRoleChange}
                        >
                          <MenuItem value={0}>Admin</MenuItem>
                          <MenuItem value={1}>Shofer</MenuItem>
                          <MenuItem value={2}>Klient</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Button
                    sx={{ float: "right", mt: 2 }}
                    type="submit"
                    variant="contained"
                    onClick={() => {
                      updateUserDetails();
                    }}
                  >
                    Ndrysho
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
      {openDetails == true && userDetailsDialog()}

      <Container component="main" maxWidth="xl">
        <AppBar position="static" color="transparent">
          <Toolbar>
            <Typography component={"span"} variant={"h6"} sx={{ flexGrow: 1 }}>
              KLIENTËT
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
                    onClick={() => exportPDF("RAPORTET", "users", users)}
                  />
                </IconButton>
                <CSVLink data={users} filename={"users.csv"}>
                  <AnalyticsIcon sx={{ color: "gray" }} />
                </CSVLink>
                <TableRow>
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="center">Shfrytëzuesi</TableCell>
                  <TableCell align="center">Emri</TableCell>
                  <TableCell align="center">Mbiemri</TableCell>
                  <TableCell align="center">Numri i telefonit</TableCell>
                  <TableCell align="center">Adresa</TableCell>
                  <TableCell align="center">Qyteteti</TableCell>
                  <TableCell align="center">Roli</TableCell>
                  <TableCell align="center">Statusi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
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
                        {row.username != null && row.username != ""
                          ? row.username
                          : "/"}
                      </TableCell>
                      <TableCell align="center">
                        {row.name != null && row.name != "" ? row.name : "/"}
                      </TableCell>
                      <TableCell align="center">
                        {row.surname != null && row.surname != ""
                          ? row.surname
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
                        {row.isAdmin
                          ? "Admin"
                          : row.isDriver
                          ? "Shofer"
                          : "Klient"}
                      </TableCell>
                      <TableCell align="center">
                        {row.enable == 1 ? "Aktiv" : "Jo aktiv"}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          sx={{ p: "10px", color: "#01579b" }}
                          onClick={handleClickOpenDetails}
                        >
                          <ListIcon
                            onClick={(e) => openSelectedUser(e, row.id)}
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
            count={users.length}
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

export default AdminClients;
