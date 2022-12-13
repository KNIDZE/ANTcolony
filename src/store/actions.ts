import { Dispatch } from 'redux';
import ACity from '../common/interfaces/ACity';

export default function addCitiesToStore(dispatch: Dispatch, cities: ACity[]): void {
  dispatch({ type: 'ADD_CITIES', payload: cities });
}
