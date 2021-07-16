import * as Constants from "../../helpers/Url";

export const GET_HTML = "GET_HTML";





  export const getJsonData = (formId) => {
    console.log('ACTION REACHED')
    return async (dispatch, getState) => {
      try {
        const response = await fetch(Constants.URL_API +'/testing', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "rowusercode": 5,
            "formId":formId
          }),
        });
  
        if (!response.ok) {
          const errorResData = await response.json();
          console.log(errorResData )
          const errorId = errorResData.error.message;
          let message = "Something went wrong!";
  
          throw new Error(message);
        }
  
        const resData = await response.json();
        console.log("GOT RESPONSE")
  
        dispatch({
          type: GET_HTML,
          jsonData: resData[0].fldjsonschema,
        });
      } catch (err) {
        throw err;
      }
    };
  };