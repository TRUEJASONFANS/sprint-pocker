import * as request from '../../../utils/request';
function queryPokerNotes(ticketRecord) {
  request("/poker/ticketRecord", ticketRecord);
}

