/* eslint-disable */
import ACity from '../common/interfaces/ACity';
import {Reducer} from "redux";

const initialState = {
  cities: [],
  bestPath: [],
  move: false,
  algorithm: 'brute',
  antCoefficients: {
    alpha: 0,
    beta: 0,
    Q: 0,
    evaporation: 0,
    antsAmount: 0
  },
  geneticOptions: {
    populationSize: 1,
    generationAmount: 1,
    mutationAmount: 1,
  }

};

export default function reducer(state = initialState, action: { type: string; payload?: any }) {
  switch (action.type) {
    case "ADD_CITIES":
      return {...state,
      cities: action.payload};
    case "SET_BEST_WAY":
      return {...state,
        bestPath: action.payload}
    case "SET_ANT_MOVE":
      return {...state,
      move: action.payload}
    case "SET_ALGORITHM":
      return {...state,
        algorithm: action.payload}
    case "SET_COEFFICIENTS":
      return {...state,
        antCoefficients: action.payload}
    case "SET_GENETIC_OPTIONS":
      return {...state,
        geneticOptions: action.payload}
    default: {
      return { ...state, ...action.payload };
    }
  }
}
