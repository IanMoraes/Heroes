import React from "react";
import { IHeroes } from "@/interfaces/IHeroes";
import {
  Slide,
  Grid,
  DialogTitle,
  Dialog,
  DialogContent,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { TransitionProps } from "@mui/material/transitions";

interface ICompareModalProps {
  onClose: () => void;
  open: boolean;
  heroes: IHeroes;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CompareModal({
  onClose,
  open,
  heroes,
}: ICompareModalProps) {
  if (!heroes || heroes.length !== 2) {
    return null; // Ou renderize uma mensagem de erro
  }

  const hero1PowerSum = Object.values(heroes[0].powerstats).reduce(
    (acc, val) => acc + parseInt(val),
    0
  );

  const hero2PowerSum = Object.values(heroes[1].powerstats).reduce(
    (acc, val) => acc + parseInt(val),
    0
  );

  let winner = null;

  if (hero1PowerSum > hero2PowerSum) {
    winner = heroes[0];
  } else if (hero2PowerSum > hero1PowerSum) {
    winner = heroes[1];
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { background: "#25262b", color: "#afafaf" } }}
      TransitionComponent={Transition}
    >
      <DialogTitle>Comparar Heróis</DialogTitle>

      <DialogContent>
        <Typography
          fontWeight={"bold"}
          sx={{ marginBottom: 2, color: "green" }}
        >
          {winner ? `Ganhador: ${winner.name}!` : "Empate"}
        </Typography>

        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid item key={heroes[0].id} sx={{ textAlign: "center" }} >
            <img
              width={200}
              height={200}
              alt="Picture of the hero"
              src={heroes[0].images.lg}
              style={{ borderRadius: 4, marginBottom: "8px" }}
            />
            <Typography variant="h6">{heroes[0].name}</Typography>
            <Typography variant="h6">Total:{hero1PowerSum}</Typography>
            {Object.entries(heroes[0].powerstats).map(([stat, value]) => (
              <Typography key={stat}>
                {stat.toUpperCase()}: {value}
                {value > heroes[1].powerstats[stat] ? (
                  <KeyboardDoubleArrowUpIcon />
                ) : value < heroes[1].powerstats[stat] ? (
                  <KeyboardDoubleArrowDownIcon />
                ) : null}
              </Typography>
            ))}
          </Grid>

          <Grid item sx={{ textAlign: "center", color: "red" }} xs={12} md={1}>
            <Typography variant="h3">X</Typography>
          </Grid>
          <Grid item key={heroes[1].id} sx={{ textAlign: "center" }} >
            <img
              width={200}
              height={200}
              alt="Picture of the hero"
              src={heroes[1].images.lg}
              style={{ borderRadius: 4, marginBottom: "8px" }}
            />
            <Typography variant="h6">{heroes[1].name}</Typography>
            <Typography variant="h6">Total: {hero2PowerSum}</Typography>
            {Object.entries(heroes[1].powerstats).map(([stat, value]) => (
              <Typography key={stat}>
                {stat.toUpperCase()}: {value}
                {value > heroes[0].powerstats[stat] ? (
                  <KeyboardDoubleArrowUpIcon />
                ) : value < heroes[0].powerstats[stat] ? (
                  <KeyboardDoubleArrowDownIcon />
                ) : null}
              </Typography>
            ))}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
}
