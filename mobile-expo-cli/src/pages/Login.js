import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, Alert, ImageBackground, KeyboardAvoidingView, Platform, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import api from '../services/api';

import logo from '../assets/logo3.png';
import background from '../assets/background.jpg';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const expression = (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i);
    //const [breeds, setBreeds] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('Filter');
            }
        })
    }, []);

    async function handleSubmit() {

        if(!email){
            Alert.alert("Dígite um email útil");
        } else if(expression.test(String(email)) === true) {

            const response = await api.post('/sessions', {
                email
            })
            const { _id } = response.data;
    
            await AsyncStorage.setItem('user', _id);
    
            navigation.navigate('Filter');

            console.log(email);
        } else {
            return Alert.alert("Email invalido");
        }
    
    }
    return (
        <ImageBackground source={background} style={{width: '100%', height: '100%'}}>
            <KeyboardAvoidingView enabled={Platform.OS == 'ios'} behavior='padding' style={styles.container}>
                <Image source={logo} />

                <View style={styles.form}>
                    <Text style={styles.label}>SEU E-MAIL *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Seu e-mail"
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={email}
                        onChangeText={setEmail}
                    />

                    <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                        <Text style={styles.buttonText}> Logar</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },

    // formCompany: {
    //     alignContent: 'center',
    //     alignSelf: 'stretch',
    //     paddingHorizontal: 30,
    // },

    label: {
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
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
        height: 50,
        backgroundColor: '#27c',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }
});

