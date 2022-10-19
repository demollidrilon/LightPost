import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeIcon from "@mui/icons-material/Home";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import AssessmentIcon from "@mui/icons-material/Assessment";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import * as auth from "../utils/Auth";
import httpClient from "../utils/AxiosConfig";

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
    ],
  },
];

const adminCategories = [
  {
    children: [
      {
        key: 6,
        id: "Klientët",
        icon: <PersonSearchIcon color="primary" />,
      },
      {
        key: 7,
        id: "Barazimet e Klientëve",
        icon: <PointOfSaleIcon color="primary" />,
      },
      {
        key: 8,
        id: "Raportet e Klientëve",
        icon: <AssessmentIcon color="primary" />,
      },
      {
        key: 9,
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
        key: 10,
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
    if (key === 1) history.push("/user-home");
    else if (key === 2) history.push("/user-register-order");
    else if (key === 3) history.push("/user-order-comments");
    else if (key === 4) history.push("/user-draws");
    else if (key === 5) history.push("/user-raports");
    else if (key === 6) history.push("/admin-clients");
    else if (key === 7) history.push("/admin-clients-draws");
    else if (key === 8) history.push("/admin-clients-raports");
    else if (key === 9) history.push("/admin-clients-orders");
    else if (key === 10) history.push("/driver-orders");
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
    const headers = {
      ApiKey: "a9dfaq8d0cf3-4r53-42c3-9fq0-1ee7e3rd",
      "Content-Type": "application/json",
    };

    await httpClient
      .post(`/roles?id=${auth.getId()}`, { headers: headers })
      .then(
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
