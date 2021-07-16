import {GET_HTML} from '../actions/Html';

const intialState = {
  jsonData: {},
};

export default (state = intialState, action) => {
  switch (action.type) {
    case GET_HTML:
      return {
        ...state,
        jsonData: action.jsonData,
      };
  }
  return state;
};
