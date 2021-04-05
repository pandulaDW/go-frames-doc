import React from "react";
import { Card, CardHeader, CardContent, Avatar } from "@material-ui/core";
import { makeStyles, Typography, IconButton } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { blue, green, pink, yellow } from "@material-ui/core/colors";

interface Note {
  category: string;
}

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (note: Note) => {
      switch (note.category) {
        case "work":
          return yellow[700];
        case "money":
          return green[400];
        case "todos":
          return pink[500];
        default:
          return blue[500];
      }
    },
  },
});

const NoteCard = ({ note, handleDelete }) => {
  const classes = useStyles(note);

  return (
    <Card elevation={2}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {note.category[0].toUpperCase()}
          </Avatar>
        }
        title={note.title}
        subheader={note.category}
        action={
          <IconButton onClick={() => handleDelete(note.id)}>
            <DeleteOutlinedIcon />
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {note.details}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
