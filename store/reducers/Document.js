import {GET_DOCUMENT} from '../actions/Document';

const intialState = {
  documentList: [],
};

export default (state = intialState, action) => {
  switch (action.type) {
    case GET_DOCUMENT:
      return {
        ...state,
        documentList: action.documentList,
      };
  }
  return state;
};
