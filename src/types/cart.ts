import { Services } from "./services";

export interface Cart {
  items: Services[]
  totalPrice: number;
  totalDuration: number;
  funcionario: string;
}