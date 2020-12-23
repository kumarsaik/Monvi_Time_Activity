import {
  GET_TICKET_ACTIVITY_DATA,
  GET_ROW_FILTER,
  UPDATE_TICKET_ROW_DATA,
  GET_TICKET_DATA_SUCCESS,
} from "../typeConstants";

const INITIAL_STATE = {
  rows: [],
  filteredRow: [],
  timeActivityRowData: [
    {
      user_name: "Dummy",
      email: "xyz@gmail.com",
      ticket_id: "123456",
      ticket_content: "Not able to get the allowence",
      ticket_area: "Payrolle",
      ticket_attachments: null,
      comments: null,
      ticket_createddate: "2020-11-12",
      ticket_updateddate: null,
      ticket_status: "Raised",
      ticket_resolution: null,
      ticket_assignedto: "Lohith",
      ticket_createdby: "Sairamreddy",
    },
    {
      user_name: "Dummy",
      email: "xyz@gmail.com",
      ticket_id: "123456",
      ticket_content: "Not able to get the allowence",
      ticket_area: "Payrolle",
      ticket_attachments: null,
      comments: null,
      ticket_createddate: "2020-11-12",
      ticket_updateddate: null,
      ticket_status: "Raised",
      ticket_resolution: null,
      ticket_assignedto: "Rakesh",
      ticket_createdby: "Sairamreddy",
    },
  ],
};

const ticketActivityReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TICKET_ACTIVITY_DATA:
      return {
        ...state,
        rows: state.timeActivityRowData,
      };
    case GET_TICKET_DATA_SUCCESS:
      return {
        ...state,
        rows: action.response.data.result,
      };
    case GET_ROW_FILTER:
      return {
        ...state,
        filteredRow: rowFilterById(state.rows, action.rowId),
      };
    case UPDATE_TICKET_ROW_DATA:
      return {
        ...state,
        rows: updateRowValue(state.rows, action.updatedRow),
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
