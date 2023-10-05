import ACity from './ACity';
import ICoefficients from './ICoefficients';
import { IGeneticOptions } from './IGeneticOptions';

export interface OptionsProps {
  propsCities: ACity[];
  algorithm: 'ACO' | 'Brute' | 'Genetic';
  cities: ACity[];
  antCoefficients: ICoefficients;
  geneticOptions: IGeneticOptions;
}
