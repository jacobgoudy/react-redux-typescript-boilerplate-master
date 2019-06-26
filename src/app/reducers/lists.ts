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
          date: "6/27/2019"
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

        var dateArr = action.payload.name.split('/',3);
        console.log(dateArr);

        // Assigning year as a number
        var thisYear:number = (dateArr[2] as unknown) as number;
        newState[index].list[selectedTodo].year = (dateArr[2] as unknown) as number;
        var isLeapYear: boolean;
        if (((thisYear % 4 == 0) && !(thisYear % 100 == 0)) || (thisYear % 400 == 0)) {
          isLeapYear = true;
        } else {
          isLeapYear = false;
        }

        // Assigning number value to month
        switch (dateArr[0]) {
          case "1":
          case "01":
            newState[index].list[selectedTodo].month = 1;
            break;
          case "2":
          case "02":
            newState[index].list[selectedTodo].month = 2;
            break;
          case "3":
          case "03":
            newState[index].list[selectedTodo].month = 3;
            break;
          case "4":
          case "04":
            newState[index].list[selectedTodo].month = 4;
            break;
          case "5":
          case "05":
            newState[index].list[selectedTodo].month = 5;
          case "6":
          case "06":
            newState[index].list[selectedTodo].month = 6;
            break;
          case "7":
          case "07":
            newState[index].list[selectedTodo].month = 7;
            break;
          case "8":
          case "08":
            newState[index].list[selectedTodo].month = 8;
            break;
          case "9":
          case "09":
            newState[index].list[selectedTodo].month = 9;
            break;
          case "10":
            newState[index].list[selectedTodo].month = 10;
            break;
          case "11":
            newState[index].list[selectedTodo].month = 11;
            break;
          case "12":
            newState[index].list[selectedTodo].month = 12;
            break;
          default:
            newState[index].list[selectedTodo].month = 0;
        }
        // Assigning number value to day
        switch(dateArr[1]){
          case "1":
          case "01":
            newState[index].list[selectedTodo].day = 1;
            break;
          case "2":
          case "02":
            newState[index].list[selectedTodo].day = 2;
            break;
          case "3":
          case "03":
            newState[index].list[selectedTodo].day = 3;
            break;
          case "4":
          case "04":
            newState[index].list[selectedTodo].day = 4;
            break;
          case "5":
          case "05":
            newState[index].list[selectedTodo].day = 5;
          case "6":
          case "06":
            newState[index].list[selectedTodo].day = 6;
            break;
          case "7":
          case "07":
            newState[index].list[selectedTodo].day = 7;
            break;
          case "8":
          case "08":
            newState[index].list[selectedTodo].day = 8;
            break;
          case "9":
          case "09":
            newState[index].list[selectedTodo].day = 9;
            break;
          case "10":
            newState[index].list[selectedTodo].day = 10;
            break;
          case "11":
            newState[index].list[selectedTodo].day = 11;
            break;
          case "12":
            newState[index].list[selectedTodo].day = 12;
            break;
          case "13":
            newState[index].list[selectedTodo].day = 13;
            break;
          case "14":
            newState[index].list[selectedTodo].day = 14;
            break;
          case "15":
            newState[index].list[selectedTodo].day = 15;
            break;
          case "16":
            newState[index].list[selectedTodo].day = 16;
            break;
          case "17":
            newState[index].list[selectedTodo].day = 17;
            break;
          case "18":
            newState[index].list[selectedTodo].day = 18;
            break;
          case "19":
            newState[index].list[selectedTodo].day = 19;
            break;
          case "20":
            newState[index].list[selectedTodo].day = 20;
            break;
          case "21":
            newState[index].list[selectedTodo].day = 21;
            break;
          case "22":
            newState[index].list[selectedTodo].day = 22;
            break;
          case "23":
            newState[index].list[selectedTodo].day = 23;
            break;
          case "24":
            newState[index].list[selectedTodo].day = 24;
            break;
          case "25":
            newState[index].list[selectedTodo].day = 25;
            break;
          case "26":
            newState[index].list[selectedTodo].day = 26;
            break;
          case "27":
            newState[index].list[selectedTodo].day = 27;
            break;
          case "28":
            newState[index].list[selectedTodo].day = 28;
            break;
          case "29":
            if(newState[index].list[selectedTodo].month == 2 && !isLeapYear) {
              newState[index].list[selectedTodo].day = 28;
              console.log("Feb only has 28 days ya dingus!");
            } else {
              newState[index].list[selectedTodo].day = 29;
              console.log("It's a leap year!");
            }
            break;
          case "30":
            if(newState[index].list[selectedTodo].month == 2) {
              if(!isLeapYear) {
                newState[index].list[selectedTodo].day = 28
              } else {
                newState[index].list[selectedTodo].day = 29;
              }
            } else {
              newState[index].list[selectedTodo].day = 30;
            }
            break;
          case "31":
            if((newState[index].list[selectedTodo].month == 4) ||
               (newState[index].list[selectedTodo].month == 6) ||
               (newState[index].list[selectedTodo].month == 9) ||
               (newState[index].list[selectedTodo].month == 11)) {
              newState[index].list[selectedTodo].day = 30;
            } else if (newState[index].list[selectedTodo].month == 2) {
              if(!isLeapYear) {
                newState[index].list[selectedTodo].day = 28
              } else {
                newState[index].list[selectedTodo].day = 29;
              } 
            } else { 
              newState[index].list[selectedTodo].day = 31;
            }
            break;
          default:
            newState[index].list[selectedTodo].day = 0;
            break;
        }

        // Assigning day of the year as a number
        var dayCount: number = 0;
        var month: number = newState[index].list[selectedTodo].month as number;
        var day: number = newState[index].list[selectedTodo].day as number;
        var year: number = newState[index].list[selectedTodo].year as number;

        console.log("Month: ",month);
        console.log("Day: ",day);
        console.log("Year: ",year);
        
        if(month > 1)
          dayCount += 31;
        if(month > 2) {
          if(isLeapYear)
            dayCount += 29;
          else
            dayCount += 28;
        }
        if(month > 3)
          dayCount += 31;
        if(month > 4)
          dayCount += 30;
        if(month > 5)
          dayCount += 31;
        if(month > 6)
          dayCount += 30;
        if(month > 7)
          dayCount += 31;
        if(month > 8) 
          dayCount += 31;
        if(month > 9) 
          dayCount += 30;
        if(month > 10)
          dayCount += 31;
        if(month > 11)
          dayCount += 30;

        dayCount += day;

        newState[index].list[selectedTodo].dayOfYear = dayCount;

        console.log("Day of the year: ",dayCount);
      }
      return newState;
    }
  },
  initialState
);
