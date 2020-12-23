import {
  GET_ROW_FILTER,
  UPDATE_TICKET_ROW_DATA,
  GET_TICKET_ACTIVITY_DATA,
  GET_TICKET_DATA_SUCCESS,
  GET_TICKET_DATA_FAILURE,
} from "../typeConstants";
import Axios from "axios";

export const getTicketActivityData = () => {
  return {
    type: GET_TICKET_ACTIVITY_DATA,
  };
};
export const getRowFilterToEdit = (rowId) => {
  return {
    type: GET_ROW_FILTER,
    rowId: rowId,
  };
};
export const updateTicketRowData = (updatedRow) => {
  return (dispatch) => {
    return Axios.put(
      `http://localhost:5000/ticket/${updatedRow.ticket_id}/`,
      updatedRow
    )
      .then(function(response) {
        dispatch({ type: UPDATE_TICKET_ROW_DATA, updatedRow });
        //setTicketRowData(response.data.result);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

export const getTicketRowData = () => {
  return (dispatch) => {
    // dispatch({ type: GET_TIME_ACTIVITY_DATA });
    return Axios.get("http://localhost:5000/ticket").then(
      (response) => dispatch({ type: GET_TICKET_DATA_SUCCESS, response }),
      (err) => dispatch({ type: GET_TICKET_DATA_FAILURE, err })
    );
  };
};
