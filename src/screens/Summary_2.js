import React from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

class Summary_2 extends React.Component {
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
        this.props.navigation.navigate('Lending');
        return true;
    };

	render() {
		const { navigation } = this.props; 
        const initialResult = navigation.getParam('initialResult', '');
        const scoreResult = navigation.getParam('scoreResult', '');
        const finalResult = navigation.getParam('finalResult', '');
        const tatDetails = navigation.getParam('tatDetails', '');
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
            		onPress = {() => this.props.navigation.navigate('Lending')}
            	/>
            	<View style = {styles.box}>
            		<View style = {{ flexGrow: 1 }}/>
            		<Text style = {styles.title}>Turn Around Time Details</Text>
            		<View style = {{ flexGrow: 1 }}/>
            		<View>
            			<View style = {{ flexDirection: 'row', justifyContent: 'space-between' }}>
	            			<Text style = {styles.info}>Reference Number: </Text>
	            			<Text style = {styles.info}>001</Text>
	            		</View>
	            		<View style = {{ flexDirection: 'row', justifyContent: 'space-between' }}>
	            			<Text style = {styles.info}>Initial Screening: </Text>
	            			<Text style = {styles.info}>{initialResult}</Text>
	            		</View>
	            		<View style = {{ flexDirection: 'row', justifyContent: 'space-between' }}>
	            			<Text style = {styles.info}>Scorecard Screening: </Text>
	            			<Text style = {styles.info}>{scoreResult}</Text>
	            		</View>
	            		<View style = {{ flexDirection: 'row', justifyContent: 'space-between' }}>
	            			<Text style = {styles.info}>Final Screening: </Text>
	            			<Text style = {styles.info}>{finalResult}</Text>
	            		</View>
            		</View>
            		<View style = {{ flexGrow: 1 }}/>
            		<Text style = {{ color: '#035', textAlign: 'center' }}>Turn Around Time: {tatDetails}</Text>
            		<View style = {{ flexGrow: 1 }}/>
            		<TouchableOpacity style = {{ alignSelf: 'stretch' }} onPress =  {() => this.props.navigation.navigate('Lending')}>
                        <View style = {styles.buttonDone}>
                            <Text style = {{ color: '#fafafa' }}>Done</Text>
                        </View>
                    </TouchableOpacity>
            	</View>
            </ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	icon: {
		marginTop: 30,
		marginLeft: 20,
	},
	box: {
		flex: 1,
		backgroundColor: '#fafafa',
		margin: 20,
		padding: 10,
		borderRadius: 5,
		borderWidth: 0.5,
		borderColor: '#000',
		shadowRadius: 3,
		shadowOpacity: 0.8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
	},
	title: {
		textAlign: 'center',
		color: '#035',
		fontSize: 25,
		fontWeight: 'bold',
	},
	info: {
		color: '#035',
	},
	buttonDone: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#4b79a1',
		margin: 10,
		padding: 15,
		borderRadius: 50,
		shadowRadius: 2,
		shadowOpacity: 0.8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
	},
});

export default Summary_2;