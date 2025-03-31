import type { CardsListInterface } from '../../molecules/CardsList/CardsList.interface.ts'

export interface ColumnInterface {
  id: number;
  name: string;
  cardsList: CardsListInterface;
}