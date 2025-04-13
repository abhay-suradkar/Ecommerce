/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';

const Loder = ({modalVisible, setModalVisible}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }} >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ height: 100, width: 100, borderRadius: 20, margin: 10,justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', padding: 35, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 }}>
                    <ActivityIndicator size={'large'}/>
                </View>
            </View>
        </Modal>
    );
};

export default Loder;
