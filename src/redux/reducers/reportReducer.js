import { GET_REPORT_DATA } from "../typeConstants";

const INITIAL_STATE = {
  rows: [],
  rowData: [
    {
      activity: "11/01/2020",
      calories: "Cosmas Majachani",
      fat: "Off-Shore:No of Hours Worked",
      carbs: "student moduke",
      protein: 4.0,
      billable: "Yes",
    },
    {
      activity: "11/01/2020",
      calories: "Cosmas Majachani",
      fat: "Off-Shore:UI Services",
      carbs: "student moduke",
      protein: 6.0,
      billable: "Yes",
    },
    {
      activity: "11/01/2020",
      calories: "Cosmas Majachani",
      fat: "Off-Shore:No of Hours Worked",
      carbs: "student moduke",
      protein: 9.0,
      billable: "No",
    },
  ],
};

const reportReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_REPORT_DATA:
      return {
        ...state,
        rows: state.rowData,
      };

    default:
      return state;
  }
};

export default reportReducer;
