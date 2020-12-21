import {
  GET_TIME_ACTIVITY_DATA,
  GET_ROW_FILTER,
  UPDATE_TICKET_ROW_DATA,
} from "../typeConstants";

export const getTicketActivityData = () => {
  return {
    type: GET_TIME_ACTIVITY_DATA,
  };
};
export const getRowFilterToEdit = (rowId) => {
  return {
    type: GET_ROW_FILTER,
    rowId: rowId,
  };
};
export const updateTicketRowData = (updatedRow) => {
  return {
    type: UPDATE_TICKET_ROW_DATA,
    updatedRow: updatedRow,
  };
};
