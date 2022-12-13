/* eslint-disable */
import ACity from '../common/interfaces/ACity';
import {Reducer} from "redux";

const initialState = {
  cities: [],
  bestPath: [],
};

export default function reducer(state = initialState, action: { type: string; payload?: any }) {
  switch (action.type) {
    case "ADD_CITIES":
      return {...state,
      cities: action.payload};
    case "SET_BEST_WAY":
      return {...state,
        bestPath: action.payload}
    default: {
      return { ...state, ...action.payload };
    }
  }
}
