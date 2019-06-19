import { createAction } from 'redux-actions';
import { ListModel } from 'app/models';

export namespace ListActions {
  export enum Type {
    ADD_LIST = 'ADD_LIST',
    EDIT_LIST = 'EDIT_LIST',
    DELETE_LIST = 'DELETE_LIST',
    COMPLETE_LIST = 'COMPLETE_LIST',
    SELECT_LIST = 'SELECT_LIST',
    ADD_TODO = 'ADD_TODO',
    EDIT_TODO = 'EDIT_TODO',
    COMPLETE_TODO = 'COMPLETE_TODO',
    DELETE_TODO = 'DELETE_TODO',
    COMPLETE_ALL = 'COMPLETE_ALL',
    CLEAR_COMPLETED = 'CLEAR_COMPLETED',
    ASSIGN_TODO = 'ASSIGN_TODO',
    ADD_NOTES = 'ADD_NOTES',
    ADD_DATE = 'ADD_DATE'
  }

  export const addList = createAction<PartialPick<ListModel, 'name'>>(Type.ADD_LIST);
  export const editList = createAction<PartialPick<ListModel, 'id'>>(Type.EDIT_LIST);
  export const deleteList = createAction<ListModel['id']>(Type.DELETE_LIST);
  export const completeList = createAction<ListModel['id']>(Type.COMPLETE_LIST);
  export const completeAll = createAction(Type.COMPLETE_ALL);
  export const selectList = createAction<PartialPick<ListModel, 'id'>>(Type.SELECT_LIST);
  export const addTodo = createAction<PartialPick<ListModel, 'name'>>(Type.ADD_TODO);
  export const deleteTodo = createAction<ListModel['id']>(Type.DELETE_TODO);
  export const completeTodo = createAction<ListModel['id']>(Type.COMPLETE_TODO);
  export const editTodo = createAction<PartialPick<ListModel, 'id'>>(Type.EDIT_TODO);
  export const clearCompleted = createAction(Type.CLEAR_COMPLETED);
  export const assignTodo = createAction(Type.ASSIGN_TODO);
  export const addNotes = createAction(Type.ADD_NOTES);
  export const addDate = createAction(Type.ADD_DATE);
}

export type ListActions = Omit<typeof ListActions, 'Type'>;
