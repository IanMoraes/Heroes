import React, { useState } from "react";
import { Paper, Grid, Typography, Box } from "@mui/material";
import { IHero } from "@/interfaces/IHero";

interface ICardProps {
  hero: IHero;
  selected:Boolean
  onClick:()=>void
}
export default function Card({hero,selected, onClick}: ICardProps) {
  return (
    <Grid item xs={12} sm={6} md={3} key={hero.id} onClick={onClick}>
      <Paper
        elevation={selected ? 16 : 1}
        sx={{
          cursor: "pointer",
          padding: 2,
          backgroundColor: selected ? "#131416" : "#1e1f22",
          color: "#afafaf",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          width={200}
          height={200}
          alt="Picture of the hero"
          src={hero.images.lg}
          style={{ borderRadius: 4, marginBottom: "8px" }}
        />
        <Typography fontWeight={"bold"}>{hero.name}</Typography>

        <Typography>#{hero.id}</Typography>
      </Paper>
    </Grid>
  );
}
