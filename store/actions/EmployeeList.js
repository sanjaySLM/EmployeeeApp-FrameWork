import * as Constants from "../../helpers/Url";
import Employee from '../../models/Employee';


export const ADD_EMPLOYEE = "SET_EMPLOYEE";
export const EDIT_EMPLOYEE = "EDIT_EMPLOYEE";
export const GET_EMPLOYEE = "GET_EMPLOYEE";
export const SEARCH_EMPLOYEE = "SEARCH_EMPLOYEE";





export const searchEmployee = (employeeName, pageNum) => {
  console.log('actionCreaterFunction',employeeName,pageNum)
  return async (dispatch, getState) => {
    try {
      const response = await fetch(Constants.URL_API + "/GetSearchedData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeName,
          pageNumber:pageNum,
          pageSize:10,
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
      console.log("SEARCHED_DATA",resData)

      if (resData.length >= 0){


      dispatch({
        type: SEARCH_EMPLOYEE,
        employeeDetail: resData,
      });
    }else{
      console.log('DATA COMPLETELY LOADED')
    }

    } catch (err) {
      throw err;
    }
  };
};


export const editEmployee = (id,name,gender,salary,dateOfJoin) => {
    return async (dispatch, getState) => {
      try {
        const response = await fetch(Constants.URL_API + "/EditEmployeeData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,name,gender,salary,dateOfJoin
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
        console.log("EDITED EMPLOYEE DATA",resData)
  
  
        // dispatch({
        //   type: EDIT_EMPLOYEE,
        //   employeeDetail: editedEmployee,
        // });

      } catch (err) {
        throw err;
      }
    };
  };

  export const addEmployee = (name,gender,salary,dateOfJoin) => {
    return async (dispatch, getState) => {
      try {
        const response = await fetch(Constants.URL_API + "/AddEmployeeData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,gender,salary,dateOfJoin
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
        console.log(resData,"EMPLOYEE DATA ADDED")
  
        // dispatch({
        //   type: ADD_EMPLOYEE,
        //   employeeDetail: employee,
        // });
      } catch (err) {
        throw err;
      }
    };
  };



  export const getEmployeeDetail = () => {
    return async (dispatch, getState) => {
      try {
        const response = await fetch(Constants.URL_API + "/GetEmployeeData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            empoyeeId: "",
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
        console.log("Employee_Data",resData)
  
        dispatch({
          type: GET_EMPLOYEE,
          employeeDetail: resData,
        });
      } catch (err) {
        throw err;
      }
    };
  };


