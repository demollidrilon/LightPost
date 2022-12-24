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
import * as auth from "../../utils/Auth";

const boxStyle = {
  marginTop: 6,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const buttonStyle = {
  mt: 0.9,
};

const UserOrderComments = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [comments, setComments] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    await httpClient
      .get(
        `/orders/orderComments?onlyComments=${true}&clientId=${auth.getId()}`
      )
      .then((res) => {
        setComments(res.data.response.data);
      });
  };

  return (
    <Container component="main" maxWidth="xl">
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography component={"span"} variant={"h6"} sx={{ flexGrow: 1 }}>
            KOMENTET
          </Typography>
        </Toolbar>
      </AppBar>

      <Paper sx={{ width: "100%", overflow: "hidden", mt: 4 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Numri i Porosisë</TableCell>
                <TableCell align="center">Emri dhe Mbiemri</TableCell>
                <TableCell align="center">Adresa</TableCell>
                <TableCell align="center">Qyteti</TableCell>
                <TableCell align="center">Data</TableCell>
                <TableCell align="center">Personeli</TableCell>
                <TableCell align="center">Koment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comments
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">
                      {row.orderCode != null && row.orderCode != ""
                        ? row.orderCode
                        : "/"}
                    </TableCell>
                    <TableCell align="center">
                      {row.name != null && row.name != "" ? row.name : "/"}
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
                      {row.createdDate != null && row.createdDate != ""
                        ? row.createdDate
                        : "/"}
                    </TableCell>

                    <TableCell align="center">
                      {row.personel != null && row.personel != ""
                        ? row.personel
                        : "/"}{" "}
                      {row.telephoneNumber != null && row.telephoneNumber != ""
                        ? row.telephoneNumber
                        : "/"}
                    </TableCell>
                    <TableCell align="center">
                      {row.comment != null && row.comment != ""
                        ? row.comment
                        : "/"}
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
          count={comments.length}
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

export default UserOrderComments;
