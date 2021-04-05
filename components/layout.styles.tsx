import { makeStyles } from "@material-ui/core";

const drawerWidth = 240;

export const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#f9f9f9",
      width: "100%",
      padding: theme.spacing(3),
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
      },
    },
    menuButton: {
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
      marginRight: theme.spacing(2),
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerTitle: {
      padding: theme.spacing(1),
    },
    listRoot: {
      marginTop: theme.spacing(1),
    },
    root: {
      display: "flex",
    },
    active: {
      background: "#f4f4f4",
    },
    toolbar: theme.mixins.toolbar,
    appbar: {
      backgroundColor: theme.palette.grey["50"],
      color: theme.palette.grey["700"],
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
      },
    },
    date: {
      flexGrow: 1,
    },
    avatar: {
      marginLeft: theme.spacing(2),
    },
  };
});
