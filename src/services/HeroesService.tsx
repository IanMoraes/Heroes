import api from "../dependencies/api";
import { IHeroes } from "@/interfaces/IHeroes";

class HeroesService {
  async getUsers(param?: string): Promise<IHeroes> {
    let heroes: IHeroes = [];

    try {
      const response = await api.get('');
      heroes = response.data;
      return heroes;
    } catch (error) {
      return heroes;
    }
  }
}

export default new HeroesService();