// eslint-disable
import React, { useState, useEffect } from "react";
import httpClient from "../../utils/AxiosConfig";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import CircularProgress from "@mui/material/CircularProgress";
import * as auth from "../../utils/Auth";

const UserRegisterOrder = (props) => {
  const history = useHistory();
  const [reciever, setReciever] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [price, setPrice] = useState("");
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createOrder = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    if (reciever == null || reciever == "") {
      toast.warn("Ju lutem shënoni pranuesin e porosisë!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setIsLoading(false);
      return;
    }
    if (country == null || country == "") {
      toast.warn("Ju lutem zgjedhni shtetin!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setIsLoading(false);
      return;
    }
    if (city == null || city == "") {
      toast.warn("Ju lutem shënoni qytetin!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setIsLoading(false);
      return;
    }
    if (address == null || address == "") {
      toast.warn("Ju lutem shënoni adresën!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setIsLoading(false);
      return;
    }
    if (phoneNumber == null || phoneNumber == "") {
      toast.warn("Ju lutem shënoni numrin e telefonit!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setIsLoading(false);
      return;
    }
    if (price == null || price == "") {
      toast.warn("Ju lutem shënoni çmimin për pagesë!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setIsLoading(false);
      return;
    }
    if (price != null || price != "") {
      if (!/^\d+\.\d+$|^\d+$/.test(price)) {
        toast.warn("Kjo kolonë pranon vetëm numra!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        setIsLoading(false);
        return;
      }
    }

    const orderBody = {
      NameSurname: reciever,
      CountryId: parseInt(country),
      City: city,
      Address: address,
      TelephoneNumber: phoneNumber,
      Price: parseFloat(price),
      Comment: comment,
      ClientId: JSON.parse(auth.getId()),
      StatusId: 1,
    };

    await httpClient.post("/orders", orderBody).then(
      (res) => {
        toast.success("Porosia u regjistrua me sukses!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        setIsLoading(false);
        history.push("/userHome");
      },
      (error) => {
        toast.error("Diçka shkoi gabim, ju lutem provoni përsëri.", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        setIsLoading(false);
      }
    );
  };

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
  const buttonStyle = {
    mt: 1,
    mb: 1,
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={boxStyle}>
        <Box style={{ color: "gray", fontSize: 19 }}>
          Regjistro porosi të re
        </Box>
        <Box component="form" noValidate>
          <TextField
            onChange={(e) => setReciever(e.target.value)}
            sx={{ mt: 1, mb: 1 }}
            fullWidth
            name="reciever"
            label="Pranuesi"
            type="text"
            id="reciever"
            autoFocus
          />
          <FormControl fullWidth sx={{ mt: 1, mb: 1 }}>
            <InputLabel id="demo-simple-select-label">Shteti</InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Statusi"
              onChange={(e) => setCountry(e.target.value)}
            >
              <MenuItem value={1}>Kosovë</MenuItem>
              <MenuItem value={2}>Shqipëri</MenuItem>
              <MenuItem value={3}>Macedoni</MenuItem>
            </Select>
          </FormControl>
          <TextField
            onChange={(e) => setCity(e.target.value)}
            sx={{ mt: 1, mb: 1 }}
            fullWidth
            name="city"
            label="Qyteti"
            type="text"
            id="city"
          />
          <TextField
            onChange={(e) => setAddress(e.target.value)}
            sx={{ mt: 1, mb: 1 }}
            fullWidth
            name="address"
            label="Adresa"
            type="text"
            id="address"
          />
          <TextField
            onChange={(e) => setPhoneNumber(e.target.value)}
            sx={{ mt: 1, mb: 1 }}
            fullWidth
            name="phoneNumber"
            label="Numri i telefonit"
            type="text"
            id="phoneNumber"
          />
          <TextField
            onChange={(e) => setPrice(e.target.value)}
            sx={{ mt: 1, mb: 1 }}
            fullWidth
            name="price"
            label="Çmimi"
            type="text"
            id="price"
          />
          <TextField
            onChange={(e) => setComment(e.target.value)}
            sx={{ mt: 1, mb: 1 }}
            fullWidth
            name="comment"
            label="Koment/Përshkrim"
            type="text"
            id="comment"
          />
          <TextField
            onChange={(e) => setComment(e.target.value)}
            sx={{ mt: 1, mb: 1 }}
            fullWidth
            name="transportationCost"
            label="Kosto e transportit"
            type="text"
            value={
              country == 0
                ? 0
                : country == 1
                ? 2
                : country == 2
                ? 5
                : country == 3
                ? 5
                : 2
            }
            id="transportationCost"
            disabled
          />
          {!isLoading ? (
            <Button
              onClick={createOrder}
              sx={buttonStyle}
              className="Button"
              type="submit"
              fullWidth
              variant="contained"
            >
              Krijo
            </Button>
          ) : (
            <CircularProgress sx={{ mt: 1 }} size={30} />
          )}
        </Box>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default UserRegisterOrder;
