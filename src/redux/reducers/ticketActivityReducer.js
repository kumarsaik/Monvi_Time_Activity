import {
  GET_TIME_ACTIVITY_DATA,
  GET_ROW_FILTER,
  UPDATE_TICKET_ROW_DATA,
} from "../typeConstants";

const INITIAL_STATE = {
  rows: [],
  filteredRow: [],
  timeActivityRowData: [
    {
      ticket_id: "9867888",
      ticket_assignedto: "Sai",
      ticket_createddate: "1-2-2020",
      ticket_status: "Open",
      user_name: "XYZ",
      email: "t@t.com",
      ticket_updateddate: "10-20-2020",
      ticket_content: "The The The",
    },
    {
      ticket_id: "9867899",
      ticket_assignedto: "Lohith",
      ticket_createddate: "3-7-2020",
      ticket_status: "Pending",
      user_name: "ABC",
      email: "test@test.com",
      ticket_updateddate: "10-20-2020",
      ticket_content: "The The The",
    },
  ],
};

const ticketActivityReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TIME_ACTIVITY_DATA:
      return {
        ...state,
        rows: state.timeActivityRowData,
      };
    case GET_ROW_FILTER:
      return {
        ...state,
        filteredRow: rowFilterById(state.timeActivityRowData, action.rowId),
      };
    case UPDATE_TICKET_ROW_DATA:
      return {
        ...state,
        timeActivityRowData: updateRowValue(
          state.timeActivityRowData,
          action.updatedRow
        ),
      };

    default:
      return state;
  }
};

const rowFilterById = (rowData, id) => {
  return rowData.filter((val) => val.ticket_id === id)[0];
};
const updateRowValue = (rowData, updatedRow) => {
  return rowData.map((val) =>
    val.ticket_id === updatedRow.ticket_id ? updatedRow : val
  );
};

export default ticketActivityReducer;
