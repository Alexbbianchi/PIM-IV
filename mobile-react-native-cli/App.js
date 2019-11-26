import React from 'react';
import { YellowBox } from 'react-native';
import Routes from './src/routes';

YellowBox.ignoreWarnings([
    'Unrecognized WebSocket',
    'AsyncStorage has been extracted from react-native',
    'Possible Unhandled',
    'Cannot connect to the Metro server'
]);

export default function App() {
    return <Routes />
}