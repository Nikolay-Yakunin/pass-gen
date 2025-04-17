import React, { useState, useEffect, useRef } from "react";
import styles from "./PasswordGeneratorPage.module.css";
import { Grid } from "@mui/material";
import PasswordCard from "../components/Password/PasswordCard";
import FavoritesSidebar from "./FavoritesSidebar";
import { generatePassword } from "../models/Password/password";

const complexityLevels = [
  { key: "low", label: "Low" },
  { key: "medium", label: "Medium" },
  { key: "high", label: "Hard" },
];

function PasswordGeneratorPage() {
  const [lengths, setLengths] = useState({ low: 12, medium: 12, high: 12 });
  const [passwords, setPasswords] = useState({ low: "", medium: "", high: "" });
  const [favorites, setFavorites] = useState([]);

  const copyRefs = {
    low: useRef(null),
    medium: useRef(null),
    high: useRef(null),
  };

  useEffect(() => {
    const favs = localStorage.getItem("passgen_favorites");
    if (favs) {
      setFavorites(JSON.parse(favs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("passgen_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleLengthChange = (level, value) => {
    setLengths((prev) => ({ ...prev, [level]: value }));
    setPasswords((prev) => ({
      ...prev,
      [level]: generatePassword(value, level),
    }));
    setTimeout(() => {
      copyRefs[level].current?.focus();
    }, 0);
  };

  useEffect(() => {
    setPasswords({
      low: generatePassword(lengths.low, "low"),
      medium: generatePassword(lengths.medium, "medium"),
      high: generatePassword(lengths.high, "high"),
    });
  }, []);

  const handleCopy = (pw) => {
    navigator.clipboard.writeText(pw);
  };

  const handleAddFavorite = (pw) => {
    if (!favorites.includes(pw) && pw) {
      setFavorites((prev) => [pw, ...prev]);
    }
  };

  const handleRemoveFavorite = (pw) => {
    setFavorites((prev) => prev.filter((item) => item !== pw));
  };

  return (
    <div className={styles.root}>
      <Grid container spacing={0} className={styles.mainGrid}>
        <div className={styles.cardsRow}>
          {complexityLevels.map((level) => (
            <PasswordCard
              key={level.key}
              title={level.label}
              length={lengths[level.key]}
              password={passwords[level.key]}
              onLengthChange={(value) => handleLengthChange(level.key, value)}
              onCopy={() => handleCopy(passwords[level.key])}
              onAddFavorite={() => handleAddFavorite(passwords[level.key])}
              isFavorite={favorites.includes(passwords[level.key])}
              copyButtonRef={copyRefs[level.key]}
            />
          ))}
        </div>
      </Grid>
      <FavoritesSidebar
        favorites={favorites}
        onCopy={handleCopy}
        onRemove={handleRemoveFavorite}
      />
    </div>
  );
}

export default PasswordGeneratorPage;
