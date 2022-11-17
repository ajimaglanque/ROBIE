import React from 'react';
import { ImageBackground, StyleSheet, View, Image, Text, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

class CashIn_1 extends React.Component {
    componentDidMount = async () => {
        BackHandler.addEventListener(
            'hardwareBackPress',
            this.handleBackButtonPressAndroid
        );
    }

    componentWillUnmount() {
        BackHandler.removeEventListener(
            'hardwareBackPress',
            this.handleBackButtonPressAndroid
        );
    }

    handleBackButtonPressAndroid = () => {
        this.props.navigation.navigate('CashIn');
        return true;
    };

    render() {
        const { navigation } = this.props;
        let blogo = navigation.getParam('bankLogo', '');
        let bname = JSON.parse(JSON.stringify(navigation.getParam('bankName', '')));
        return (
            <ImageBackground
                source = {require('../images/background.png')}
                style = {styles.container}
            >
                <Icon
                    style = {styles.icon}
                    name = 'angle-left'
                    size = {30}
                    color = '#fafafa'
                    onPress = {() => this.props.navigation.navigate('CashIn')}
                />
                <View style = {styles.box}>
                    <Image 
                        style = {styles.image}
                        resizeMode = 'contain'
                        source = {blogo}
                    />
                    <Text style = {styles.text}>Cash In via {bname}</Text>
                    <View style = {{ marginVertical: 30 }}>
                        <Text style = {styles.text}>
                            1. Log-in to the {bname} Website or Mobile App.
                        </Text>
                        <Text style = {styles.text}>
                            2. Click 'Fund Transfer'.
                        </Text>
                        <Text style = {styles.text}>
                            3. Select {bname} Account to transfer funds from.
                        </Text>
                        <Text style = {styles.text}>
                            4. Select 'Your Wallet'. Input 11-Digit Account Number and Enter Amount.
                        </Text>
                        <Text style = {styles.text}>
                            5. Review transaction summary then click 'Confirm' to confirm.
                        </Text>
                    </View>
                    <Text style = {styles.text}>
                        *{bname} will charge Php 10.00 per transaction.
                    </Text>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    icon: {
        alignSelf: 'flex-start',
        marginTop: 30,
        marginLeft: 20,
    },
    box: {
        flex: 1,
        backgroundColor: '#fafafa',
        margin: 20,
        padding: 15,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#000',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
    },
    image: {
        width: '70%',
        height: '25%',
        alignSelf: 'center',
    },
    text: {
        color: '#035',
        textAlign: 'left',
    },
});

export default CashIn_1;