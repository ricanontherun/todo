import React, {Component} from 'react';
import {Text, FlatList, View, Alert, SectionList} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';

import { CheckBox } from 'react-native-elements'

import styles from './styles';
import GreenText from '../GreenText';

const constants = require('../../constants');
const strings = require('../../strings');

export default class TodoList extends Component {
    constructor() {
        super();
    }

    renderAlert = (todoId) => {
        Alert.alert('Delete Item?', 'Are you sure you want to delete this item?', [
            {text: 'Yes', onPress: () => {
                this.props.deleteTodoItem(todoId)
            }},
            {text: 'No', style:'cancel'}
        ], {cancelable: true})
    }

    renderTodoItem = ({item}) => {
        const todoId = item[0];
        const todo = item[1];

        const textStyle = {
            color: strings.COLORS.TERMINAL_FOREGROUND,
            textDecorationLine: todo.state === constants.TODOS.STATES.COMPLETE ? 'line-through' : 'none'
        }

        return <CheckBox
            title={todo.title}

            onLongPress={this.renderAlert.bind(null, todoId)}
            onPress={this.props.toggleTodoState.bind(null, todoId)}
            containerStyle={{backgroundColor: strings.COLORS.TERMINAL_BACKGROUND, borderWidth: 0, width: '100%'}}
            textStyle={textStyle}
            checkedColor={strings.COLORS.ACCENT}
            checked={todo.state === constants.TODOS.STATES.COMPLETE}
        />
    }

    render() {
        let view;

        const flatTodos = Object.entries(this.props.todos);

        if (flatTodos.length !== 0) {
            view = <FlatList
                data={flatTodos}
                renderItem={this.renderTodoItem}
                keyExtractor={(item) => item[0]}
            />
        } else {
            view = <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Icon style={{paddingBottom: 10}} name="thumbs-up" size={75} color={strings.COLORS.TERMINAL_FOREGROUND} />
                <Text style={{fontWeight: 'bold', color:strings.COLORS.TERMINAL_FOREGROUND}}>All caught up!</Text>
            </View>
        }

        return <View style={[styles.todoListWrapper]}>{view}</View>;
    }
};