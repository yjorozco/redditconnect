import React from 'react';
import { View, ActivityIndicator, SafeAreaView } from 'react-native';

export default class ApplicationLoadingScreen extends React.Component {
    render() {
        return (
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <ActivityIndicator size="large" color="#000000" />
                </View>
        );
    }
}