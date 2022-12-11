import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import * as auth from "../utils/Auth";
import httpClient from "../utils/AxiosConfig";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import AssessmentIcon from "@mui/icons-material/Assessment";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import SettingsIcon from "@mui/icons-material/Settings";
import "react-toastify/dist/ReactToastify.css";

const userCategories = [
  {
    children: [
      {
        key: 1,
        id: "Ballina",
        icon: <HomeIcon color="primary" />,
      },
      {
        key: 2,
        id: "Regjistro",
        icon: <ControlPointIcon color="primary" />,
      },
      {
        key: 3,
        id: "Komentet",
        icon: <ChatBubbleOutlineIcon color="primary" />,
      },
      { key: 4, id: "Barazimet", icon: <PointOfSaleIcon color="primary" /> },
      {
        key: 5,
        id: "Raporte",
        icon: <AssessmentIcon color="primary" />,
      },
      {
        key: 6,
        id: "Konfigurimet",
        icon: <SettingsIcon color="primary" />,
      },
    ],
  },
];

const adminCategories = [
  {
    children: [
      {
        key: 7,
        id: "Klientët",
        icon: <PersonSearchIcon color="primary" />,
      },
      {
        key: 8,
        id: "Barazimet e Klientëve",
        icon: <PointOfSaleIcon color="primary" />,
      },
      {
        key: 9,
        id: "Raportet e Klientëve",
        icon: <AssessmentIcon color="primary" />,
      },
      {
        key: 10,
        id: "Porosite e Klientëve",
        icon: <FormatListBulletedIcon color="primary" />,
      },
    ],
  },
];

const driverCategories = [
  {
    children: [
      {
        key: 11,
        id: "Porositë",
        icon: <FormatListBulletedIcon color="primary" />,
      },
    ],
  },
];

const item = {
  py: "8px",
  px: 6,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

export default function Navigator(props) {
  const [admin, setAdmin] = useState(null);
  const [driver, setDriver] = useState(null);
  const { ...other } = props;
  let history = useHistory();

  const Clicked = (id, key) => {
    if (key === 1) history.push("/userHome");
    else if (key === 2) history.push("/userRegisterOrder");
    else if (key === 3) history.push("/userOrderComments");
    else if (key === 4) history.push("/userDraws");
    else if (key === 5) history.push("/UserReports");
    else if (key === 6) history.push("/UserSettings");
    else if (key === 7) history.push("/adminClients");
    else if (key === 8) history.push("/adminClientsDraws");
    else if (key === 9) history.push("/AdminClientsReports");
    else if (key === 10) history.push("/adminClientsOrders");
    else if (key === 11) history.push("/driverOrders");
    else if (key <= 0 && key >= 10) {
      toast.info(
        "Ky shërbim është jashtë funksionit, shërbimi do të jetë i disponueshëm shumë shpejt!",
        {
          position: toast.POSITION.BOTTOM_CENTER,
        }
      );
    }
  };

  const getRoles = async (event) => {
    const body = {
      Id: JSON.parse(auth.getId()),
    };

    await httpClient.post("/roles", body).then(
      (res) => {
        setAdmin(res.data.response.data.isAdmin);
        setDriver(res.data.response.data.isDriver);
      },
      (error) => {
        toast.error("Diçka shkoi gabim, ju lutem provoni përsëri.", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        history.push("/");
        auth.clearLocalStorage();
      }
    );
  };

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        {admin == false && driver == false
          ? userCategories.map(({ id, children, key }) => (
              <Box key={key} sx={{ bgcolor: "#101F33" }}>
                {children.map(({ id: childId, icon, active, key }) => (
                  <ListItem disablePadding key={childId}>
                    <ListItemButton
                      selected={active}
                      sx={item}
                      onClick={() => Clicked(childId, key)}
                    >
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText>{childId}</ListItemText>
                    </ListItemButton>
                  </ListItem>
                ))}
              </Box>
            ))
          : admin == true
          ? adminCategories.map(({ id, children, key }) => (
              <Box key={key} sx={{ bgcolor: "#101F33" }}>
                {children.map(({ id: childId, icon, active, key }) => (
                  <ListItem disablePadding key={childId}>
                    <ListItemButton
                      selected={active}
                      sx={item}
                      onClick={() => Clicked(childId, key)}
                    >
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText>{childId}</ListItemText>
                    </ListItemButton>
                  </ListItem>
                ))}
              </Box>
            ))
          : driver == true
          ? driverCategories.map(({ id, children, key }) => (
              <Box key={key} sx={{ bgcolor: "#101F33" }}>
                {children.map(({ id: childId, icon, active, key }) => (
                  <ListItem disablePadding key={childId}>
                    <ListItemButton
                      selected={active}
                      sx={item}
                      onClick={() => Clicked(childId, key)}
                    >
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText>{childId}</ListItemText>
                    </ListItemButton>
                  </ListItem>
                ))}
              </Box>
            ))
          : null}
      </List>
      <ToastContainer />
    </Drawer>
  );
}
