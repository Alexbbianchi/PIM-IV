import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import { View, StyleSheet, Text, Image, FlatList, TouchableOpacity } from 'react-native';

import api from '../services/api';

function HorseList({ breed, navigation }) {
    const [horses, setHorses] = useState([]);

    useEffect(() => {
        async function loadHorses() {
            const response = await api.get('/horses', {
                params: { breed }
            })
            setHorses(response.data);
        }

        loadHorses();
    }, []);

    function handleNavigate(id) {
        navigation.navigate('Book', { id });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Empresas com as descrições disponiveis:  <Text style={styles.bold}>{breed}</Text></Text>

            <FlatList
                style={styles.list}
                data={horses}
                keyExtractor={horse => horse._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url }} />
                        <Text style={styles.itens}>Cidade: <Text style={styles.bold}>{item.local}</Text></Text>
                        <Text style={styles.itens}>Idade: <Text style={styles.bold}>{item.age} anos</Text></Text>
                        <Text style={styles.price}>{item.price ? `R$${item.price}/dia` : 'GRATUITO'}</Text>

                        <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
                            <Text style={styles.buttonText}>Solicitar reserva</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },

    title: {
        fontSize: 20,
        color: '#fff',
        paddingHorizontal: 20,
        marginBottom: 15,
    },

    bold: {
        fontWeight: 'bold',
    },

    list: {
        paddingHorizontal: 20,
    },

    listItem: {
        marginRight: 15,
    },

    thumbnail: {
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2,
    },

    itens: {
        fontSize: 15,
        color: '#ddd',
        marginTop: 10,
    },

    price: {
        fontSize: 15,
        color: '#ccc',
        marginTop: 5
    },

    button: {
        height: 32,
        backgroundColor: '#27c',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
    },
});

export default withNavigation(HorseList);
