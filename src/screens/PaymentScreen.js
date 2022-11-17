import React from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, BackHandler, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

class PaymentScreen extends React.Component {
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
	    Alert.alert('Are you sure you want to logout?', '', [
	    	{	
	    		text: 'Yes',
	    		onPress: () => this.props.navigation.navigate('Login')
	    	},
	    	{	
	    		text: 'No',
	    		onPress: () => {}	
	    	},
	    ]);
	    return true;
	};

	render() {
		return (
			<ImageBackground source = {require('../images/background.png')} style = {styles.container}>
				<Icon
					style = {styles.icon}
					name = 'bars'
					size = {30}
					color = '#fafafa'
					onPress = {() => this.props.navigation.openDrawer()}
				/>
				<Text style = {styles.title}>Payments</Text>
				<View style = {styles.box}>
					<View style = {{ flexDirection: 'row', justifyContent: 'space-around' }}>
						<TouchableOpacity style = {styles.icont} onPress = {() => this.props.navigation.navigate('Payment1', {
							billerName: 'Water'
						})}>
							<Icon
								name = 'tint'
								style = {styles.ico}
								size = {40}
							/>
							<Text>Water</Text>
						</TouchableOpacity>
						<TouchableOpacity style = {styles.icont} onPress = {() => this.props.navigation.navigate('Payment1', {
							billerName: 'Electricity'
						})}>
							<Icon
								name = 'bolt'
								style = {styles.ico}
								size = {40}
							/>
							<Text>Electricity</Text>
						</TouchableOpacity>
						<TouchableOpacity style = {styles.icont} onPress = {() => this.props.navigation.navigate('Payment1', {
							billerName: 'Credit Cards'
						})}>
							<Icon
								name = 'credit-card'
								style = {styles.ico}
								size = {40}
							/>
							<Text>Credit Cards</Text>
						</TouchableOpacity>
					</View>
					<View style = {{ flexDirection: 'row', justifyContent: 'space-around' }}>
						<TouchableOpacity style = {styles.icont} onPress = {() => this.props.navigation.navigate('Transfer', {
							billerName: 'Loans'
						})}>
							<Icon
								name = 'hand-holding-usd'
								style = {styles.ico}
								size = {40}
							/>
							<Text>Loans</Text>
						</TouchableOpacity>
						<TouchableOpacity style = {styles.icont} onPress = {() => this.props.navigation.navigate('Transfer')}>
							<Icon
								name = 'exchange-alt'
								style = {styles.ico}
								size = {40}
							/>
							<Text>Fund Transfer</Text>
						</TouchableOpacity>
						<TouchableOpacity style = {styles.icont} onPress = {() => this.props.navigation.navigate('Transfer', {
							billerName: 'Education'
						})}>
							<Icon
								name = 'graduation-cap'
								style = {styles.ico}
								size = {40}
							/>
							<Text>Education</Text>
						</TouchableOpacity>
					</View>
					<View style = {{ flexDirection: 'row', justifyContent: 'space-around' }}>
						<TouchableOpacity style = {styles.icont} onPress = {() => this.props.navigation.navigate('Payment1', {
							billerName: 'Banks'
						})}>
							<Icon
								name = 'university'
								style = {styles.ico}
								size = {40}
							/>
							<Text>Banks</Text>
						</TouchableOpacity>
						<TouchableOpacity style = {styles.icont} onPress = {() => this.props.navigation.navigate('Transfer', {
							billerName: 'Entertainment'
						})}>
							<Icon
								name = 'ticket-alt'
								style = {styles.ico}
								size = {40}
							/>
							<Text>Entertainment</Text>
						</TouchableOpacity>
						<TouchableOpacity style = {styles.icont} onPress = {() => this.props.navigation.navigate('Transfer', {
							billerName: 'Health'
						})}>
							<Icon
								name = 'heartbeat'
								style = {styles.ico}
								size = {40}
							/>
							<Text>Health</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	icon: {
		alignSelf: 'flex-start',
		marginTop: 30,
		marginLeft: 20,
	},
	title: {
		color: '#fafafa',
		fontSize: 25,
		fontWeight: 'bold',
	},
	box: {
		width: '90%',
		height: '55%',
		justifyContent: 'space-around',
        backgroundColor: '#fafafa',
        padding: 10,
        marginTop: 40,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#000',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
	},
	icont: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default PaymentScreen;