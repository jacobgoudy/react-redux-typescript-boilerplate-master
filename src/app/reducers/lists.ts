import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { ListActions } from 'app/actions/lists';
import { ListModel } from 'app/models/ListModel';
import { TodoModel } from 'app/models/TodoModel';

const initialState: RootState.ListState = [
  {
    id: 1,
<<<<<<< HEAD
    list: [],
    name: 'Use Redux',
    completed: false
=======
    name: 'Use Redux',
    list: [{id: 1, text:'temp', completed:false}, {id:2, text:'fuck', completed:false}],
    completed: false,
<<<<<<< HEAD
    //isSelected: false
>>>>>>> a56cdf5ccdb97b809d7c1262794a45e3f6d47fa8
=======
    isSelected: true
  }
  ,{
    id:2,
    name:'Use Java',
    list: [{id: 1, text:'Haskell', completed:false}, {id:2, text:'Python', completed:false}],
    completed: false,
    isSelected: false
>>>>>>> 0be4477909cf9f148ac10f7c0d2779a77ac29321
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
              list: [],
              name: action.payload.name,
              isSelected: true
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
        return (list.id || 0) === action.payload.id ? { ...list, text: action.payload.name } : list;
      });
    },
    [ListActions.Type.COMPLETE_LIST]: (state, action) => {
      return state.map((list) =>
      list.id === (action.payload as any) ? { ...list, completed: !list.completed } : list
      );
    },
    // [ListActions.Type.SELECT_LIST]: (state, action) => {
    //   return state.filter((list) => list.completed === false);
    // }
  },
  initialState
);
