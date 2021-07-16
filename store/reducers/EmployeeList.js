import {
  ADD_EMPLOYEE,
  EDIT_EMPLOYEE,
  GET_EMPLOYEE,
  SEARCH_EMPLOYEE,
} from '../actions/EmployeeList';

let dummydata = [
  {
    id: '1',
    name: 'sanjayy',
    gender: 'male',
    salary: 20000.21,
    dateOfJoin: '21/02/2011',
  },
];

const intialState = {
  employeeList: dummydata,
  employeeListSearched: [],
};

export default (state = intialState, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE:
      return {
        ...state,
        employeeList: state.employeeList.concat(action.employeeDetail),
      };
    case SEARCH_EMPLOYEE:
      const UpdatedSearcheddata = [...state.employeeListSearched];
      const updated = UpdatedSearcheddata.concat(action.employeeDetail);
      return {
        ...state,
        employeeListSearched: state.employeeListSearched.concat(
          action.employeeDetail,
        ),
        // employeeListSearched:updated
      };
    case GET_EMPLOYEE:
      return {
        ...state,
        employeeList: action.employeeDetail,
        employeeListSearched: [],
      };
    case EDIT_EMPLOYEE:
      const editedEmployeeIndex = state.employeeList.findIndex(
        (emp) => emp.id === action.employeeDetail.id,
      );
      const updatedEmployeeDetail = [...state.employeeList];
      updatedEmployeeDetail[editedEmployeeIndex] = action.employeeDetail;
      return {
        ...state,
        employeeList: updatedEmployeeDetail,
      };
  }
  return state;
};
