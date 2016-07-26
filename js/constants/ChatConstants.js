var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    CLICK_THREAD: null,
    DELETE_THREAD: null,
    CREATE_MESSAGE: null,
    RECEIVE_RAW_CREATED_MESSAGE: null,
    RECEIVE_RAW_MESSAGES: null,
    DELETE_MESSAGE: null,
    UPDATE_MESSAGE: null,
    LOGIN_USER: null,
    LOAD_USER_DATA: null,
    USER_COMPLETE: null,
    USER_UNDO_COMPLETE: null,
    CREATE_CONVERSATION: null,
    SEARCH_THREAD: null
  })

};