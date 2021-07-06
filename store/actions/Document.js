import * as Constants from "../../helpers/Url";

export const GET_DOCUMENT = "GET_DOCUMENT";



export const addDocument = (name,uri) => {
  console.log(name,uri)
    return async (dispatch, getState) => {
      try {
        const response = await fetch(Constants.URL_API + "/AddDocument", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,uri
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
        console.log(resData,"DOCUMENT ADDED")
  
        // dispatch({
        //   type: ADD_EMPLOYEE,
        //   employeeDetail: employee,
        // });
      } catch (err) {
        throw err;
      }
    };
  };

  export const deleteDocument = (id) => {
    console.log(id)
      return async (dispatch, getState) => {
        try {
          const response = await fetch(Constants.URL_API + "/DeleteDocument", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id
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
          console.log(resData,"DOCUMENT DELETED")
        } catch (err) {
          throw err;
        }
      };
    };

  export const getDocumentList = () => {
    console.log('ACTION REACHED')
    return async (dispatch, getState) => {
      try {
        const response = await fetch(Constants.URL_API + "/GetDocument", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            employeeId: "test",
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
        console.log("DOCUMENT_LIST",resData)
  
        dispatch({
          type: GET_DOCUMENT,
          documentList: resData,
        });
      } catch (err) {
        throw err;
      }
    };
  };