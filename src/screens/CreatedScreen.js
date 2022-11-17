import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, Text, TouchableOpacity, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

class CreatedScreen extends React.Component {
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
        this.props.navigation.navigate('Login');
        return true;
    };

	render() {
		return (
			<LinearGradient
                colors = {['#035', '#4a545d']}
                style = {styles.container}
            >
            	<Icon
                    style = {styles.icon}
                    name = 'angle-left'
                    size = {30}
                    color = '#fafafa'
                    onPress = {() => this.props.navigation.navigate('Login')}
                />
                <View style = {styles.white}>
                </View>
                <View style = {styles.box}>
                	<Text style = {styles.prompt}>
                		Your account was successfully created!
                	</Text>
                	<TouchableOpacity onPress = {() => {
                        this.props.navigation.navigate('Login')
                    }}>
                        <View style = {styles.buttonDone}>
                            <Text style = {styles.textDone}>Done</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	icon: {
		flex: 2,
		marginTop: 30,
		marginLeft: 20,
	},
	white: {
		flex: 3,
		height: '60%',
		backgroundColor: 'white',
	},
	box: {
		width: '85%',
		height: '80%',
		alignSelf: 'center',
		justifyContent: 'center',
		position: 'absolute',
		backgroundColor: 'white',
		marginTop: 80,
		borderWidth: 0.5,
		borderColor: '#000',
		shadowRadius: 3,
		shadowOpacity: 0.8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
	},
	prompt: {
		margin: 10,
		color: '#035',
		fontSize: 25,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	buttonDone: {
		height: 40,
        width: 240,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4b79a1',
        marginTop: 50,
        borderRadius: 50,
        shadowRadius: 3,
		shadowOpacity: 0.8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
	},
	textDone: {
		color: '#fafafa',
		textAlign: 'center',
	},
});

export default CreatedScreen;