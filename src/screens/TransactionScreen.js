import React from 'react';
import { ActivityIndicator,ImageBackground, StyleSheet, View, Text, Image, Alert, SafeAreaView, FlatList, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
import { TouchableOpacity } from 'react-native-gesture-handler';

class TransactionScreen extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			balance:'',
			transactions: [],
			animating:true,
		}
	}

	componentDidMount = async () => {
		BackHandler.addEventListener(
	      	'hardwareBackPress',
	    	this.handleBackButtonPressAndroid
	    );

		const userID = await SecureStore.getItemAsync('userID');
		axios
		.get('http://ofbank.herokuapp.com/transactions', {
			params: {
				userID: userID,
			},
		})
		.then((response) => {
			this.setState({
				animating:false
			});
			if((response.data.message === 'Connection is closed.') || response.data.name === 'ConnectionError'){
				Alert.alert('Error!', 'Connection to the server is closed');
			}else if (response.data.name === 'RequestError'){
				Alert.alert('Error!', 'Request error');
			}else{
				this.setState({
					balance:response.data.transactions[0].balance,
					transactions:response.data.transactions,
				})

			}
		})
		.catch(error => {
			this.setState({
				animating:false
			});
			// console.log(error.response.data)
			console.log(error.response)
				if((error.response.data.message == 'Not valid account') && error.response.status == '400'){
					Alert.alert('Error!', 'Not a valid account');
				}else if (error.response.status == '500'){
					Alert.alert('Error!', 'Cannot connect to the server');
				}else{
					console.log(error.response)
				}
		});
	}

	componentWillUnmount() {
    	BackHandler.removeEventListener(
      		'hardwareBackPress',
     		this.handleBackButtonPressAndroid
    	);
  	}

  	handleBackButtonPressAndroid = () => {
	    this.props.navigation.navigate('Home');
	    return true;
	};

	checkBalanceColor = ({item}) => {
		if(item.typeOfTransaction === "Deposit" || item.typeOfTransaction === "Registration"){
			return {
				color: '#2AC92A',
				fontWeight: 'bold',
				alignSelf: 'flex-end',
				fontSize: 20
			}
		}else{
			return {
				color: '#c92a2a',
				fontWeight: 'bold',
				alignSelf: 'flex-end',
				fontSize: 20
			}
		}
	}

	renderItem = ({item}) => 
		<View style={[{ flex: 1 }, styles.box]}>
			<View>
				<Text style={styles.titlebox}>{item.typeOfTransaction}</Text>
				<Text style={styles.pay}>{item.accountNumber}</Text>
				<Text style={styles.pay}>{item.transactionTime}</Text>
			</View>
			<View style={{justifyContent: 'center'}}>
				<Text style={this.checkBalanceColor({item})}>₱{this.numberWithCommas(parseFloat(item.amount).toFixed(2))}</Text>
			</View> 
		</View>

	keyExtractor = item => item.transactionID.toString()

	render() {
		if(this.state.animating){
			return (
				<ImageBackground
					source = {require('../images/background.png')}
					style = {styles.container}
				>
					<View style={styles.activityContainer}>
                            <ActivityIndicator size='large' />
                    </View>
				</ImageBackground>
			);
		}else{
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
							onPress = {() => this.props.navigation.navigate('Home')}
					/>
					<Text style = {styles.title}>Transaction History</Text>
					<View style = {styles.hidden}>
						<FlatList
							data={this.state.transactions}
							renderItem={this.renderItem}
							keyExtractor={this.keyExtractor}
						/>
					</View>
				</ImageBackground>
			);
		}
	}

	numberWithCommas(x){
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		height: '100%',
	},
	icon: {
		marginTop: 30,
		marginLeft: 20,
	},
	hidden: {
		flex: 1,
		margin: 5,
		marginLeft: 20,
		marginRight: 20,
	},
	box: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 10,
		marginTop: 5,
		backgroundColor: 'white',
		borderRadius: 5,
		borderWidth: 0.5,
		borderColor: '#000',
		shadowRadius: 3,
		shadowOpacity: 0.8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
	},
	title: {
		color: '#fafafa',
		fontSize: 25,
		fontWeight: 'bold',
		alignSelf: 'center',
		marginBottom: 10
	},
	titlebox: {
		color: '#035',
		fontWeight: 'bold'
	},
	money: {
		color: '#035',
		fontWeight: 'bold',
		alignSelf: 'center',
		fontSize: 25
	},
	date: {
		color: '#035',
		fontWeight: 'bold',
		alignSelf: 'center',
		fontSize: 15
	},
	pay: {
		color: '#035',
		alignSelf: 'flex-start',
		fontSize: 12
	},
	paybal: {
		color: '#c92a2a',
		fontWeight: 'bold',
		alignItems: 'flex-end',
		fontSize: 20
	},
	activityContainer: {
		flex: 1,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF88',
	},
});

export default TransactionScreen;