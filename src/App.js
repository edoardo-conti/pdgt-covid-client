import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import clsx from "clsx";
// GUI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
// icons
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import TimelineIcon from "@material-ui/icons/Timeline";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DashboardIcon from "@material-ui/icons/Dashboard";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
// components
import Home from "./components/home";
import Signin from "./components/signin";
import Signup from "./components/signup";
import Users from "./components/users";
import TrendNazionale from "./components/trendNazionale";
import TrendRegionale from "./components/trendRegionale";
// helper
import { isAuthenticated } from "./helper";
// css
import "./App.css"

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function logOut() {
  // semplicemente elimino il token dal local storage del browser
  localStorage.removeItem("x-access-token");
}

function App() {
  // stili
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title} noWrap>
              pdgt-covid
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItemLink href="/">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Homepage" />
            </ListItemLink>
            <ListItemLink href="/trend/nazionale">
              <ListItemIcon>
                <TrendingUpIcon />
              </ListItemIcon>
              <ListItemText primary="Trend Nazionale" />
            </ListItemLink>
            <ListItemLink href="/trend/regionale">
              <ListItemIcon>
                <TimelineIcon />
              </ListItemIcon>
              <ListItemText primary="Trend Regionale" />
            </ListItemLink>
            {isAuthenticated() ? (
              <ListItemLink href="/utenti">
                <ListItemIcon>
                  <SupervisedUserCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Utenti" />
              </ListItemLink>
            ) : (
              ""
            )}
          </List>
          <Divider />
          {isAuthenticated() ? (
            ""
          ) : (
            <List>
              <ListItemLink href="/signin">
                <ListItemIcon>
                  <VpnKeyIcon />
                </ListItemIcon>
                <ListItemText primary="Accedi" />
              </ListItemLink>
              <ListItemLink href="/signup">
                <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary="Registrati" />
              </ListItemLink>
            </List>
          )}
          {isAuthenticated() ? (
            <List>
              <ListItem>
                {localStorage.getItem("login-admin") === "true" ? (
                  <ListItemIcon>
                    <VerifiedUserIcon />
                  </ListItemIcon>
                ) : (
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                )}
                <ListItemText
                  primary={localStorage.getItem("login-username")}
                  className='username-list-item'
                />
              </ListItem>
              <ListItemLink href="/" onClick={logOut}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Esci" />
              </ListItemLink>
            </List>
          ) : (
            ""
          )}
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
        </main>
      </div>
      <Route exact path="/" component={Home} />
      <Route exact path="/trend/nazionale" component={TrendNazionale} />
      <Route exact path="/trend/regionale" component={TrendRegionale} />
      <Route exact path="/utenti" component={Users} />
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/signup" component={Signup} />
    </Router>
  );
}

export default App;
