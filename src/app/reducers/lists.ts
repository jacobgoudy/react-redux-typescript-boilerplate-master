import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { ListActions } from 'app/actions/lists';
import { ListModel } from 'app/models/ListModel';

const initialState: RootState.ListState = [
  {
    id:1,
    name: 'Use Redux',
    list: [{id: 1, text:'temp', completed:false}, {id:2, text:'frick', completed:false}],
    completed: false,
    isSelected: true
  }
  ,{
    id:2,
    name:'Use Java',
    list: [{id: 1, text:'Haskell', completed:false}, {id:2, text:'Python', completed:false}],
    completed: false,
    isSelected: false
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
    [ListActions.Type.ADD_TODO]: (state, action) => {
      let newState = state;
      (newState[1].list.push({
        text:'temp',
        id:2,
        completed:true
      }));
      //console.log(newState);
      //console.log(newState);
      // if (action.payload && action.payload.name) {
      //   return [...state,

      //     {name:'Use Redux',
      //       id:1,
      //       isSelected:true,
      //       completed:false,
      //       list:[{
      //       id: state.reduce((max, list) => Math.max(list.id || 1, max), 0) + 1,
      //       completed: false,
      //       text: 'temp',
      //     }]
      //     },
      //     ...state
      //   ];
      return newState;
      // }
    }
  },
  initialState
);
