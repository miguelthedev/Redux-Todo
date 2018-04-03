const initialState = {
  todos: [],
  id: 0
}

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      var newState = {...state};
      newState.id++;
      return {
        ...newState,
        id: newState.id,
        todos: [...newState.todos, {task: action.task, id: newState.id}]
      }

    case 'REMOVE_TODO':
      let todos = state.todos.filter(val => val.id !== +action.id);
      return {
        ...state,
        todos: todos
      }

    default:
      return state;
  }

  return state;
}

const store = Redux.createStore(rootReducer);

$(document).ready(() => {
  $('ul').on('click', 'button', e => {
    store.dispatch({
      type: 'REMOVE_TODO',
      id: $(event.target).attr('id')
    });
    $(e.target)
      .parent()
      .remove();
  });

  $('form').on('submit', e => {
    e.preventDefault();
    let newTask = $('#task').val();
    store.dispatch({
      type: 'ADD_TODO',
      task: newTask
    });

    let currentState = store.getState();
    let $newLi = $('<li>', {
      text: newTask
    });
    let $newButton = $('<button>', {
      text: 'X',
      id: currentState.id
    });
    $newLi.append($newButton);

    $('#todos').append($newLi);

    $('form').trigger('reset');
  });
});