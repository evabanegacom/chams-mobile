import * as types from "../types"

const initialState = {
  data: [],
  loading: false,
  error: null,
}

const todoReducer = (state = initialState,action: any) => {
  const { type, payload, message } = action
  switch (type) {
    case types.GET_TODOS_BEGIN:
    case types.DELETE_TODOS_BEGIN:
    case types.EDIT_TODOS_BEGIN:
      return {
        data: [],
        loading: true,
        error: null,
      };

      case types.GET_TODOS_SUCCESS:
      case types.DELETE_TODOS_SUCCESS:
        return { ...state, data: payload, loading: false, error: null }

    case types.GET_TODOS_FAILURE:
      return { ...state, data: [], loading: false, error: message}

    case types.CREATE_TODOS_SUCCESS:
      return {...state,
        data: [...state.data, payload],
        loading: false,
        error: null
      }
    case types.EDIT_TODOS_SUCCESS:
      return {
        ...state,
        data: state.data.map((yourEntity: any) =>
          yourEntity.id === (payload).id
            ? (payload)
            : yourEntity
        ),
        loading: false,
        error: null,
      }
    // case YourEntityActionType.DELETE:
    //   return {
    //     ...state,
    //     data: state.data.filter(
    //       (yourEntity) => yourEntity.id !== (action.payload as number)
    //     ),
    //     loading: false,
    //   }
    default:
      return state
  }
}
export default todoReducer;