"use client";
import React, { useState, useEffect } from "react";
import { Grid, Container, TextField } from "@mui/material";
import useHeroesStore from "@/stores/useHeroesStore";
import HeroesService from "@/services/HeroesService";
import Card from "@/components/Card";
import { IHero } from "@/interfaces/IHero";
import { IHeroes } from "@/interfaces/IHeroes";
import CompareModal from "@/components/CompareModal";
import { styled } from '@mui/material/styles';
export default function Home() {
  const heroesStore = useHeroesStore();
  const [filterText, setFilterText] = useState("");
  const [selectedHeroes, setSelectedHeroes] = useState<IHeroes>([]);
  const [openCompareModal, setOpenCompareModal] = useState<boolean>(false);

  useEffect(() => {
    HeroesService.getUsers().then((data) => {
      heroesStore.setHeroes(data);
    });
  }, []);

  const filteredHeroes = heroesStore.heroes.filter((hero) =>
    hero.name.toLowerCase().includes(filterText.toLowerCase())
  );

  useEffect(() => {
    if (selectedHeroes.length === 2) handleOpenCompareModal();
  }, [selectedHeroes]);

  const handleCardClick = (hero: IHero) => {
    if (selectedHeroes.length < 2) {
      if (!selectedHeroes.includes(hero)) {
        setSelectedHeroes([...selectedHeroes, hero]);
      } else {
        const updatedHeroes = selectedHeroes.filter(
          (selectedHero) => selectedHero !== hero
        );
        setSelectedHeroes(updatedHeroes);
      }
    }
  };

  const handleOpenCompareModal = () => {
    setOpenCompareModal(!openCompareModal);
  };

  const onCloseCompareModal = () => {
    handleOpenCompareModal();
    setSelectedHeroes([]);
  };
  
  return (
    <main>
      <Container>
        <TextField
          label="Filtrar por nome de herói"
          variant="outlined"
          fullWidth
          margin="normal"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          sx={{ input: { color: "#fafafa" } }}
        />
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {filteredHeroes.map((hero) => {
            return (
              <Card
                key={hero.id}
                hero={hero}
                selected={selectedHeroes.includes(hero)}
                onClick={() => handleCardClick(hero)}
              />
            );
          })}
        </Grid>
        <CompareModal
          heroes={selectedHeroes}
          open={openCompareModal}
          onClose={onCloseCompareModal}
        />
      </Container>
    </main>
  );
}
