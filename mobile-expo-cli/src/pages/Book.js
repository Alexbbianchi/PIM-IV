import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Alert, TouchableOpacity, TextInput, ImageBackground, AsyncStorage, Text } from 'react-native';
import api from '../services/api';

import background from '../assets/background.jpg';

export default function Book({ navigation }) {
    const [date, setDate] = useState('');
    const id = navigation.getParam('id');

    async function handleSubmit() {
        
        const user_id = await AsyncStorage.getItem('user');
        await api.post(`/horses/${id}/bookings`, {
            date
        }, {
            headers: { user_id }
        })

        Alert.alert('Solicitação de reserva enviada.');
        
        navigation.navigate('Filter');
    }
    
    function handleCancel() {
        navigation.navigate('List');
    }
    
    return (
        <ImageBackground source={background} style={{width: '100%', height: '100%'}}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.label}>DATA DE INTERESSE *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Qual data você quer reservar?"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={date}
                    onChangeText={setDate}
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Solicitar reserva</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ImageBackground>
    );
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        margin: 30,
        marginTop: '50%',
    },

    label: {
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
        marginTop: 30,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#fff',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button: {
        height: 42,
        backgroundColor: '#27c',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    cancelButton: {
        backgroundColor: '#f05a5b',
        marginTop: 15,
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }
});
