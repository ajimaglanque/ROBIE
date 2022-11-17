import React from 'react';
import { ActivityIndicator,ImageBackground, StyleSheet, View, Text, Image, Alert, SafeAreaView, FlatList, Dimensions, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PureChart from 'react-native-pure-chart';

class HomeScreen extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			balance: 0,
			transactions: [],
			date: '',
			registerCountM:0,
			registerCountT:0,
			registerCountW:0,
			registerCountTh:0,
			registerCountF:0,
			registerCountSa:0,
			registerCountSu:0,
			transferCountM:0,
			transferCountT:0,
			transferCountW:0,
			transferCountTh:0,
			transferCountF:0,
			transferCountSa:0,
			transferCountSu:0,
			paymentCountM:0,
			paymentCountT:0,
			paymentCountW:0,
			paymentCountTh:0,
			paymentCountF:0,
			paymentCountSa:0,
			paymentCountSu:0,
			animating:true,
		}
	}

	componentDidMount = async () => {
		BackHandler.addEventListener(
	      	'hardwareBackPress',
	    	this.handleBackButtonPressAndroid
	    );

		const userID = await SecureStore.getItemAsync('userID');
		var that = this;

		var date = new Date().getDate(); 
		var month = new Date().getMonth() + 1; 
		var year = new Date().getFullYear(); 
		var hours = new Date().getHours(); 
		var min = new Date().getMinutes(); 
		var sec = new Date().getSeconds(); 

		that.setState({
		date:
			month + '/' + date + '/' + year + ' ' + hours + ':' + min + ':' + sec,
		})

		axios
		.get('http://ofbank.herokuapp.com/dashboard', {
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
				console.log(response.data.transactions)
				this.setState({
					balance:response.data.transactions[0].balance,
					transactions:response.data.transactions,
				})
				if(response.data.activity !== 'No activity'){
					this.initializeChartData(response.data.activity)
				}
				//Set The chart data
				
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

	initializeChartData = (transactions) => {
		for(var i = 0; i < transactions.length; i++){
			if(transactions[i].typeOfTransaction === "Fund Transfer"){
				if(transactions[i].dayOfTheWeek === 0){
					this.setState({transferCountSu:this.state.transferCountSu + parseFloat(transactions[i].amount)})
				}else if(transactions[i].dayOfTheWeek === 1){
					this.setState({transferCountM:this.state.transferCountM + parseFloat(transactions[i].amount)})
				}else if(transactions[i].dayOfTheWeek === 2){
					this.setState({transferCountT:this.state.transferCountT + parseFloat(transactions[i].amount)})
				}else if(transactions[i].dayOfTheWeek === 3){
					this.setState({transferCountW:this.state.transferCountW + parseFloat(transactions[i].amount)})
				}else if(transactions[i].dayOfTheWeek === 4){
					this.setState({transferCountTh:this.state.transferCountTh+ parseFloat(transactions[i].amount)})
				}else if(transactions[i].dayOfTheWeek === 5){
					this.setState({transferCountF:this.state.transferCountF + parseFloat(transactions[i].amount)})
				}else if(transactions[i].dayOfTheWeek === 6){
					this.setState({transferCountSa:this.state.transferCountSa + parseFloat(transactions[i].amount)})
				}else{
					
				}
			}else if(transactions[i].typeOfTransaction === "Deposit"){
				if(transactions[i].dayOfTheWeek === 0){
					this.setState({registerCountSu:this.state.registerCountSu + parseFloat(transactions[i].amount)})
				}else if(transactions[i].dayOfTheWeek === 1){
					this.setState({registerCountM:this.state.registerCountM + parseFloat(transactions[i].amount)})
				}else if(transactions[i].dayOfTheWeek === 2){
					this.setState({registerCountT:this.state.registerCountT + parseFloat(transactions[i].amount)})
				}else if(transactions[i].dayOfTheWeek === 3){
					this.setState({registerCountW:this.state.registerCountW + parseFloat(transactions[i].amount)})
				}else if(transactions[i].dayOfTheWeek === 4){
					this.setState({registerCountTh:this.state.registerCountTh+ parseFloat(transactions[i].amount)})
				}else if(transactions[i].dayOfTheWeek === 5){
					this.setState({registerCountF:this.state.registerCountF + parseFloat(transactions[i].amount)})
				}else if(transactions[i].dayOfTheWeek === 6){
					this.setState({registerCountSa:this.state.registerCountSa + parseFloat(transactions[i].amount)})
				}else{
					
				}
			}else if(transactions[i].typeOfTransaction === "Utilities"){
				if(transactions[i].dayOfTheWeek === 0){
					this.setState({transferCountSu:this.state.transferCountSu + parseFloat(transactions[i].amount)})
				}else if(transactions[i].dayOfTheWeek === 1){
					this.setState({transferCountM:this.state.transferCountM + parseFloat(transactions[i].amount)})
				}else if(transactions[i].dayOfTheWeek === 2){
					this.setState({transferCountT:this.state.transferCountT + parseFloat(transactions[i].amount)})
				}else if(transactions[i].dayOfTheWeek === 3){
					this.setState({transferCountW:this.state.transferCountW + parseFloat(transactions[i].amount)})
				}else if(transactions[i].dayOfTheWeek === 4){
					this.setState({transferCountTh:this.state.transferCountTh+ parseFloat(transactions[i].amount)})
				}else if(transactions[i].dayOfTheWeek === 5){
					this.setState({transferCountF:this.state.transferCountF + parseFloat(transactions[i].amount)})
				}else if(transactions[i].dayOfTheWeek === 6){
					this.setState({transferCountSa:this.state.transferCountSa + parseFloat(transactions[i].amount)})
				}else{
					
				}
			}else{

			}
		}
		console.log(this.state)
	}
	
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
				color: '#C92A2A',
				fontWeight: 'bold',
				alignSelf: 'flex-end',
				fontSize: 20
			}
		}
	}
	renderItem = ({item}) => 
			<TouchableOpacity onPress = {() => this.props.navigation.navigate('Transaction')}>
				<View style={[{ flex: 1 }, styles.boxpay]}>
					<View>
						<Text style={styles.title}>{item.typeOfTransaction}</Text>
						<Text style={styles.pay}>{item.accountNumber}</Text>
						<Text style={styles.pay}>{item.transactionTime}</Text>
					</View>
					<View style={{justifyContent: 'center'}}>
						<Text style={this.checkBalanceColor({item})}>₱{this.numberWithCommas(parseFloat(item.amount).toFixed(2))}</Text>
					</View> 
				</View>
			</TouchableOpacity>

	keyExtractor = item => item.transactionID.toString()
	
	render() {
		let balance = this.numberWithCommas(parseFloat(this.state.balance).toFixed(2))
		let Income = this.state.registerCountM + this.state.registerCountT + this.state.registerCountW + this.state.registerCountTh + this.state.registerCountF + this.state.registerCountSa + this.state.registerCountSu
		let weekIncome = this.numberWithCommas(parseFloat(Income).toFixed(2))
		let Expense = this.state.transferCountM + this.state.transferCountT + this.state.transferCountW + this.state.transferCountTh + this.state.transferCountF + this.state.transferCountSa + this.state.transferCountSu
		let weekExpense = this.numberWithCommas(parseFloat(Expense).toFixed(2))
		
		let data = [
			{
			  seriesName: 'Register',
			  data: [
				{x: 'Mon', y: this.state.registerCountM},
				{x: 'Tue', y: this.state.registerCountT},
				{x: 'Wed', y: this.state.registerCountW},
				{x: 'Thu', y: this.state.registerCountTh},
				{x: 'Fri', y: this.state.registerCountF},
				{x: 'Sat', y: this.state.registerCountSa},
				{x: 'Sun', y: this.state.registerCountSu},
			  ],
			  color: '#2AC92A'
			},
			{
			  seriesName: 'Transfer and Payment',
			  data: [
				{x: 'Mon', y: this.state.transferCountM},
				{x: 'Tue', y: this.state.transferCountT},
				{x: 'Wed', y: this.state.transferCountW},
				{x: 'Thu', y: this.state.transferCountTh},
				{x: 'Fri', y: this.state.transferCountF},
				{x: 'Sat', y: this.state.transferCountSa},
				{x: 'Sun', y: this.state.transferCountSu},
			  ],
			  color: '#C92A2A'
			}
		  ]
		if(this.state.animating){
			return(
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
				{/* <ActivityIndicator
					animating = {this.state.animating}
					color = '#bc2b78'
					style = {styles.activityIndicator}
				/> */}
					<Icon
						style = {styles.icon}
						name = 'bars'
						size = {30}
						color = '#fafafa'
						onPress = {() => this.props.navigation.openDrawer()}
					/>
					<View style = {[{flex: 2}, styles.hidden]}>
						<View style = {[{ flex: 2 }, styles.box]}>
							<Text style = {[{marginBottom: 10}, styles.title]}>Weekly Activity</Text>
							<View>
								<PureChart data={data} 
									height={90}
									width={'100%'} 
									type='bar'
									defaultColumnWidth={25}
									defaultColumnMargin={10} />
							</View>	
							<View style = {{ flexDirection: 'row', justifyContent: 'center', marginTop: 5}}>
								<View style= {{width: '50%'}}>
									<Text style = {{ fontWeight: 'bold', color: '#035', textAlign: 'center' }}>Income</Text> 
								</View>
								<View style= {{width: '50%'}}>
									<Text style = {{ fontWeight: 'bold', color: '#035', textAlign: 'center' }}>Expense</Text>
								</View>
							</View>
							<View style = {{ flexDirection: 'row', justifyContent: 'center', marginTop: 5}}>
								<View style =  {{ width: '50%' }}>
									<Text style = {{ textAlign: 'center', fontWeight: 'bold', color: '#2AC92A' }}>
										<Icon
											name = 'long-arrow-alt-up'
											size = {20}
											color = '#2AC92A'
											padding = {10}
										/> ₱{weekIncome}</Text>                                
								</View>
								<View style =  {{ width: '50%' }}>
									<Text style = {{ textAlign: 'center', fontWeight: 'bold', color: '#C92A2A' }}>
										<Icon
											name = 'long-arrow-alt-down'
											size = {20}
											color = '#C92A2A'
										/> ₱{weekExpense}</Text>
								</View>
							</View>
						</View>
						<View style = {{ flex: 1, flexDirection: 'row'}}>
							<View style = {[{ flex: 3, marginRight: 5 }, styles.box]}>
								<Text style = {styles.title}>Total Balance</Text>
								<Text style={styles.money}>₱{balance}</Text>
								<Text style={{color: '#035', fontSize: 15, alignSelf: 'center'}}>as of</Text>
								<Text style={styles.date}>{this.state.date}</Text>
							</View>
							<View style = {[{ flex: 2 }, styles.box]}>
								<Text style = {styles.title}>Graph</Text>
	
							</View>
						</View>
					</View>
					<View style = {[{flex: 1}, styles.hidden]}>
						<Text style = {styles.title}>Latest Transactions</Text>
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
		//flex: 1,
		margin: 5,
		marginLeft: 20,
		marginRight: 20,
	},
	box: {
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
	boxpay: {
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
		color: '#035',
		fontWeight: 'bold',
		fontSize: 20
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
		alignSelf: 'flex-end',
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

export default HomeScreen;