// eslint-disable
import React, { useState, useEffect } from "react";
import httpClient from "../../utils/AxiosConfig";
import * as auth from "../../utils/Auth";
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
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import ListIcon from "@mui/icons-material/List";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const DriverOrders = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orders, setOrders] = useState([]);
  const [openDetails, setOpenDetails] = useState(false);
  const [clickedOrderDetails, setClickedOrderDetails] = useState([]);
  const [comment, setComment] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);

  const handleClickOpenDetails = () => {
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setClickedOrderDetails([]);
    setOpenDetails(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    await httpClient
      .get(`/orders/allOrders?driverId=${auth.getId()}`)
      .then((res) => {
        setOrders(res.data.response.data);
      });
  };

  const getOrderDetails = async (e, code) => {
    e.preventDefault();
    await httpClient.get(`/orders/orderDetails?code=${code}`).then((res) => {
      setClickedOrderDetails(res.data.response.data);
    });
  };

  const handleOrderStatusChange = (event) => {
    setOrderStatus(event.target.value);
  };

  const changeOrderStatus = async () => {
    const body = {
      code: JSON.parse(clickedOrderDetails.code),
      statusId: JSON.parse(orderStatus),
      personelId: JSON.parse(auth.getId()),
    };
    await httpClient.post("/orders/addComment", body).then((res) => {
      getOrders();
    });
  };

  const addCommentToOrder = async () => {
    const body = {
      code: JSON.parse(clickedOrderDetails.code),
      statusId: JSON.parse(orderStatus),
      comment: comment,
      personelId: JSON.parse(auth.getId()),
    };
    await httpClient.post("/orders/addComment", body).then((res) => {
      getOrders();
    });
  };

  const updateOrder = async () => {
    if (comment != "" && comment != null) {
      addCommentToOrder();
    }

    if (orderStatus != null) {
      changeOrderStatus();
    }

    getOrders();
    handleCloseDetails();
  };

  const orderDetailsDialog = () => {
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
                  Detajet e porosisë
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
                  height: 600,
                  mt: 1,
                }}
              >
                <CardContent>
                  <Grid container spacing={1} columns={30}>
                    <Grid item xs={15} sx={{ mt: 2, fontSize: 14 }}>
                      POROSIA
                    </Grid>
                    <Grid item xs={15} sx={{ mt: 2, fontSize: 14 }}>
                      {clickedOrderDetails.code != null &&
                      clickedOrderDetails.code != ""
                        ? clickedOrderDetails.code
                        : "/"}
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid container spacing={1} columns={30}>
                    <Grid item xs={15} sx={{ mt: 2, fontSize: 14 }}>
                      PRANUESI
                    </Grid>
                    <Grid item xs={15} sx={{ mt: 2, fontSize: 14 }}>
                      {clickedOrderDetails.nameSurname != null &&
                      clickedOrderDetails.nameSurname != ""
                        ? clickedOrderDetails.nameSurname
                        : "/"}
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid container spacing={1} columns={30}>
                    <Grid item xs={15} sx={{ mt: 2, fontSize: 14 }}>
                      QYTETI
                    </Grid>
                    <Grid item xs={15} sx={{ mt: 2, fontSize: 14 }}>
                      {clickedOrderDetails.city != null &&
                      clickedOrderDetails.city != ""
                        ? clickedOrderDetails.city
                        : "/"}
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid container spacing={1} columns={30}>
                    <Grid item xs={15} sx={{ mt: 2, fontSize: 14 }}>
                      ADRESA
                    </Grid>
                    <Grid item xs={15} sx={{ mt: 2, fontSize: 14 }}>
                      {clickedOrderDetails.address != null &&
                      clickedOrderDetails.address != ""
                        ? clickedOrderDetails.address
                        : "/"}
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid container spacing={1} columns={30}>
                    <Grid item xs={15} sx={{ mt: 2, fontSize: 14 }}>
                      TELEFON
                    </Grid>
                    <Grid item xs={15} sx={{ mt: 2, fontSize: 14 }}>
                      {clickedOrderDetails.telephoneNumber != null &&
                      clickedOrderDetails.telephoneNumber != ""
                        ? clickedOrderDetails.telephoneNumber
                        : "/"}
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid container spacing={1} columns={30}>
                    <Grid item xs={15} sx={{ mt: 2, fontSize: 14 }}>
                      STATUS
                    </Grid>
                    <Grid item xs={15} sx={{ mt: 2, fontSize: 14 }}>
                      {clickedOrderDetails.status != null &&
                      clickedOrderDetails.status != ""
                        ? clickedOrderDetails.status
                        : "/"}
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid container spacing={1} columns={30}>
                    <Grid item xs={15} sx={{ mt: 2, fontSize: 14 }}>
                      ÇMIMI
                    </Grid>
                    <Grid item xs={15} sx={{ mt: 2, fontSize: 14 }}>
                      {clickedOrderDetails.price != null &&
                      clickedOrderDetails.price != ""
                        ? "€ " + clickedOrderDetails.price
                        : "/"}
                    </Grid>
                  </Grid>

                  <Divider />
                  <Grid container spacing={1} columns={30}>
                    <Grid item xs={15} sx={{ mt: 2, fontSize: 14 }}>
                      SHKRUAJ KOMENT:
                    </Grid>
                    <Grid item xs={15} sx={{ mt: 2, fontSize: 14 }}>
                      <TextField
                        disabled={
                          clickedOrderDetails.equationId != null &&
                          clickedOrderDetails.equationId != "" &&
                          clickedOrderDetails.equationId > 0
                        }
                        id="outlined-multiline-static"
                        label="Komenti "
                        multiline
                        rows={4}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </Grid>
                  </Grid>

                  <Divider />
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
                          disabled={
                            clickedOrderDetails.equationId != null &&
                            clickedOrderDetails.equationId != "" &&
                            clickedOrderDetails.equationId > 0
                          }
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Statusi"
                          onChange={handleOrderStatusChange}
                        >
                          <MenuItem value={2}>Krijuar</MenuItem>
                          <MenuItem value={4}>Në dergim</MenuItem>
                          <MenuItem value={7}>Dorëzuar</MenuItem>
                          <MenuItem value={3}>Problematike</MenuItem>
                          <MenuItem value={5}>Refuzuar</MenuItem>
                          <MenuItem value={6}>Pranuar</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Button
                    disabled={
                      clickedOrderDetails.equationId != null &&
                      clickedOrderDetails.equationId != "" &&
                      clickedOrderDetails.equationId > 0
                    }
                    sx={{ float: "right", mt: 2 }}
                    type="submit"
                    variant="contained"
                    onClick={() => {
                      updateOrder();
                    }}
                  >
                    Ndrysho
                  </Button>
                </CardContent>
              </Card>
              {clickedOrderDetails.equationId != null &&
                clickedOrderDetails.equationId != "" &&
                clickedOrderDetails.equationId > 0 && (
                  <Typography
                    component={"span"}
                    variant={"h7"}
                    sx={{ flexGrow: 1, color: "green" }}
                  >
                    Kjo porosi është barazuar! Id e barazimit të porosisë është:
                    {clickedOrderDetails.equationId}
                  </Typography>
                )}
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
      {openDetails == true && orderDetailsDialog()}
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography component={"span"} variant={"h6"} sx={{ flexGrow: 1 }}>
            Porositë
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper sx={{ width: "100%", overflow: "hidden", mt: 4 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Kodi</TableCell>
                <TableCell align="center">Emri dhe Mbiemri</TableCell>
                <TableCell align="center">Numri i Telefonit</TableCell>
                <TableCell align="center">Adresa</TableCell>
                <TableCell align="center">Qyteti</TableCell>
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
                      {row.telephoneNumber != null && row.telephoneNumber != ""
                        ? row.telephoneNumber
                        : "/"}
                    </TableCell>

                    <TableCell align="center">
                      {row.address != null && row.address != ""
                        ? row.address
                        : "/"}{" "}
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
                      {row.price != null && row.price != ""
                        ? row.price + "€"
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
                          onClick={(e) => getOrderDetails(e, row.code)}
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
          count={orders.length}
          rowsPerPage={[rowsPerPage]}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <ToastContainer />{" "}
    </>
  );
};

export default DriverOrders;
