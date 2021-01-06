import {createContext, Dispatch} from 'react';
import {TActions} from './actions';
import {InitialState, TState} from './state';

export interface IContextProps {
  state: TState;
  dispatch: Dispatch<TActions>;
}

const Context = createContext<IContextProps>({
  dispatch: () => {},
  state: InitialState,
});

export default Context;