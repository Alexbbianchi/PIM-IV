import React, { useState, useEffect } from 'react';
import { View, Alert, AsyncStorage, ImageBackground, KeyboardAvoidingView, Platform, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

// import api from '../services/api';

import logo from '../assets/logo3.png';
import background from '../assets/background.jpg';

export default function Filter({ navigation }) {
    const [breeds, setBreeds] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('breeds').then(user => {
            if (user) {
                navigation.navigate('List');
            }
        })
    }, [])
    async function handleSubmit() {
        
        if(!breeds) return Alert.alert("Digite um valor para ser filtrado");
        
        await AsyncStorage.setItem('breeds', breeds);
        navigation.navigate('List');
    }

    function clearAsyncStorage() {
        AsyncStorage.clear();
        navigation.navigate('Login');
    }
    return (
        <ImageBackground source={background} style={{width: '100%', height: '100%'}}>
            <KeyboardAvoidingView enabled={Platform.OS == 'ios'} behavior='padding' style={styles.container}>
                <Image source={logo} />

                <View style={styles.form}>
                   
                    <Text style={styles.label}>RAÇAS *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Quais as raças do seu interesse?"
                        placeholderTextColor="#999"
                        autoCapitalize="words"
                        autoCorrect={false}
                        value={breeds}
                        onChangeText={setBreeds}
                    />

                    <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                        <Text style={styles.buttonText}> Encontrar cavalos</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

            <KeyboardAvoidingView style={styles.formContainer}>
                <TouchableOpacity onPress={clearAsyncStorage} style={styles.buttonReturn}>
                        <Text style={styles.buttonText}>Sair</Text>
                </TouchableOpacity>
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

    formContainer:{
        justifyContent: 'center'
    },

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

    buttonReturn: {
        height: 50,
        backgroundColor: '#f05a5b',
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

