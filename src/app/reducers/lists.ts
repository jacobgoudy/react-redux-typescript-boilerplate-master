import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { ListActions } from 'app/actions/lists';
import { ListModel } from 'app/models/ListModel';

const initialState: RootState.ListState = [
  {
    id:1,
    name: 'Use Redux',
    list: [{id: 1, name:'Learn Typescript', completed:false, assign:"Not Assigned", notes:"Learn how to unit testing.", date:"07/21/2019"}, {id:2, name:'Add Lists', completed:false, assign:"Not Assigned", notes:"", date:"09/22/2019"}],
    completed: false,
    isSelected: false
  }
  ,{
    id:2,
    name:'Use Java',
    list: [{id: 1, name:'Haskell', completed:false, assign:"Jacob", notes:"Fake news", date:"11/23/2021"}, {id:2, name:'Python', completed:false, assign:"Not Assigned", notes:"Does this even matter.", date:"09/23/2020"}],
    completed: false,
    isSelected: false
  },
  {
    id:3,
    name:'Interns',
    list: [{id:1, name:'Zach', completed:false, assign:"Not Assigned", notes:"", date:"11/12/2019"}, {id:2, name:'Jacob', completed:false, assign:"Zach", notes:"temp", date:"12/30/2019"}],
    completed: false,
    isSelected: false
  }
];

export const listReducer = handleActions<RootState.ListState, ListModel>(
  {
    [ListActions.Type.ADD_LIST]: (state, action) => {
      state.map((list) => {
        list.isSelected = false;
      });
      //*
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
      //*/
    },
    [ListActions.Type.DELETE_LIST]: (state, action) => {
      let newState = state.filter((list) => list.id !== (action.payload as any));
      if ( newState[0] )
        newState[0].isSelected = true;
      return newState;
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
    //Adds a todo
    [ListActions.Type.ADD_TODO]: (state, action) => {
      if(action.payload && action.payload.name){
        let newState = state;
        //Finds the index of the selected list
        var index = newState.findIndex(x => x.isSelected === true);
        newState[index].list.push({
          //updates the list with the new todo by finding the largest id and adding one and assigning the text input to the name
          id: newState[index].list.reduce((max, list) => Math.max(list.id || 1, max), 0) + 1,
          name: action.payload.name as any,
          completed:false,
          assign:"Not Assigned",
          notes:"",
          date:"No due date"
        });
        return newState;
      }
      return state;
    },
    //Complete a todo
    [ListActions.Type.COMPLETE_TODO]: (state, action) => {
      let newState = state;
      //Finds the index of the selected list
      var index = newState.findIndex(x => x.isSelected === true);
      //gets the selected list and assign's its completed value to the opposite
      var selectedTodo = newState[index].list.findIndex(x => x.id === action.payload as any)
      newState[index].list[selectedTodo].completed = !newState[index].list[selectedTodo].completed
      return newState;
    },
    //delete Todo
    [ListActions.Type.DELETE_TODO]: (state, action) => {
      let newState = state;
      //Finds the index of the selected list
      var index = newState.findIndex(x => x.isSelected === true);
      //deletes the index from the list
      var selectedTodo = newState[index].list.findIndex(x => x.id === action.payload as any);
      newState[index].list.splice(selectedTodo,1);
      return newState;
    },
    [ListActions.Type.EDIT_LIST]: (state, action) => {
      console.log("editList ran");
      let newState = state;
      var index = newState.findIndex(x => x.isSelected === true);
      console.log(action.payload);

      var list = newState[index];
      if (!list || !action || !action.payload) {
        console.log("oof");
        return newState;
      } else {
        newState[index].name = action.payload.name;
        console.log("set name to: ",action.payload.name);
      }
      return newState;
    },
    //Completes all by going through each todo and assigning completed to true
    [ListActions.Type.COMPLETE_ALL]: (state, action) => {
      let newState = state;
      var index = newState.findIndex(x => x.isSelected === true);
      newState[index].list.map((x => (x.completed = true)));
      return newState
    },
    [ListActions.Type.EDIT_TODO]: (state, action) => {
      let newState = state;
      var index = newState.findIndex(x => x.isSelected === true);
      if(action.payload){
        const id = action.payload.id;
        var selectedTodo = newState[index].list.findIndex(x => x.id === id);
        var todo = newState[index].list[selectedTodo];
        if (!todo || !action || !action.payload) {
          console.log("oof");
          return newState;
        } else {
          newState[index].list[selectedTodo].name = action.payload.name;
          console.log("set name to: ",action.payload.name);
        }
      }
      return newState;
    },
    //Filters out everything that is completed
    [ListActions.Type.CLEAR_COMPLETED]: (state, action) => {
      let newState = state;
      var index = newState.findIndex(x => x.isSelected === true);
      newState[index].list = newState[index].list.filter(x => x.completed === false);
      return newState;
    },
    //Able to assign a todo
    [ListActions.Type.ASSIGN_TODO]: (state, action) => {
      let newState = state;
      var index = newState.findIndex(x => x.isSelected === true);
      if(action.payload){
        const id = action.payload.id;
        var selectedTodo = newState[index].list.findIndex(x => x.id === id);
        if(action.payload)newState[index].list[selectedTodo].assign = action.payload.name;
        console.log(newState[index].list[selectedTodo]);
      }
      return newState;
    },
    [ListActions.Type.ADD_NOTES]: (state, action) => {
      let newState = state;
      console.log(action.payload);
      var index = newState.findIndex(x => x.isSelected === true);
      if(action.payload){
        const id = action.payload.id;
        var selectedTodo = newState[index].list.findIndex(x => x.id === id);
        newState[index].list[selectedTodo].notes = action.payload.name;
        console.log(newState[index].list[selectedTodo]);
      }
      return newState;
    },
    [ListActions.Type.ADD_DATE]: (state, action) => {
      let newState = state;
      console.log(action.payload);
      var index = newState.findIndex(x => x.isSelected === true);
      if(action.payload){
        const id = action.payload.id;
        var selectedTodo = newState[index].list.findIndex(x => x.id === id);
        newState[index].list[selectedTodo].date = action.payload.name;
        console.log(newState[index].list[selectedTodo]);
      }
      return newState;
    }
  },
  initialState
);
