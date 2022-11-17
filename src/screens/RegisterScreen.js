import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator,StyleSheet, Dimensions, View, Text, TextInput, TouchableOpacity, Alert, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

class RegisterScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			first_name: '',
			middle_name: '',
			last_name: '',
			birthday: '',
			civil_status: '',
			address: '',
			mobile_number: '',
			email_address: '',
			username: '',
			password: '',
			showError: false,
			registerError: false,
			loginError: false,
			animating:false,
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
	    this.props.navigation.navigate('Login');
	    return true;
	};

	registerUser = (e) => {
		this.setState({
            animating:true,
        })
		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
		let errorMsg = '';
		
		if (this.state.first_name === '' ||
		this.state.last_name === '' ||
        this.state.birthday === '' ||
        this.state.civil_status === '' || 
        this.state.address === '' || 
        this.state.mobile_number === '' || 
        this.state.email_address === '' || 
        this.state.username === '' || 
        this.state.password === '') {
			errorMsg = '*Required fields must not be empty!';
			Alert.alert('Error!', errorMsg);
			return true;
		}
		if(reg.test(this.state.email_address) === false &&
		this.state.email_address !== '' ){
			errorMsg = errorMsg + '\nEmail is Invalid!';
			Alert.alert('Error!', errorMsg);
			return true;
		}
		if(this.state.username.length < 8 && 
			this.state.username !== '' || 
			this.state.password.length < 8 &&
			this.state.password !== '' ){
			errorMsg = errorMsg + "\nUsername and password should be 8 characters long!"
			Alert.alert('Error!', errorMsg);
			return true;
		}
		else {
			this.setState({
				animating:true,
			})
        	e.preventDefault();
        	axios
        		.post('https://ofbank.herokuapp.com/registerUser', {
        			firstName: this.state.first_name,
	                middleName: this.state.middle_name,
	                lastName: this.state.last_name,
	                birthday: this.state.birthday,
	                civilStatus: this.state.civil_status,
	                address: this.state.address,
	                mobileNumber: this.state.mobile_number,
	                emailAddress: this.state.email_address,
	                username: this.state.username,
	                password: this.state.password,
        		})
        		.then(response => {
					this.setState({
						animating:false,
					})
        			console.log(response.data);
        			if((response.data.message === 'Connection is closed.') || response.data.name === 'ConnectionError'){
						Alert.alert('Error!', 'Connection to the server is closed');
					}else if (response.data.name === 'RequestError'){
						Alert.alert('Error!', 'Request error');
					}else if (response.data.message === 'Username/email address already taken') {
        				this.setState({
        					showError: true,
        					loginError: true,
        					registerError: false,
        				});
        				Alert.alert('Error!', 'Username/e-mail address already taken!')
        			} else {
        				this.setState({
        					messageFromServer: response.data.message,
        					showError: false,
        					loginError: false,
        					registerError: false,
        				});
        				this.props.navigation.navigate('Success')
        			}
        		})
        		.catch(error => {
					// console.log(error.response);
					this.setState({
						animating:false,
					})
					console.log(error.response)
					if (error.response.status == '500'){
						Alert.alert('Error!', 'Cannot connect to the server');
					}else{
						console.log(error.response)
					}
        		});
        }
	};

	render() {
		if(this.state.animating){
				return(
				<KeyboardAwareScrollView
					style = {{ backgroundColor: '#4b79a1' }}
					resetScrollToCoords = {{ x: 0, y: 0 }}
					enableOnAndroid = {true}
				>
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
				<KeyboardAwareScrollView
					style = {{ backgroundColor: '#4b79a1' }}
					resetScrollToCoords = {{ x: 0, y: 0 }}
					enableOnAndroid = {true}
				>
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
						<View style = {styles.box}>
							<Text style = {styles.title}>Create Account</Text>
							<TextInput
								placeholder = '*First Name'
								placeholderTextColor = '#888'
								style = {styles.field}
								onChangeText = {(first_name) => this.setState({first_name})}
								value = {this.state.first_name}
							/>
							<TextInput
								placeholder = 'Middle Name'
								placeholderTextColor = '#888'
								style = {styles.field}
								onChangeText = {(middle_name) => this.setState({middle_name})}
								value = {this.state.middle_name}
							/>
							<TextInput
								placeholder = '*Last Name'
								placeholderTextColor = '#888'
								style = {styles.field}
								onChangeText = {(last_name) => this.setState({last_name})}
								value = {this.state.last_name}
							/>
							<View style = {styles.datestat}>
								<Text style = {{ color: '#fafafa', marginLeft: 1 }}>*Birthday</Text>
								<DatePicker
									style = {{ flexGrow: 1 }}
									placeholder = 'Select date'
									placeholderTextColor = '#888'
									format = 'MM-DD-YYYY'
									minDate = '01-01-1954'
									maxDate = '01-01-1998'
									confirmBtnText = 'Confirm'
									cancelBtnText = 'Cancel'
									date = {this.state.birthday}
									onDateChange = {(birthday) => {this.setState({birthday})}}
									customStyles = {{
										dateText: {
											color: '#fafafa',
										},
										dateInput: {
											borderColor: 'transparent',
										},
										dateTouchBody: {
											height: 25,
										},
									}}
								/>
							</View>
							<View style = {styles.datestat}>
								<Text style = {{ color: '#fafafa', marginLeft: 1 }}>*Civil Status</Text>
								<View style = {{ flex: 1, paddingLeft: 30 }}>
									<RNPickerSelect
										placeholder = {{ label: 'Select status' }}
										style = {{ color: '#fafafa' }}
										onValueChange = {(civil_status) => this.setState({civil_status})}
										items = {[
											{ label: 'Single', value: 'single' },
											{ label: 'Married', value: 'married' },
											{ label: 'Divorced', value: 'divorced' },
											{ label: 'Separated', value: 'separated' },
											{ label: 'Widowed', value: 'widowed' },
										]}
									/>
								</View>
							</View>
							<TextInput
								placeholder = '*Address'
								placeholderTextColor = '#888'
								style = {styles.field}
								onChangeText = {(address) => this.setState({address})}
								value = {this.state.address}
							/>
							<View style = {styles.datestat}>
								<Text style = {{ color: '#fafafa', marginLeft: 1 }}>*Mobile Number +63</Text>
								<TextInput
									placeholder = '9123456789'
									placeholderTextColor = '#888'
									keyboardType = 'number-pad'
									maxLength = {10}
									style = {[{ flexGrow: 1 }, styles.field]}
									onChangeText = {(mobile_number) => this.setState({mobile_number})}
									value = {this.state.mobile_number}
								/>
							</View>
							<TextInput
								placeholder = '*E-mail Address'
								placeholderTextColor = '#888'
								keyboardType = 'email-address'
								textContentType = 'emailAddress'
								style = {styles.field}
								onChangeText = {(email_address) => this.setState({email_address})}
								value = {this.state.email_address}
							/>
							<Text style = {{ color: '#fafafa'}}>Username and Password must contain at least 8 characters.</Text>
							<TextInput
								placeholder = '*Username'
								placeholderTextColor = '#888'
								style = {styles.field}
								onChangeText = {(username) => this.setState({username})}
								value = {this.state.username}
							/>
							<TextInput
								placeholder = '*Password'
								placeholderTextColor = '#888'
								secureTextEntry = {true}
								style = {styles.field}
								onChangeText = {(password) => this.setState({password})}
								value = {this.state.password}
							/>
							<TouchableOpacity style = {{ alignSelf: 'stretch' }} onPress = {this.registerUser.bind(this)}>
								<View style = {styles.buttonRegister}>
									<Text style = {{ color: '#fafafa' }}>Create</Text>
								</View>
							</TouchableOpacity>
						</View>
					</LinearGradient>
				</KeyboardAwareScrollView>
			);
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: Dimensions.get('window').height,
		justifyContent: 'center',
	},
	icon: {
		alignSelf: 'flex-start',
		marginTop: 30,
		marginLeft: 20,
	},
	box: {
		flex: 1,
		alignItems: 'center',
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
		fontSize: 25,
		fontWeight: 'bold',
		color: '#fafafa',
	},
	field: {
		alignSelf: 'stretch',
		color: '#fafafa',
		margin: 3,
		padding: 3,
		borderBottomWidth: 0.5,
		borderColor: '#fafafa',
	},
	datestat: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'stretch',
		marginHorizontal: 3,
		color: '#fafafa',
	},
	buttonRegister: {
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

export default RegisterScreen;