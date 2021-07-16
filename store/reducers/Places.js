import {GET_PLACES_DATA, ADD_PLACE} from '../actions/Places';
import Place from '../../models/Place';
const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PLACES_DATA:
      return {
        places: action.placeData,
      };
    case ADD_PLACE:
      const newPlace = new Place(
        new Date().toString(),
        action.placeData.title,
        action.placeData.imageUri,
      );
      return {
        places: state.places.concat(newPlace),
      };
    default:
      return state;
  }
};
