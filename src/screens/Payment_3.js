import React from 'react';
import { ActivityIndicator,ImageBackground, StyleSheet, Text, Image, View, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';

class Payment_3 extends React.Component {
	_isMounted = false;
	constructor(props) {
			super(props);
			this.state = {
				amount: 0,
				accountNumber:'',
				referenceNumber:'',
				date:'',
				email:'',
				animating:false,
			}
		}

	componentWillUnmount() {
		this._isMounted = false;
	}

	componentDidMount() {
		this._isMounted = true;
		if (this._isMounted) {
			const { navigation } = this.props; 
			let amount = navigation.getParam('amount', '');
			let accountNumber = navigation.getParam('accountNumber', '');
			let email = navigation.getParam('email', '');
			this.setState({amount});
			this.setState({accountNumber});
			this.setState({email});

			var date = new Date().getDate();
			var month = new Date().getMonth() + 1;
			var year = new Date().getFullYear();
			var hours = new Date().getHours(); 
			var min = new Date().getMinutes(); 
			var sec = new Date().getSeconds();
			
			this.setState({
			  date:
				month + '/' + date + '/' + year + ' ' + hours + ':' + min + ':' + sec,
			});
		}
	}

	submitPayment = async () => {
		this.setState({
            animating:true,
        })
		const { navigation } = this.props;
		let billerName = JSON.parse(JSON.stringify(navigation.getParam('billerName', '')));
		const userID = await SecureStore.getItemAsync('userID');
		if(this.state.amount === '' || this.state.accountNumber === '' ){
			Alert.alert('Error!', 'amount/accountNumber cannot be empty!');
		}else{
			axios
			.post("https://ofbank.herokuapp.com/payment", {
				amount: this.state.amount,
				accountReferenceNumber: this.state.accountNumber,
				email: this.state.email,
				userID: userID,
			})
			.then((response) => {
				this.setState({
					animating:false,
				})
				console.log(response);
				if((response.data.message === 'Connection is closed.') || response.data.name === 'ConnectionError'){
					Alert.alert('Error!', 'Connection to the server is closed');
				}else if (response.data.name === 'RequestError'){
					Alert.alert('Error!', 'Request error');
				}else{
					this.setState({
						referenceNumber:response.data.referenceNumber,
						date:response.data.date,
					});
					this.props.navigation.navigate('Payment4',{  
						amount: this.state.amount,
						referenceNumber: this.state.referenceNumber,
						email: this.state.email,
						date: this.state.date,
						accountNumber: this.state.accountNumber,
						billerName: billerName
					})
				}
			})
			.catch(error => {
				this.setState({
					animating:false,
				})
				console.log(error.response)
				if((error.response.data.message == 'Not valid account') && error.response.status == '400'){
					Alert.alert('Error!', 'Not a valid account');
				}else if((error.response.data.message == 'Insufficient Balance') && error.response.status == '400'){
					Alert.alert('Error!', 'Insufficient amount');
				}else if (error.response.status == '500'){
					Alert.alert('Error!', 'Cannot connect to the server');
				}else{
					console.log(error.response)
				}
			})
		}	
	}

	numberWithCommas(x){
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

	render() {
		const { navigation } = this.props;
		let blogo = navigation.getParam('billerLogo', '');
		let bname = JSON.parse(JSON.stringify(navigation.getParam('billerName', '')));
		let amount = JSON.parse(JSON.stringify(navigation.getParam('amount', '')));
		let account = navigation.getParam('accountNumber', '');
		let sendAmount = this.numberWithCommas(parseFloat(amount).toFixed(2));

		if(this.state.animating){
			return (
				<ImageBackground source = {require('../images/background.png')} style = {styles.container}>
					<View style={styles.activityContainer}>
                            <ActivityIndicator size='large' />
                    </View>
				</ImageBackground>
				);
		}else{
			return (
				<ImageBackground source = {require('../images/background.png')} style = {styles.container}>
					<Icon
						style = {styles.icon}
						name = 'angle-left'
						size = {30}
						color = '#fafafa'
						onPress = {() => this.props.navigation.navigate('Payment2')}
					/>
					<Text style = {styles.title}>Transaction Details</Text>
					<Image
						style = {styles.image}
						resizeMode = 'contain'
						source = {blogo}
					/>
					<View style = {styles.box}>
						<View style = {{ marginTop: 10 }}>
							<View style = {{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
								<Text style = {[{ fontWeight: 'bold' }, styles.info]}>Receiver</Text>
								<Text style = {styles.info}>{bname}</Text>
							</View>
							<View style = {{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
								<Text style = {[{ fontWeight: 'bold' }, styles.info]}>Amount</Text>
								<Text style = {styles.info}>{sendAmount}</Text>
							</View>
							<View style = {{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
								<Text style = {[{ fontWeight: 'bold' }, styles.info]}>Account Transaction Number</Text>
								<Text style = {styles.info}>{account}</Text>
							</View>
							<View style = {{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
								<Text style = {[{ fontWeight: 'bold' }, styles.info]}>Date</Text>
								<Text style = {styles.info}>{this.state.date}</Text>
							</View>
						</View>
						<View style = {{ flexGrow: 1 }}/>
						<TouchableOpacity style = {{ alignSelf: 'stretch' }} onPress = {this.submitPayment.bind(this)}>
							<View style = {styles.buttonConfirm}>
								<Text style = {{ color: '#fafafa' }}>Confirm</Text>
							</View>
						</TouchableOpacity>
					</View>
				</ImageBackground>
			);
		}
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
	title: {
		textAlign: 'center',
		color: '#fafafa',
		fontSize: 25,
		fontWeight: 'bold',
	},
	image: {
		width: '60%',
		height: '15%',
		alignSelf: 'center',
	},
	box: {
		flex: 1,
		justifyContent: 'space-around',
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
	info: {
		color: '#035',
	},
	buttonConfirm: {
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
	activityContainer: {
		flex: 1,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF88',
	},
});

export default Payment_3;