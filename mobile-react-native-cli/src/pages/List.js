import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { Alert, SafeAreaView, ScrollView, TouchableOpacity, Text, ImageBackground, Image, StyleSheet, AsyncStorage } from 'react-native';

import HorseList from '../components/HorseList';
import logo from '../assets/logo3.png';
import background from '../assets/background.jpg';

export default function List({ navigation }) {
    const [breeds, setBreeds] = useState([]);
    
    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.43.201:3333', {
                query: { user_id }
            })

            socket.on('booking_response', booking => {
                Alert.alert(`Sua proposta da raça ${booking.horse.breed} na data de ${booking.date}, foi ${booking.approved ? 'APROVADA' : 'REPROVADA'}.`);
            })
        })
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('breeds').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(breed => breed.trim());

            setBreeds(techsArray);
        })
    }, []);

    function clearAsyncStorage() {
        AsyncStorage.removeItem('breeds');
        navigation.navigate('Filter');
    }

    return (
        <ImageBackground source={background} style={{width: '100%', height: '100%'}}>
            <SafeAreaView style={styles.container}>
                <Image style={styles.logo} source={logo} />
                <ScrollView>
                    {breeds.map(breed => <HorseList key={breed} breed={breed} />)}
                </ScrollView>

                <TouchableOpacity onPress={clearAsyncStorage} style={styles.buttonReturn}>
                        <Text style={styles.buttonText}>Voltar para busca</Text>
                </TouchableOpacity>

            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    containerText:{
        margin: 20,
        marginTop: 35
    },

    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: 'center',
        // marginTop: 10,
        marginTop: 35
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
        backgroundColor: '#27c'/*'#f05a5b'*/,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15,
    },

    buttonReturn: {
        height: 50,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,   
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
    },
})