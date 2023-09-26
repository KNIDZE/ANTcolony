import ACity from './ACity';

export interface OptionsProps {
  propsCities: ACity[];
  algorithm: string;
  cities: ACity[];
  alpha: number;
  beta: number;
  Q: number;
  evaporation: number;
  antsAmount: number;
}
