import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Slider,
  TextField,
  Button,
} from "@mui/material";
import styles from "./PasswordCard.module.css";

function PasswordCard({
  title,
  length,
  password,
  onLengthChange,
  onCopy,
  onAddFavorite,
  isFavorite,
  copyButtonRef,
}) {
  return (
    <Card className={styles.card} elevation={3}>
      <CardContent>
        <Typography variant="h6" className={styles.cardTitle}>
          {title}
        </Typography>
        <Slider
          min={12}
          max={32}
          value={length}
          onChange={(_, value) => onLengthChange(value)}
          className={styles.slider}
        />
        <TextField
          value={password}
          slotProps={{ input: { readOnly: true } }}
          fullWidth
          className={styles.passwordField}
          variant="outlined"
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className={styles.copyButton}
          onClick={onCopy}
          disabled={!password}
          sx={{ mb: 1 }}
          ref={copyButtonRef}
        >
          Copy Me
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={onAddFavorite}
          disabled={!password || isFavorite}
        >
          В избранное
        </Button>
      </CardContent>
    </Card>
  );
}

export default PasswordCard;
