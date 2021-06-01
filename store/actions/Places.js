export const ADD_PLACE = 'ADD_PLACE';
import * as Constants from "../../helpers/Url";
import Place from '../../models/Place';


// export const addPlace = (title,imageUri) => {
//   return { type: ADD_PLACE, placeData: { title,imageUri } };
// };

export const GET_PLACES_DATA = "GET_PLACES_DATA";

export const getPlaces = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(Constants.URL_API + "/GetPlacesData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          placesId: "",
        }),
      });
      if (!response.ok) {
        const errorResData = await response.json();
        console.log(errorResData)
        const errorId = errorResData.error.message;
        let message = "Something went wrong!";

        throw new Error(message);
      }

      const resData = await response.json();
      console.log("PLACES DATA ", resData)

      dispatch({
        type: GET_PLACES_DATA,
        placeData: resData
      });
    } catch (err) {
      throw err;
    }
  };
};



export const addPlace = (title, imageUri) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(Constants.URL_API + "/AddPlacesData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: title,
          imageurl: imageUri
        }),
      });

      if (!response.ok) {
        const errorResData = await response.json();
        console.log(errorResData)
        const errorId = errorResData.error.message;
        let message = "Something went wrong!";

        throw new Error(message);
      }

      const resData = await response.json();
      console.log(resData, "PLACE DATA ADDED")

      // dispatch({
      //   type: ADD_PLACE,
      //   placeData: {title,imageUri}
      // });
    } catch (err) {
      throw err;
    }
  };
};