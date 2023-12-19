import { create } from 'zustand';
import cloneDeep from 'lodash/cloneDeep';
import { checkSolutionValidity, TCoordinates } from '~/lib/sudoku';

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
    handleSolutionInput: (val: string, coor: TCoordinates) => void;
  };
}

export const useSolutionStore = create<ISolutionStore>((set, get) => ({
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
    handleSolutionInput: (val, coor) => {
      const {
        state: { solution, invalidCoors },
        actions: {
          removeSolution,
          removeInvalidCoors,
          fillSolution,
          addInvalidCoors,
        },
      } = get();

      if (!val || val === '0') {
        removeSolution(coor);
      }
      if (parseInt(val) > 0) {
        // when input is valid, create coorStr
        // and check solution validity
        const coorStr = `${coor.x}${coor.y}`;
        const isSolutionForCellValid = checkSolutionValidity(
          val,
          coor,
          solution
        );

        // solution is invalid, and coordinate not stored in invalidCoors
        if (!isSolutionForCellValid && !invalidCoors.includes(coorStr)) {
          // store `coorStr` to `invalidCoors`
          addInvalidCoors(coorStr);
        }

        // solution is valid, but `coorStr` previously deemed as invalid
        if (isSolutionForCellValid && invalidCoors.includes(coorStr)) {
          // remove `coorStr` from `invalidCoors`
          // update `invalidCoors` value
          removeInvalidCoors(coorStr);
        }

        fillSolution(val, coor);
      }
    },
  },
}));
