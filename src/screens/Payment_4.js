import React from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

class Payment_4 extends React.Component {
	_isMounted = false;
	constructor(props) {
			super(props);
			this.state = {
				amount: 0,
				accountNumber:'',
				referenceNumber:'',
				date:'',
				email:'',
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
			let referenceNumber = navigation.getParam('referenceNumber', '');
			this.setState({amount});
			this.setState({accountNumber});
			this.setState({referenceNumber});
			this.setState({date});
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

	numberWithCommas(x){
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	render() {
		const { navigation } = this.props;
		let referenceNumber = navigation.getParam('referenceNumber', '');
		let bname = navigation.getParam('billerName', '');
		let amount = navigation.getParam('amount', '');
		let account = navigation.getParam('accountNumber', '');
		let sendAmount = this.numberWithCommas(parseFloat(amount).toFixed(2));

		return (
			<ImageBackground source = {require('../images/background.png')} style = {styles.container}>
				<Icon
					style = {styles.icon}
                    name = 'angle-left'
                    size = {30}
                    color = '#fafafa'
                    onPress = {() => this.props.navigation.navigate('Payment')}
                />
	            <View style = {styles.box}>
	            	<Text style = {styles.title}>Transaction Details</Text>
	            	<View style = {{ flexGrow: 1 }}/>
	            	<View>
	            		<View style = {{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
	            			<Text style = {[{ fontWeight: 'bold' }, styles.info]}>Reference Number</Text>
	            			<Text style = {styles.info}>{referenceNumber}</Text>
	            		</View>
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
		            <TouchableOpacity style = {{ alignSelf: 'stretch' }} onPress = {() => {this.props.navigation.navigate('Payment')}}>
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

export default Payment_4;