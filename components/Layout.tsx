import React, { useState } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import MenuIcon from "@material-ui/icons/Menu";
import { Typography, Divider, Hidden, useTheme } from "@material-ui/core";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Drawer, AppBar, Toolbar, Avatar, IconButton } from "@material-ui/core";
import NoteIcon from "@material-ui/icons/Note";
import { AddCircleOutlined } from "@material-ui/icons";
import { useStyles } from "./layout.styles";

const Layout = ({ children }) => {
  const classes = useStyles();
  const router = useRouter();
  const menuItems = [
    {
      text: "My Notes",
      icon: <NoteIcon color="primary" />,
      path: "/",
    },
    {
      text: "Create Note",
      icon: <AddCircleOutlined color="primary" />,
      path: "/create",
    },
  ];

  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <React.Fragment>
      <Typography
        variant="h5"
        color="textSecondary"
        className={classes.drawerTitle}
      >
        Ninja Notes
      </Typography>
      <Divider />
      <List className={classes.listRoot}>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            button
            onClick={() => router.push(item.path)}
            className={router.pathname === item.path ? classes.active : null}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} elevation={2}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.date}>
            Today is the {format(new Date(), `do MMMM Y`)}
          </Typography>
          <Typography>Mario</Typography>
          <Avatar src="/mario-av.png" className={classes.avatar} />
        </Toolbar>
      </AppBar>
      <Hidden smUp implementation="css">
        <Drawer
          className={classes.drawer}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          className={classes.drawer}
          classes={{ paper: classes.drawerPaper }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
      <div className={classes.page}>
        <div className={classes.toolbar} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
