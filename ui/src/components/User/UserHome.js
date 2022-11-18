// eslint-disable
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TablePagination from "@mui/material/TablePagination";
import httpClient from "../../utils/AxiosConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ListIcon from "@mui/icons-material/List";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { CSVLink, CSVDownload } from "react-csv";
import AnalyticsIcon from "@mui/icons-material/Analytics";

const UserHome = () => {
  const [value, setValue] = useState(0);
  const [allOrders, setAllOrders] = useState([]);
  const [createdOrders, setCreatedOrders] = useState([]);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [unacceptedOrders, setUnacceptedOrders] = useState([]);
  const [toDeliverOrders, setToDeliverOrders] = useState([]);
  const [submittedOrders, setSubmittedOrders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [allOrdersPage, setAllOrdersPage] = useState(0);
  const [allOrdersRowsPerPage, setAllOrdersRowsPerPage] = useState(10);
  const [createdOrdersPage, setCreatedOrdersPage] = useState(0);
  const [createdOrdersRowsPerPage, setCreatedOrdersRowsPerPage] = useState(10);
  const [acceptedOrdersPage, setAcceptedOrdersPage] = useState(0);
  const [acceptedOrdersRowsPerPage, setAcceptedOrdersRowsPerPage] =
    useState(10);
  const [unacceptedOrdersPage, setUnacceptedOrdersPage] = useState(0);
  const [unacceptedOrdersRowsPerPage, setUnacceptedOrdersRowsPerPage] =
    useState(10);
  const [toDeliverOrdersPage, setToDeliverOrdersPage] = useState(0);
  const [toDeliverOrdersRowsPerPage, setToDeliverOrdersRowsPerPage] =
    useState(10);
  const [submittedOrdersPage, setSubmittedOrdersPage] = useState(0);
  const [submittedOrdersRowsPerPage, setSubmittedOrdersRowsPerPage] =
    useState(10);
  const [cancelledOrdersPage, setCancelledOrdersPage] = useState(0);
  const [cancelledOrdersRowsPerPage, setCancelledOrdersRowsPerPage] =
    useState(10);

  const handleAllOrdersChangePage = (event, newPage) => {
    setAllOrdersPage(newPage);
  };

  const handleAllOrdersChangeRowsPerPage = (event) => {
    setAllOrdersRowsPerPage(+event.target.value);
    setAllOrdersPage(0);
  };

  const handleCreatedOrdersChangePage = (event, newPage) => {
    setCreatedOrdersPage(newPage);
  };

  const handleCreatedOrdersChangeRowsPerPage = (event) => {
    setCreatedOrdersRowsPerPage(+event.target.value);
    setCreatedOrdersPage(0);
  };

  const handleAcceptedOrdersChangePage = (event, newPage) => {
    setAcceptedOrdersPage(newPage);
  };

  const handleAcceptedOrdersChangeRowsPerPage = (event) => {
    setAcceptedOrdersRowsPerPage(+event.target.value);
    setAcceptedOrdersPage(0);
  };

  const handleUnacceptedOrdersChangePage = (event, newPage) => {
    setUnacceptedOrdersPage(newPage);
  };

  const handleUnacceptedOrdersChangeRowsPerPage = (event) => {
    setUnacceptedOrdersRowsPerPage(+event.target.value);
    setUnacceptedOrdersPage(0);
  };

  const handleToDeliverOrdersChangePage = (event, newPage) => {
    setToDeliverOrdersPage(newPage);
  };

  const handleToDeliverOrdersChangeRowsPerPage = (event) => {
    setToDeliverOrdersRowsPerPage(+event.target.value);
    setToDeliverOrdersPage(0);
  };

  const handleSubmittedOrdersChangePage = (event, newPage) => {
    setSubmittedOrdersPage(newPage);
  };

  const handleSubmittedOrdersChangeRowsPerPage = (event) => {
    setSubmittedOrdersRowsPerPage(+event.target.value);
    setSubmittedOrdersPage(0);
  };

  const handleCancelledOrdersChangePage = (event, newPage) => {
    setCancelledOrdersPage(newPage);
  };

  const handleCancelledOrdersChangeRowsPerPage = (event) => {
    setCancelledOrdersRowsPerPage(+event.target.value);
    setCancelledOrdersPage(0);
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
        "ID",
        "STATUS",
        "KODI",
        "EMRI DHE MBIEMRI",
        "NUMRI I TELEFONIT",
        "ADRESA",
        "QYTETI",
        "ÇMIMI",
        "KOMENTI",
        "POSTIERI",
        "DATA E KRIJIMIT",
        "DATA E MODIFIKIMIT",
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
      elt.price,
      elt.comment,
      elt.driver,
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

  const columns = [
    { id: "Id" },
    { id: "Status" },
    { id: "Kodi" },
    { id: "Emri dhe Mbiemri" },
    { id: "Numri i Telefonit" },
    { id: "Adresa" },
    { id: "Qyteti" },
    { id: "Çmimi" },
    { id: "Komenti" },
    { id: "Postieri" },
    { id: "Data e Krijimit" },
    { id: "Data e Modifikimit" },
  ];

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  };

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = () => {
    fetchAllOrders(null, null, null);
    fetchCreatedOrders(null, 2, null);
    fetchAcceptedOrders(null, 6, null);
    fetchUnacceptedOrders(null, 3, null);
    fetchToDeliverOrders(null, 4, null);
    fetchSubmittedOrders(null, 7, null);
    fetchCancelledOrders(null, 5, null);
  };

  const fetchAllOrders = async (id, status, driver) => {
    await httpClient
      .get(`/orders?id=${""}&statusId=${""}&driver=${""}`)
      .then((res) => {
        setAllOrders(res.data.response.data);
      });
  };

  const fetchCreatedOrders = async (id, status, driver) => {
    await httpClient
      .get(`/orders?id=${""}&statusId=${status}&driver=${""}`)
      .then((res) => {
        setCreatedOrders(res.data.response.data);
      });
  };

  const fetchAcceptedOrders = async (id, status, driver) => {
    await httpClient
      .get(`/orders?id=${""}&statusId=${status}&driver=${""}`)
      .then((res) => {
        setAcceptedOrders(res.data.response.data);
      });
  };

  const fetchUnacceptedOrders = async (id, status, driver) => {
    await httpClient
      .get(`/orders?id=${""}&statusId=${status}&driver=${""}`)
      .then((res) => {
        setUnacceptedOrders(res.data.response.data);
      });
  };

  const fetchToDeliverOrders = async (id, status, driver) => {
    await httpClient
      .get(`/orders?id=${""}&statusId=${status}&driver=${""}`)
      .then((res) => {
        setToDeliverOrders(res.data.response.data);
      });
  };

  const fetchSubmittedOrders = async (id, status, driver) => {
    await httpClient
      .get(`/orders?id=${""}&statusId=${status}&driver=${""}`)
      .then((res) => {
        console.log(res);
        setSubmittedOrders(res.data.response.data);
      });
  };

  const fetchCancelledOrders = async (id, status, driver) => {
    await httpClient
      .get(`/orders?id=${""}&statusId=${status}&driver=${""}`)
      .then((res) => {
        setCancelledOrders(res.data.response.data);
      });
  };

  const deleteOrder = (e, id) => {
    e.preventDefault();
    console.log(id);
    console.log("delete");
  };

  return (
    <>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography component={"span"} variant={"h6"} sx={{ flexGrow: 1 }}>
            Ballina
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={value} onChange={handleTabChange} centered>
          <Tab
            label="TË GJITHA"
            sx={{
              fontFamily: "Monospace",
              color: "#bdbdbd",
            }}
          />
          <Tab
            label="KRIJUARA"
            sx={{
              fontFamily: "Monospace",
              color: "#37474f",
            }}
          />
          <Tab
            label="PRANUARA"
            sx={{
              fontFamily: "Monospace",
              color: "#ff9800",
            }}
          />
          <Tab
            label="PROBLEMATIKE"
            sx={{
              fontFamily: "Monospace",
              color: "#ba68c8",
            }}
          />
          <Tab
            label="NË DËRGIM"
            sx={{
              fontFamily: "Monospace",
              color: "#9e9d24",
            }}
          />
          <Tab
            label="DORËZUARA"
            sx={{
              fontFamily: "Monospace",
              color: "#4caf50",
            }}
          />
          <Tab
            label="REFUZUARA"
            sx={{
              fontFamily: "Monospace",
              color: "#ef5350",
            }}
          />
        </Tabs>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            m: "0 auto",
            mt: "1rem",
            mb: "1rem",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Filtro të dhënat"
            inputProps={{ "aria-label": "Filtro të dhënat" }}
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <TabPanel value={value} index={0}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <PictureAsPdfIcon
                    onClick={() =>
                      exportPDF("TË GJITHA POROSITË", "allOrders", allOrders)
                    }
                  />
                </IconButton>
                <CSVLink data={allOrders} filename={"allOrders.csv"}>
                  <AnalyticsIcon sx={{ color: "gray" }} />
                </CSVLink>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      sx={{ fontWeight: "bold", color: "#01579b" }}
                      key={column.id}
                      align={"center"}
                    >
                      {column.id}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {allOrders
                  .slice(
                    allOrdersPage * allOrdersRowsPerPage,
                    allOrdersPage * allOrdersRowsPerPage + allOrdersRowsPerPage
                  )
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
                        {row.price != null && row.price != ""
                          ? row.price + " €"
                          : "/"}
                      </TableCell>
                      <TableCell align="center">
                        {row.comment != null && row.comment != ""
                          ? row.comment
                          : "/"}
                      </TableCell>
                      <TableCell align="center">
                        {row.driver != null && row.driver != ""
                          ? row.driver
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
                        <IconButton sx={{ p: "10px", color: "#01579b" }}>
                          <ListIcon />
                        </IconButton>
                      </TableCell>
                      {row.status != null &&
                        row.status != "" &&
                        row.status == "KRIJUAR" && (
                          <TableCell align="center">
                            <IconButton
                              sx={{ p: "10px", color: "red " }}
                              onClick={(e) => deleteOrder(e, row.id)}
                            >
                              <HighlightOffIcon />
                            </IconButton>
                          </TableCell>
                        )}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              sx={{
                color: "#01579b",
                mt: 1,
              }}
              rowsPerPageOptions={["10", "25", "50", "100"]}
              component="div"
              count={allOrders.length}
              rowsPerPage={[allOrdersRowsPerPage]}
              page={allOrdersPage}
              onPageChange={handleAllOrdersChangePage}
              onRowsPerPageChange={handleAllOrdersChangeRowsPerPage}
            />
          </TableContainer>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <PictureAsPdfIcon
                    onClick={() =>
                      exportPDF(
                        "POROSITË E KRIJUARA",
                        "createdOrders",
                        createdOrders
                      )
                    }
                  />
                </IconButton>
                <CSVLink data={createdOrders} filename={"createdOrders.csv"}>
                  <AnalyticsIcon sx={{ color: "gray" }} />
                </CSVLink>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      sx={{ fontWeight: "bold", color: "#01579b" }}
                      key={column.id}
                      align={"center"}
                    >
                      {column.id}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {createdOrders
                  .slice(
                    createdOrdersPage * createdOrdersRowsPerPage,
                    createdOrdersPage * createdOrdersRowsPerPage +
                      createdOrdersRowsPerPage
                  )
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
                        {row.price != null && row.price != ""
                          ? row.price + " €"
                          : "/"}
                      </TableCell>
                      <TableCell align="center">
                        {row.comment != null && row.comment != ""
                          ? row.comment
                          : "/"}
                      </TableCell>
                      <TableCell align="center">
                        {row.driver != null && row.driver != ""
                          ? row.driver
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
                        <IconButton sx={{ p: "10px", color: "#01579b" }}>
                          <ListIcon />
                        </IconButton>
                      </TableCell>
                      {row.status != null &&
                        row.status != "" &&
                        row.status == "KRIJUAR" && (
                          <TableCell align="center">
                            <IconButton
                              sx={{ p: "10px", color: "red " }}
                              onClick={(e) => deleteOrder(e, row.id)}
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
            count={createdOrders.length}
            rowsPerPage={[createdOrdersRowsPerPage]}
            page={createdOrdersPage}
            onPageChange={handleCreatedOrdersChangePage}
            onRowsPerPageChange={handleCreatedOrdersChangeRowsPerPage}
          />
        </TabPanel>

        <TabPanel value={value} index={2}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <PictureAsPdfIcon
                    onClick={() =>
                      exportPDF(
                        "POROSITË E PRANUARA",
                        "acceptedOrders",
                        acceptedOrders
                      )
                    }
                  />
                </IconButton>
                <CSVLink data={acceptedOrders} filename={"acceptedOrders.csv"}>
                  <AnalyticsIcon sx={{ color: "gray" }} />
                </CSVLink>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      sx={{ fontWeight: "bold", color: "#01579b" }}
                      key={column.id}
                      align={"center"}
                    >
                      {column.id}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {acceptedOrders
                  .slice(
                    acceptedOrdersPage * acceptedOrdersRowsPerPage,
                    acceptedOrdersPage * acceptedOrdersRowsPerPage +
                      acceptedOrdersRowsPerPage
                  )
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
                        {row.price != null && row.price != ""
                          ? row.price + " €"
                          : "/"}
                      </TableCell>
                      <TableCell align="center">
                        {row.comment != null && row.comment != ""
                          ? row.comment
                          : "/"}
                      </TableCell>
                      <TableCell align="center">
                        {row.driver != null && row.driver != ""
                          ? row.driver
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
                        <IconButton sx={{ p: "10px", color: "#01579b" }}>
                          <ListIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              sx={{
                color: "#01579b",
                mt: 1,
              }}
              rowsPerPageOptions={["10", "25", "50", "100"]}
              component="div"
              count={acceptedOrders.length}
              rowsPerPage={[acceptedOrdersRowsPerPage]}
              page={acceptedOrdersPage}
              onPageChange={handleAcceptedOrdersChangePage}
              onRowsPerPageChange={handleAcceptedOrdersChangeRowsPerPage}
            />
          </TableContainer>
        </TabPanel>

        <TabPanel value={value} index={3}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <PictureAsPdfIcon
                    onClick={() =>
                      exportPDF(
                        "POROSITË ME PROBLEME",
                        "unacceptedOrders",
                        unacceptedOrders
                      )
                    }
                  />
                </IconButton>
                <CSVLink
                  data={unacceptedOrders}
                  filename={"unacceptedOrders.csv"}
                >
                  <AnalyticsIcon sx={{ color: "gray" }} />
                </CSVLink>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      sx={{ fontWeight: "bold", color: "#01579b" }}
                      key={column.id}
                      align={"center"}
                    >
                      {column.id}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {unacceptedOrders
                  .slice(
                    unacceptedOrdersPage * unacceptedOrdersRowsPerPage,
                    unacceptedOrdersPage * unacceptedOrdersRowsPerPage +
                      unacceptedOrdersRowsPerPage
                  )
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
                        {row.price != null && row.price != ""
                          ? row.price + " €"
                          : "/"}
                      </TableCell>
                      <TableCell align="center">
                        {row.comment != null && row.comment != ""
                          ? row.comment
                          : "/"}
                      </TableCell>
                      <TableCell align="center">
                        {row.driver != null && row.driver != ""
                          ? row.driver
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
                        <IconButton sx={{ p: "10px", color: "#01579b" }}>
                          <ListIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              sx={{
                color: "#01579b",
                mt: 1,
              }}
              rowsPerPageOptions={["10", "25", "50", "100"]}
              component="div"
              count={unacceptedOrders.length}
              rowsPerPage={[unacceptedOrdersRowsPerPage]}
              page={unacceptedOrdersPage}
              onPageChange={handleUnacceptedOrdersChangePage}
              onRowsPerPageChange={handleUnacceptedOrdersChangeRowsPerPage}
            />
          </TableContainer>
        </TabPanel>

        <TabPanel value={value} index={4}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <PictureAsPdfIcon
                    onClick={() =>
                      exportPDF(
                        "POROSITË NË DËRGIM",
                        "toDeliverOrders",
                        toDeliverOrders
                      )
                    }
                  />
                </IconButton>
                <CSVLink
                  data={toDeliverOrders}
                  filename={"toDeliverOrders.csv"}
                >
                  <AnalyticsIcon sx={{ color: "gray" }} />
                </CSVLink>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      sx={{ fontWeight: "bold", color: "#01579b" }}
                      key={column.id}
                      align={"center"}
                    >
                      {column.id}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {toDeliverOrders
                  .slice(
                    toDeliverOrdersPage * toDeliverOrdersRowsPerPage,
                    toDeliverOrdersPage * toDeliverOrdersRowsPerPage +
                      toDeliverOrdersRowsPerPage
                  )
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
                        {row.price != null && row.price != "" ? row.price : "/"}
                      </TableCell>
                      <TableCell align="center">
                        {row.comment != null && row.comment != ""
                          ? row.comment
                          : "/"}
                      </TableCell>
                      <TableCell align="center">
                        {row.driver != null && row.driver != ""
                          ? row.driver
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
                        <IconButton sx={{ p: "10px", color: "#01579b" }}>
                          <ListIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              sx={{
                color: "#01579b",
                mt: 1,
              }}
              rowsPerPageOptions={["10", "25", "50", "100"]}
              component="div"
              count={toDeliverOrders.length}
              rowsPerPage={[toDeliverOrdersRowsPerPage]}
              page={toDeliverOrdersPage}
              onPageChange={handleToDeliverOrdersChangePage}
              onRowsPerPageChange={handleToDeliverOrdersChangeRowsPerPage}
            />
          </TableContainer>
        </TabPanel>

        <TabPanel value={value} index={5}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <PictureAsPdfIcon
                    onClick={() =>
                      exportPDF(
                        "POROSITË E DOBËZUARA",
                        "submittedOrders",
                        submittedOrders
                      )
                    }
                  />
                </IconButton>
                <CSVLink
                  data={submittedOrders}
                  filename={"submittedOrders.csv"}
                >
                  <AnalyticsIcon sx={{ color: "gray" }} />
                </CSVLink>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      sx={{ fontWeight: "bold", color: "#01579b" }}
                      key={column.id}
                      align={"center"}
                    >
                      {column.id}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {submittedOrders
                  .slice(
                    submittedOrdersPage * submittedOrdersRowsPerPage,
                    submittedOrdersPage * submittedOrdersRowsPerPage +
                      submittedOrdersRowsPerPage
                  )
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
                        {row.price != null && row.price != ""
                          ? row.price + " €"
                          : "/"}
                      </TableCell>
                      <TableCell align="center">
                        {row.comment != null && row.comment != ""
                          ? row.comment
                          : "/"}
                      </TableCell>
                      <TableCell align="center">
                        {row.driver != null && row.driver != ""
                          ? row.driver
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
                        <IconButton sx={{ p: "10px", color: "#01579b" }}>
                          <ListIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              sx={{
                color: "#01579b",
                mt: 1,
              }}
              rowsPerPageOptions={["10", "25", "50", "100"]}
              component="div"
              count={submittedOrders.length}
              rowsPerPage={[submittedOrdersRowsPerPage]}
              page={submittedOrdersPage}
              onPageChange={handleSubmittedOrdersChangePage}
              onRowsPerPageChange={handleSubmittedOrdersChangeRowsPerPage}
            />
          </TableContainer>
        </TabPanel>

        <TabPanel value={value} index={6}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <PictureAsPdfIcon
                    onClick={() =>
                      exportPDF(
                        "POROSITË E REFUZUARA",
                        "cancelledOrders",
                        cancelledOrders
                      )
                    }
                  />
                </IconButton>
                <CSVLink
                  data={cancelledOrders}
                  filename={"cancelledOrders.csv"}
                >
                  <AnalyticsIcon sx={{ color: "gray" }} />
                </CSVLink>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      sx={{ fontWeight: "bold", color: "#01579b" }}
                      key={column.id}
                      align={"center"}
                    >
                      {column.id}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {cancelledOrders
                  .slice(
                    cancelledOrdersPage * cancelledOrdersRowsPerPage,
                    cancelledOrdersPage * cancelledOrdersRowsPerPage +
                      cancelledOrdersRowsPerPage
                  )
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
                        {row.price != null && row.price != ""
                          ? row.price + " €"
                          : "/"}
                      </TableCell>
                      <TableCell align="center">
                        {row.comment != null && row.comment != ""
                          ? row.comment
                          : "/"}
                      </TableCell>
                      <TableCell align="center">
                        {row.driver != null && row.driver != ""
                          ? row.driver
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
                        <IconButton sx={{ p: "10px", color: "#01579b" }}>
                          <ListIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              sx={{
                color: "#01579b",
                mt: 1,
              }}
              rowsPerPageOptions={["10", "25", "50", "100"]}
              component="div"
              count={cancelledOrders.length}
              rowsPerPage={[cancelledOrdersRowsPerPage]}
              page={cancelledOrdersPage}
              onPageChange={handleCancelledOrdersChangePage}
              onRowsPerPageChange={handleCancelledOrdersChangeRowsPerPage}
            />
          </TableContainer>
        </TabPanel>
        <ToastContainer />
      </Box>
    </>
  );
};

export default UserHome;
