import { Dispatch } from 'redux';
import ACity from '../common/interfaces/ACity';
import ICoefficients from '../common/interfaces/ICoefficients';

export function addCitiesToStore(dispatch: Dispatch, cities: ACity[]): void {
  dispatch({ type: 'ADD_CITIES', payload: cities });
}
export function setAlgorithm(dispatch: Dispatch, algorithm: string): void {
  dispatch({ type: 'SET_ALGORITHM', payload: algorithm });
}
export function setCoefficients(dispatch: Dispatch, coefficients: ICoefficients): void {
  dispatch({
    type: 'SET_COEFFICIENTS',
    payload: coefficients,
  });
}
