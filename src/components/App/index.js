import React, { Component } from 'react';
import {
    View,
    TextInput,
    AsyncStorage,
    Text,
    ActivityIndicator
} from 'react-native';

import {Header} from 'react-native-elements';

import Icon from 'react-native-vector-icons/dist/FontAwesome5';

import shortid from 'shortid';
import TodoList from '../TodoList';

import styles from './styles';
const strings = require('../../strings');
const constants = require('../../constants');

const STORAGE_TODOS_KEY = '@SimpleTodoAppStorage:todos';

export default class App extends Component {
    state = {
        todoName: '',
        todos: {},
        loading: false,
        appState: 1
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // this.clearAllTodos();
        this.readTodosFromDisk();
    }

    writeTodosToDisk = () => {
        return AsyncStorage.setItem(STORAGE_TODOS_KEY, JSON.stringify(this.state.todos));
    }

    readTodosFromDisk = async () => {
        this.setState({
            loading: true
        }, () => {
            return AsyncStorage.getItem(STORAGE_TODOS_KEY).then((json) => {
                if (json) {
                    this.setState({
                        todos: JSON.parse(json)
                    });
                }
            }).catch((err) => {
                alert(`ERROR: ${err}`);
            }).finally(() => {
                this.setState({
                    loading: false
                })
            });
        });
    }

    clearAllTodos = () => {
        AsyncStorage.removeItem(STORAGE_TODOS_KEY);
    }

    todoNameChangeHandler = (todo) => {
        this.setState({
            todoName: todo
        })
    }

    deleteTodoItemHandler = (todoId) => {
        this.setState((prev) => {
            const newState = Object.assign({}, prev);

            delete newState.todos[todoId];

            return newState;
        }, this.writeTodosToDisk);
    }

    toggleTodoState = (todoId) => {
        const todo = Object.assign({}, this.state.todos[todoId]);

        todo.state = todo.state === constants.TODOS.STATES.OPEN ?
            constants.TODOS.STATES.COMPLETE :
            constants.TODOS.STATES.OPEN;


        this.setState((prev) => {
            prev.todos[todoId] = todo;

            return prev;
        }, this.writeTodosToDisk)
    }

    addTodoHandler = () => {
        const todoTitle = this.state.todoName.trim();

        if (todoTitle.length === 0) {
            return;
        }

        todoId = shortid.generate();
        const todo = {
            id: todoId,
            title: todoTitle,
            state: constants.TODOS.STATES.OPEN
        }

        this.setState((prev) => {
            const newState = {...this.state.todos};
            newState[todoId] = todo;

            return {
                todos: newState,

                // Make sure we reset the input value.
                todoName: ''
            }
        }, this.writeTodosToDisk);
    }

    getTodos = () => {
        return JSON.stringify(this.state.todos);
    }

    generatePlaceholder = () => {
        return "";
    }

    render() {
        let view;

        // ick.
        if (this.state.loading) {
            view = <View style={[styles.container, {justifyContent: 'center'}]}>
                    <ActivityIndicator size="large" color={strings.COLORS.TERMINAL_FOREGROUND} />
                </View>
        } else {
            view = <View style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>
                        // TODO:
                    </Text>
                </View>

                <View style={styles.listView}>
                    <TodoList
                        todos={this.state.todos}
                        toggleTodoState={this.toggleTodoState.bind(this)}
                        deleteTodoItem={this.deleteTodoItemHandler.bind(this)}
                    >
                    </TodoList>
                </View>

                <View style={styles.controlsContainer}>
                    <Text style={{fontSize: 20, color: strings.COLORS.TERMINAL_FOREGROUND}}>
                        <Icon name="pencil-alt" size={20} color={strings.COLORS.TERMINAL_FOREGROUND} />
                    </Text>
                    <TextInput
                        ref="nameInput"
                        placeholder=""
                        placeholderTextColor={strings.COLORS.TERMINAL_FOREGROUND}
                        underlineColorAndroid="transparent"
                        onSubmitEditing={this.addTodoHandler}
                        value={this.state.todoName}
                        onChangeText={this.todoNameChangeHandler}
                        style={styles.nameTextBox}
                    />
                </View>
            </View>
        }

        return view;

    }
};