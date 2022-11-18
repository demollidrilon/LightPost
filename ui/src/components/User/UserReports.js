// eslint-disable
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
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
import httpClient from "../../utils/AxiosConfig";
import jsPDF from "jspdf";
import "jspdf-autotable";
import IconButton from "@mui/material/IconButton";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { CSVLink, CSVDownload } from "react-csv";
import AnalyticsIcon from "@mui/icons-material/Analytics";

const boxStyle = {
  marginTop: 6,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const buttonStyle = {
  mt: 0.9,
};

const UserReports = () => {
  var day = 1000 * 60 * 60 * 24;
  var week = day * 7;
  var month = day * 30;
  const [fromDateValue, setFromDateValue] = useState(
    dayjs(new Date().getTime() - month)
  );
  const [untilDateValue, setUntilDateValue] = useState(
    dayjs(new Date().getTime())
  );

  const [orderStatus, setOrderStatus] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [reports, setReports] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFromDateChange = (newValue) => {
    setFromDateValue(newValue);
  };

  const handleUntilDateChange = (newValue) => {
    setUntilDateValue(newValue);
  };

  const handleOrderStatusChange = (event) => {
    setOrderStatus(event.target.value);
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
        "NUMRI I POROSISE",
        "EMRI DHE MBIEMRI",
        "KOMENTI",
        "STATUSI",
        "QYTETI",
        "ADRESA",
        "KOHA E MODIFIKIMIT",
        "TOTALI I POROSISE",
        "KOSTO E DERGESES",
      ],
    ];

    const data = dataToExport.map((elt) => [
      elt.id,
      elt.nameSurname,
      elt.comment,
      elt.status,
      elt.city,
      elt.address,
      elt.lastUpdate,
      elt.price,
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

  const getData = async (orderStatus, fromDate, untilDate) => {
    await httpClient
      .get(
        `/orders?statusId=${orderStatus}&fromDate=${fromDate}&untilDate=${untilDate}`
      )
      .then((res) => {
        setReports(res.data.response.data);
      });
  };

  useEffect(() => {
    const data = {
      FromDate: fromDateValue.format("MM/DD/YYYY"),
      UntilDate: untilDateValue.format("MM/DD/YYYY"),
    };

    getData(1, data.FromDate, data.UntilDate);
  }, []);

  const search = async (event) => {
    event.preventDefault();
    const headers = {
      ApiKey: "a9dfaq8d0cf3-4r53-42c3-9fq0-1ee7e3rd",
      "Content-Type": "application/json",
    };

    const data = {
      FromDate: fromDateValue.format("MM/DD/YYYY"),
      UntilDate: untilDateValue.format("MM/DD/YYYY"),
      OrderStatus: orderStatus,
    };

    getData(data.OrderStatus, data.FromDate, data.UntilDate);
  };

  return (
    <Container component="main" maxWidth="xl">
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography component={"span"} variant={"h6"} sx={{ flexGrow: 1 }}>
            RAPORTI I SHITJEVE
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={boxStyle}>
        <Box>
          <Grid container spacing={1} columns={30}>
            <Grid item xs={15}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Nga data:"
                  inputFormat="MM/DD/YYYY"
                  value={fromDateValue}
                  onChange={handleFromDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={15}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Deri me datën:"
                  inputFormat="MM/DD/YYYY"
                  value={untilDateValue}
                  onChange={handleUntilDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>

          <Grid container spacing={1} sx={{ mt: 2 }} columns={30}>
            <Grid item xs={15}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Statusi</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={orderStatus}
                  label="Statusi"
                  onChange={handleOrderStatusChange}
                >
                  <MenuItem value={1}>Të gjitha</MenuItem>
                  <MenuItem value={2}>Krijuar</MenuItem>
                  <MenuItem value={4}>Në dergim</MenuItem>
                  <MenuItem value={7}>Dorëzuar</MenuItem>
                  <MenuItem value={3}>Problematike</MenuItem>
                  <MenuItem value={5}>Refuzuar</MenuItem>
                  <MenuItem value={6}>Pranuar</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={15}>
              <Button
                variant="outlined"
                startIcon={<ManageSearchIcon />}
                size="large"
                fullWidth
                sx={buttonStyle}
                onClick={search}
              >
                Kërko
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Paper sx={{ width: "100%", overflow: "hidden", mt: 4 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <PictureAsPdfIcon
                  onClick={() => exportPDF("RAPORTET", "reports", reports)}
                />
              </IconButton>
              <CSVLink data={reports} filename={"reports.csv"}>
                <AnalyticsIcon sx={{ color: "gray" }} />
              </CSVLink>
              <TableRow>
                <TableCell align="center">Numri i Porosisë</TableCell>
                <TableCell align="center">Emri dhe Mbiemri</TableCell>
                <TableCell align="center">Komenti</TableCell>
                <TableCell align="center">Statusi</TableCell>
                <TableCell align="center">Qyteti</TableCell>
                <TableCell align="center">Adresa</TableCell>
                <TableCell align="center">Koha e modifikimit</TableCell>
                <TableCell align="center">Totali i porosisë</TableCell>
                <TableCell align="center">Kosto e dergesës</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports
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
                      {row.nameSurname != null && row.nameSurname != ""
                        ? row.nameSurname
                        : "/"}
                    </TableCell>
                    <TableCell align="center">
                      {row.comment != null && row.comment != ""
                        ? row.comment
                        : "/"}
                    </TableCell>
                    <TableCell align="center">
                      {row.status != null && row.status != ""
                        ? row.status
                        : "/"}
                    </TableCell>
                    <TableCell align="center">
                      {row.city != null && row.city != "" ? row.city : "/"}
                    </TableCell>

                    <TableCell align="center">
                      {row.address != null && row.address != ""
                        ? row.address
                        : "/"}
                    </TableCell>
                    <TableCell align="center">
                      {row.lastUpdate != null && row.lastUpdate != ""
                        ? row.lastUpdate
                        : "/"}
                    </TableCell>
                    <TableCell align="center">
                      {row.price != null && row.price != ""
                        ? row.price + " €"
                        : "/"}
                    </TableCell>
                    <TableCell align="center">
                      {2 != null && 2 != "" ? 2 : "/"}
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
          count={reports.length}
          rowsPerPage={[rowsPerPage]}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <ToastContainer />
    </Container>
  );
};

export default UserReports;
