import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { ListActions } from 'app/actions/lists';
import { ListModel } from 'app/models/ListModel';

const initialState: RootState.ListState = [
  {
    id: 1,
    name: 'Use Redux',
    list: [],
    completed: false
  }
];

export const listReducer = handleActions<RootState.ListState, ListModel>(
  {
    [ListActions.Type.ADD_LIST]: (state, action) => {
        if (action.payload && action.payload.name) {
          return [
            {
              id: state.reduce((max, list) => Math.max(list.id || 1, max), 0) + 1,
              completed: false,
              list: action.payload.list,
              name: action.payload.name
            },
            ...state
          ];
        }
        return state;
      },
    [ListActions.Type.DELETE_LIST]: (state, action) => {
      return state.filter((list) => list.id !== (action.payload as any));
    },
    [ListActions.Type.EDIT_LIST]: (state, action) => {
      return state.map((list) => {
        if (!list || !action || !action.payload) {
          return list;
        }
<<<<<<< HEAD
        return (list.id || 0) === action.payload.id ? { ...list, name: action.payload.name } : list;
=======
        return (list.id || 0) === action.payload.id ? { ...list, text: action.payload.name } : list;
>>>>>>> 3a8b6c20a339982fd632ad4ab99900b3d3bc6817
      });
    },
    [ListActions.Type.COMPLETE_LIST]: (state, action) => {
      return state.map((list) =>
      list.id === (action.payload as any) ? { ...list, completed: !list.completed } : list
      );
    },
    [ListActions.Type.CLEAR_COMPLETED]: (state, action) => {
      return state.filter((list) => list.completed === false);
    }
  },
  initialState
);
