import { User } from './user';
export class Messagerie {
  id?:string;
  texte?:string;
  emetteur:string;
  recepteur:string;
  date=Date.now();

}
