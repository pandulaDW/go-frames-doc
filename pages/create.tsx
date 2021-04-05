import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@material-ui/core";
import { Container, makeStyles } from "@material-ui/core";
import { Typography, TextField } from "@material-ui/core";
import { Radio, RadioGroup } from "@material-ui/core";
import { FormControl, FormLabel, FormControlLabel } from "@material-ui/core";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },

  radioGroup: {
    display: "block",
    marginBottom: 20,
  },
});

export default function Create() {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("money");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if (!title) setTitleError(true);
    if (!details) setDetailsError(true);

    if (title && details)
      fetch("http://localhost:8000/notes", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, details, category }),
      }).then(() => router.push("/"));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCategory(e.target.value);

  return (
    <Container>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        Create a New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          label="Note Title"
          variant="outlined"
          fullWidth
          required
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          error={titleError}
        />
        <TextField
          label="Details"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          required
          onChange={(e) => setDetails(e.target.value)}
          className={classes.field}
          error={detailsError}
        />

        <FormControl className={classes.radioGroup}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup value={category} row onChange={handleRadioChange}>
            {["money", "todos", "reminders", "work"].map((el, id) => (
              <FormControlLabel
                key={id}
                control={<Radio color="primary" />}
                label={el.slice(0, 1).toUpperCase() + el.slice(1)}
                value={el}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
