import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator,StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions, BackHandler } from 'react-native';
import { RadioGroup } from 'react-native-btr';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
class Lending_3 extends React.Component {
	constructor(props) {
		super(props);
		this.state =  {
			avgDailyBal: '',
			data: [
				{
					label: 'Yes',
					value: 'Yes',
					color: '#fafafa',
					checked: true
				},
				{
					label: 'No',
					value: 'No',
					color: '#fafafa',
				},
			],
			downPayment: '',
			animating:false,
		}
	}
	formatBeforeSubmit = (x) => {
		var parts = x.toString().split(".");
		parts[0] = parseFloat(parts[0].replace(/,/g, ''));
		var temp =  parts.join(".");
		var temp2 = temp.toString().split(",");
		var temp3 = temp2.join("");
		return temp3;
	}

	checkCommaInDecimal = (x) => {
		for (var i = 0; i < x.length; i++) {
			if(x[i] === ","){
				return true;
			}
		}
		return false;
	}

	numberWithCommas(x){
		if(this.checkCommaInDecimal(x)){
			var parts = x.toString().split(".");
			var y = parseFloat(parts[0].replace(/,/g, ''));
			parts[0] = y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			return parts.join(".");
		}else{
			var parts = x.toString().split(".");
			parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			return parts.join(".");
		}
    }

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
		if(this.state.animating){
			return (
				<KeyboardAwareScrollView enableOnAndroid = {true}>
				<LinearGradient
					colors = {['#035', '#4a545d']}
					style = {styles.container}
				>
					<View style={styles.activityContainer}>
                            <ActivityIndicator size='large' />
                    </View>
				</LinearGradient>
				</KeyboardAwareScrollView>
			);
		}else{
			return (
				<KeyboardAwareScrollView enableOnAndroid = {true}>
				<LinearGradient
					colors = {['#035', '#4a545d']}
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
						<Text style = {styles.title}>Final Screening</Text>
						<View>
							<Text style = {{ color: '#fafafa' }}>Cash Deposit: How much is the average daily balance?</Text>
							<View style = {styles.datestat}>
								<Text style = {{ color: '#fafafa', marginLeft: 1 }}>₱</Text>
								<TextInput
									placeholder = '50,000'
									placeholderTextColor = '#888'
									keyboardType = 'numeric'
									style = {styles.field}
									onChangeText = {(avgDailyBal) => this.setState({avgDailyBal})}
									value = {this.numberWithCommas(this.state.avgDailyBal)}
								/>
							</View>
						</View>
						<View>
							<Text style = {{ color: '#fafafa' }}>Is the bank OFBank?</Text>
							<RadioGroup
								style = {{ alignSelf: 'flex-start', margin: 5 }}
								color = '#fafafa'
								radioButtons = {this.state.data}
							/>
						</View>
						<View>
							<Text style = {{ color: '#fafafa' }}>How much is the down payment for the property?</Text>
							<View style = {styles.datestat}>
								<Text style = {{ color: '#fafafa', marginLeft: 1 }}>₱</Text>
								<TextInput
									placeholder = '100,000'
									placeholderTextColor = '#888'
									keyboardType = 'numeric'
									style = {styles.field}
									onChangeText = {(downPayment) => this.setState({downPayment})}
									value = {this.numberWithCommas(this.state.downPayment)}
								/>
							</View>
						</View>
						<TouchableOpacity style = {{ alignSelf: 'stretch' }} onPress = { this.toSummary2.bind(this) }>
							<View style = {styles.buttonNext}>
								<Text style = {{ color: '#fafafa' }}>Next</Text>
							</View>
						</TouchableOpacity>
					</View>
				</LinearGradient>
				</KeyboardAwareScrollView>
			);
		}
	}

    toSummary2 = async () => {
		this.setState({
            animating:true,
        })
        const { navigate } = this.props.navigation;
        const { navigation } = this.props;
        let initialResult = navigation.getParam('initialResult', '');
        let scoreResult = navigation.getParam('scoreResult', '');
        let existCust = navigation.getParam('existCust', '');
		const userID = await SecureStore.getItemAsync('userID');
        if(this.state.bank === '' ||
        this.state.cashDep === '' ||
        this.state.downPayment === ''){
            Alert.alert("Error!","Fields must not be empty!");
        }else{
			this.setState({
				avgDailyBal:this.formatBeforeSubmit(this.state.avgDailyBal),
				downPayment:this.formatBeforeSubmit(this.state.downPayment)
			},()=>{
				if(existCust == 'Yes' && scoreResult == 'PASS'){
					tatDetails = this.state.tatDetails
					tatDetails = '1 Hour'
				}
				if(existCust == 'No' && scoreResult == 'PASS'){
						tatDetails = '24 Hours'
				}
				if(existCust == 'Yes' && scoreResult == 'FAIL'){
						tatDetails = '48 Hours'
				}
				if(existCust == 'No' && scoreResult == 'FAIL'){
						tatDetails = 'Maximum of 5 days'
				}
				else{
					
					axios
						.post('https://ofbank.herokuapp.com/lending/3', {
							userID:userID,
							avgDailyBal:this.state.avgDailyBal,
							data:this.state.data,
							downPayment:this.state.downPayment,
							finalResult: 'PASS',
							tatDetails: tatDetails
						})
						.then(response => {
							this.setState({
								animating:false,
							})
							// console.log(response.data);
							if (response.data.message === 'OK') {
								navigate('Summary2', {
									initialResult: initialResult,
									scoreResult: scoreResult,
									finalResult: 'PASS',
									tatDetails: tatDetails
								})
								console.log(tatDetails)
							}
						})
						.catch(error => {
							console.log(error.response);
						});
				}
			});
		}
        
    }

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: Dimensions.get('window').height,
	},
	icon: {
		marginTop: 30,
		marginLeft: 20,
	},
	box: {
		flex: 1,
		justifyContent: 'space-between',
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		margin: 20,
		padding: 10,
		borderRadius: 5,
		shadowRadius: 3,
		shadowOpacity: 0.8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
	},
	title: {
		alignSelf: 'center',
		color: '#fafafa',
		fontSize: 25,
		fontWeight: 'bold',
		margin: 3,
	},
	datestat: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'stretch',
		margin: 5,
		color: '#fafafa',
	},
	field: {
		flexGrow: 1,
		color: '#fafafa',
		padding: 3,
		borderBottomWidth: 0.5,
		borderColor: '#fafafa',
	},
	buttonNext: {
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

export default Lending_3;