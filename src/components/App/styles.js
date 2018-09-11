import {StyleSheet} from 'react-native';

const strings = require('../../strings')

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#596672'
    },

    controlsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 20,
    },

    nameTextBox: {
        width: '100%',
        color: strings.COLORS.TERMINAL_FOREGROUND,
    },

    nameButton: {
        width: '20%'
    },

    titleView: {
        paddingTop: 10,
        paddingBottom: 10,
    },

    listView: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#61707D',
    },

    titleText: {
        width: '100%',
        paddingLeft: 10,
        fontSize: 30,
        fontWeight: 'bold',
        color: strings.COLORS.TERMINAL_FOREGROUND,
        borderBottomWidth: 0,
        borderBottomColor: strings.COLORS.TERMINAL_FOREGROUND
    }
});