import { create, StateCreator } from 'zustand'
import { IHeroes } from '@/interfaces/IHeroes'

interface IHeroesStoreProps {
  heroes: IHeroes,
  setHeroes: (data: IHeroes) => void,
  removeAllHeroes: ()=>void
}

// Defina um StateCreator tipado
const createState: StateCreator<IHeroesStoreProps> = (set) => ({
  heroes: [],
  setHeroes: (data: IHeroes) => set({ heroes: data }),
  removeAllHeroes: () => set({ heroes: [] }),
});

const useHeroesStore = create(createState);

export default useHeroesStore;