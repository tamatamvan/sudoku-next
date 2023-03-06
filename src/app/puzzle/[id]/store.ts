import { create } from 'zustand';
import cloneDeep from 'lodash/cloneDeep';
import { TCoordinates } from '~/lib/sudoku';

interface ISolutionStore {
  state: {
    solution: string[][];
    invalidCoors: string[];
  };
  actions: {
    initializeSolution: (sudokuRows: string[][]) => void;
    fillSolution: (val: string, coor: TCoordinates) => void;
    removeSolution: (coor: TCoordinates) => void;
    addInvalidCoors: (coorStr: string) => void;
    removeInvalidCoors: (coorStr: string) => void;
  };
}

export const useSolutionStore = create<ISolutionStore>((set) => ({
  state: {
    solution: [],
    invalidCoors: [],
  },
  actions: {
    initializeSolution: (sudokuRows) => {
      set((store) => ({
        state: { ...store.state, solution: cloneDeep(sudokuRows) },
      }));
    },
    fillSolution: (val, coor) => {
      set((store) => {
        const updatedSolution = [...store.state.solution];
        updatedSolution[coor.x][coor.y] = val;

        return { state: { ...store.state, solution: updatedSolution } };
      });
    },
    removeSolution: (coor) => {
      set((store) => {
        const updatedSolution = [...store.state.solution];
        updatedSolution[coor.x][coor.y] = '.';

        return { state: { ...store.state, solution: updatedSolution } };
      });
    },
    addInvalidCoors: (coorStr) => {
      set((store) => {
        return {
          state: {
            ...store.state,
            invalidCoors: [...store.state.invalidCoors, coorStr],
          },
        };
      });
    },
    removeInvalidCoors: (coorStr) => {
      set((store) => {
        return {
          state: {
            ...store.state,
            invalidCoors: store.state.invalidCoors.filter(
              (coor) => coor !== coorStr
            ),
          },
        };
      });
    },
  },
}));
