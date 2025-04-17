import React from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./PasswordGeneratorPage.module.css";

function FavoritesSidebar({ favorites, onCopy, onRemove }) {
  return (
    <Paper elevation={2} className={styles.sidebar}>
      <Typography variant="h6" className={styles.sidebarTitle}>
        Favorite Passwords
      </Typography>
      <List className={styles.favoritesList}>
        {favorites.map((pw, idx) => (
          <ListItem
            key={idx}
            divider
            secondaryAction={
              <>
                <IconButton size="small" onClick={() => onCopy(pw)}>
                  <ContentCopyIcon />
                </IconButton>
                <IconButton size="small" onClick={() => onRemove(pw)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={pw} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default FavoritesSidebar;
