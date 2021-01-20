import { ALL, ACTIVE, COMPLETED } from './constant/state.js';

export default class App {
  constructor() {
    this.todos = [
      { id: String(Date.now()), title: 'dummy data', completed: false },
    ];
    this.selected = ALL;
    this.$todoList = document.querySelector('#todo-list');
    this.$newTodoTitle = document.querySelector('#new-todo-title');
    this.$count = document.querySelector('strong');

    this.$newTodoTitle.addEventListener('keyup', this.addTodo);
    this.$todoList.addEventListener('dblclick', this.editTodo);
    this.$todoList.addEventListener('click', this.changeTodo);
  }

  todoTemplate = (todo) => {
    return `<li id=${todo.id} class=${todo.completed && 'completed'} >
                <div class="view">
                    <input class="toggle" type="checkbox" 
                      id=${todo.id} ${todo.completed && 'checked'} />
                    <label class="label">${todo.title}</label>
                    <button class="destroy" id=${todo.id}></button>
                </div>
                <input class="edit" value="${todo.title}" />
            </li>`;
  };

  loadTodo = () => {
    this.$todoList.innerHTML = '';
    this.todos.forEach((todo) => {
      this.$todoList.insertAdjacentHTML('beforeend', this.todoTemplate(todo));
    });
    this.$count.innerHTML = this.todos.length;
  };

  addTodo = ({ target, key }) => {
    if (key === 'Enter' && target.value) {
      this.todos.push({
        id: String(Date.now()),
        title: target.value,
        completed: false,
      });
      target.value = '';
      this.loadTodo();
    }
  };

  editItem = ({ target }) => {
    console.log(target.value);
  };

  editTodo = ({ target }) => {
    if (target.className === 'label') {
      console.log(target.closest('li'));
      target.closest('li').classList.add('editing');
    }
  };

  changeTodo = ({ target }) => {
    if (target.className === 'toggle') {
      this.todos.map((todo) => {
        if (todo.id === target.id) {
          todo.completed = !todo.completed;
        }
      });
      this.loadTodo();
    } else if (target.className === 'destroy') {
      this.todos = this.todos.filter((todo) => {
        if (todo.id !== target.id) {
          return todo;
        }
      });
      this.loadTodo();
    }
  };
}

window.onload = () => {
  new App().loadTodo();
};
