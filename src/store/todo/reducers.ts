import { TodoListInterface } from "./model";
import {
  START_LIST_LOAD,
  START_SAVE_LOAD,
  STOP_LIST_LOAD,
  STOP_SAVE_LOAD,
  ADD_ITEM,
  START_ITEM_ACTION_LOAD,
  STOP_ITEM_ACTION_LOAD,
  UPDATE_LIST,
  UPDATE_ITEM,
  UPDATE_STATUS,
  REMOVE_ITEM,
} from "./types";

const initialState: TodoListInterface = {
  loadingList: false,
  loadingSave: false,
  list: [],
};

interface Action {
  type: string;
  payload: any;
}

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case START_LIST_LOAD: {
      const newState = { ...state, loadingList: true };

      return newState;
    }

    case STOP_LIST_LOAD: {
      const newState = { ...state, loadingList: false };

      return newState;
    }

    case START_SAVE_LOAD: {
      const newState = { ...state, loadingSave: true };

      return newState;
    }

    case STOP_SAVE_LOAD: {
      const newState = { ...state, loadingSave: false };

      return newState;
    }

    case START_ITEM_ACTION_LOAD: {
      const index = action.payload;
      const newList = state.list;
      newList[index] = { ...newList[index], loadingItemAction: true };
      const newState = { ...state, list: newList };

      return newState;
    }

    case STOP_ITEM_ACTION_LOAD: {
      const index = action.payload;
      const newList = state.list;
      newList[index] = { ...newList[index], loadingItemAction: false };
      const newState = { ...state, list: newList };

      return newState;
    }

    case UPDATE_LIST: {
      const newState = { ...state, list: action.payload };

      return newState;
    }

    case ADD_ITEM: {
      state.list.push(action.payload);

      return state;
    }

    case REMOVE_ITEM: {
      const { id } = action.payload;

      return {
        ...state,
        list: state.list.filter((item) => item.id !== id),
      };
    }

    case UPDATE_ITEM: {
      const todo = action.payload;
      const index = state.list.findIndex((item) => item.id === todo.id);

      state.list[index] = todo;

      return state;
    }

    case UPDATE_STATUS: {
      const { id, status } = action.payload;

      return {
        ...state,
        list: state.list.map((item) => {
          if (item.id === id) item.done = status;

          return item;
        }),
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
