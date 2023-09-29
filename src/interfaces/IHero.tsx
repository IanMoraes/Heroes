import { IAppearance } from "./IAppearance";
import { IBiography } from "./IBiography";
import { IConnections } from "./IConnections";
import { IImages } from "./IImages";
import { IPowerstats } from "./IPowerstats";
import { IWork } from "./IWork";

export interface IHero {
  id: number;
  name: string;
  slug: string;
  powerstats: IPowerstats;
  appearance: IAppearance;
  biography: IBiography;
  work: IWork;
  connections: IConnections;
  images: IImages;
}
