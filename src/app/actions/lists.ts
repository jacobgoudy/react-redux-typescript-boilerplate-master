import { createAction } from 'redux-actions';
import { ListModel } from 'app/models';

export namespace ListActions {
  export enum Type {
    ADD_LIST = 'ADD_LIST',
    EDIT_LIST = 'EDIT_LIST',
    DELETE_LIST = 'DELETE_LIST',
    COMPLETE_LIST = 'COMPLETE_LIST',
    SELECT_LIST = 'SELECT_LIST',
    ADD_TODO = 'ADD_TODO'
  }

  export const addList = createAction<PartialPick<ListModel, 'name'>>(Type.ADD_LIST);
  export const editList = createAction<PartialPick<ListModel, 'id'>>(Type.EDIT_LIST);
  export const deleteList = createAction<ListModel['id']>(Type.DELETE_LIST);
  export const completeList = createAction<ListModel['id']>(Type.COMPLETE_LIST);
  export const selectList = createAction<PartialPick<ListModel, 'id'>>(Type.SELECT_LIST);
  export const addTodo = createAction<PartialPick<ListModel, 'name'>>(Type.ADD_TODO);
}

export type ListActions = Omit<typeof ListActions, 'Type'>;
