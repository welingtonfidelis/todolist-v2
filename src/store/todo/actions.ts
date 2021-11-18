import { TodoItemInterface } from "./model";
import {
  START_ITEM_ACTION_LOAD,
  START_LIST_LOAD,
  START_SAVE_LOAD,
  STOP_ITEM_ACTION_LOAD,
  STOP_LIST_LOAD,
  STOP_SAVE_LOAD,
  ADD_ITEM,
  UPDATE_LIST,
  UPDATE_ITEM,
  UPDATE_STATUS,
  REMOVE_ITEM,
} from "./types";

export const todoStartListLoading = () => ({
  type: START_LIST_LOAD,
});

export const todoStopListLoading = () => ({
  type: STOP_LIST_LOAD,
});

export const todoStartSaveLoading = () => ({
  type: START_SAVE_LOAD,
});

export const todoStopSaveLoading = () => ({
  type: STOP_SAVE_LOAD,
});

export const todoStartItemActionLoading = (payload: number) => ({
  type: START_ITEM_ACTION_LOAD,
  payload,
});

export const todoStopItemActionLoading = (payload: number) => ({
  type: STOP_ITEM_ACTION_LOAD,
  payload,
});

export const todoUpdateList = (payload: TodoItemInterface[]) => ({
  type: UPDATE_LIST,
  payload,
});

export const todoAddItem = (payload: TodoItemInterface) => ({
  type: ADD_ITEM,
  payload,
});

export const todoRemoveItem = (payload: { id: string }) => ({
  type: REMOVE_ITEM,
  payload,
});

export const todoUpdateItem = (payload: TodoItemInterface) => ({
  type: UPDATE_ITEM,
  payload,
});

export const todoUpdateStatusItem = (payload: {
  id: string;
  status: boolean;
}) => ({
  type: UPDATE_STATUS,
  payload,
});
