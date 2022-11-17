import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator,StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, BackHandler } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

class Lending_1 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			first_name: '',
			middle_name: '',
			last_name: '',
			birthday: '',
			civilStatus: '',
			address: '',
			city: '',
			mobile_number: '',
			citizenship: '',
			loanAmount: '',
			term: '',
			loanPurpose: '',
			marketValue: '',
			location: '',
			projectName: '',
			fund: '',
			monthlyIncome: '',
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
				<LinearGradient
					colors = {['#035', '#4a545d']}
					style = {styles.container}
				>
					<View style={styles.activityContainer}>
                            <ActivityIndicator size='large' />
                    </View>
				</LinearGradient>
			);
		}else{
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
						onPress = {() => this.props.navigation.navigate('Lending')}
					/>
					<View style = {styles.box}>
						<KeyboardAwareScrollView enableOnAndroid = {true}>
							<Text style = {styles.title}>Borrower Details</Text>
							<View style = {styles.datestat}>
								<Text style = {{ color: '#fafafa', marginLeft: 1 }}>*First Name: </Text>
								<TextInput
									placeholder = 'Juan'
									placeholderTextColor = '#888'
									style = {styles.field}
									onChangeText = {(first_name) => this.setState({first_name})}
									value = {this.state.first_name}
								/>
							</View>
							<View style = {styles.datestat}>
								<Text style = {{ color: '#fafafa', marginLeft: 1 }}>Middle Name: </Text>
								<TextInput
									placeholder = 'Ibarra'
									placeholderTextColor = '#888'
									style = {styles.field}
									onChangeText = {(middle_name) => this.setState({middle_name})}
									value = {this.state.middle_name}
								/>
							</View>
							<View style = {styles.datestat}>
								<Text style = {{ color: '#fafafa', marginLeft: 1 }}>*Last Name: </Text>
								<TextInput
									placeholder = 'Dela Cruz'
									placeholderTextColor = '#888'
									style = {styles.field}
									onChangeText = {(last_name) => this.setState({last_name})}
									value = {this.state.last_name}
								/>
							</View>
							<View style = {styles.datestat}>
								<Text style = {{ color: '#fafafa', marginLeft: 1 }}>*Birthday: </Text>
								<DatePicker
									style = {{ flexGrow: 1 }}
									placeholder = 'Select date'
									placeholderTextColor = '#888'
									format = 'MM/DD/YYYY'
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
								<Text style = {{ color: '#fafafa', marginLeft: 1 }}>*Civil Status: </Text>
								<View style = {{ flex: 1, paddingLeft: 30 }}>
									<RNPickerSelect
										placeholder = {{ label: 'Select status' }}
										style = {{ color: '#fafafa' }}
										onValueChange = {(civilStatus) => this.setState({civilStatus})}
										items = {[
											{ label: 'Single', value: 'Single' },
											{ label: 'Married', value: 'Married' },
											{ label: 'Divorced (Legally)', value: 'Divorced (Legally)' },
											{ label: 'Divorced (Illegally)', value: 'Divorced (Illegally)' },
											{ label: 'Annulled (Illegally)', value: 'Annulled (Illegally)' },
											{ label: 'Separated', value: 'Separated' },
											{ label: 'Widowed', value: 'Widowed' },
										]}
									/>
								</View>
							</View>
							<View style = {styles.datestat}>
								<Text style = {{ color: '#fafafa', marginLeft: 1 }}>*Address: </Text>
								<TextInput
									placeholder = '9 Lily St., Tulip Subdivision, Imus'
									placeholderTextColor = '#888'
									style = {styles.field}
									multiline = {true}
									onChangeText = {(address) => this.setState({address})}
									value = {this.state.address}
								/>
							</View>
							<View style = {styles.datestat}>
								<Text style = {{ color: '#fafafa', marginLeft: 1 }}>*City: </Text>
								<View style = {{ flex: 1, paddingLeft: 30 }}>
									<RNPickerSelect
										placeholder = {{ label: 'Select city' }}
										style = {{ color: '#fafafa' }}
										onValueChange = {(city) => this.setState({city})}
										items = {[
											{ label: 'Cebu', value: 'cebu' },
											{ label: 'Metro Manila', value: 'metro manila' },
											{ label: 'Others', value: 'others' },
										]}
									/>
								</View>
							</View>
							<View style = {styles.datestat}>
								<Text style = {{ color: '#fafafa', marginLeft: 1 }}>*Mobile Number: +63</Text>
								<TextInput
									placeholder = '9123456789'
									placeholderTextColor = '#888'
									keyboardType = 'number-pad'
									maxLength = {10}
									style = {styles.field}
									onChangeText = {(mobile_number) => this.setState({mobile_number})}
									value = {this.state.mobile_number}
								/>
							</View>
							<View style = {styles.datestat}>
								<Text style = {{ color: '#fafafa', marginLeft: 1 }}>*Citizenship: </Text>
								<View style = {{ flex: 1, paddingLeft: 30 }}>
									<RNPickerSelect
										placeholder = {{ label: 'Select Citizenship' }}
										style = {{ color: '#fafafa' }}
										onValueChange = {(citizenship) => this.setState({citizenship})}
										items = {[
											{ label: 'Filipino', value: 'Filipino' },
											{ label: 'Chinese', value: 'Chinese' },
											{ label: 'Others', value: 'Others' },
										]}
									/>
								</View>
							</View>
							<Text style = {styles.title}>Loan Details</Text>
							<View style = {styles.datestat}>
								<Text style = {{ color: '#fafafa', marginLeft: 1 }}>*Loan Amount Requested: ₱</Text>
								<TextInput
									placeholder = '1,000,000'
									placeholderTextColor = '#888'
									keyboardType = 'numeric'
									style = {styles.field}
									onChangeText = {(loanAmount) => this.setState({loanAmount})}
									value = {
										this.numberWithCommas(this.state.loanAmount)}
								/>
							</View>
							<View style = {styles.datestat}>
								<Text style = {{ color: '#fafafa', marginLeft: 1 }}>*Term Requested (in months): </Text>
								<TextInput
									placeholder = '24'
									placeholderTextColor = '#888'
									keyboardType = 'number-pad'
									style = {styles.field}
									onChangeText = {(term) => this.setState({term})}
									value = {
										this.numberWithCommas(this.state.term)}
								/>
							</View>
							<View style = {styles.datestat}>
								<Text style = {{ color: '#fafafa', marginLeft: 1 }}>*Loan Purpose: </Text>
								<View style = {{ flex: 1, paddingLeft: 5 }}>
									<RNPickerSelect
										placeholder = {{ label: 'Select loan purpose' }}
										style = {{ color: '#fafafa' }}
										onValueChange = {(loanPurpose) => this.setState({loanPurpose})}
										items = {[
											{ label: 'Acquisition of Lot only', value: 'lot' },
											{ label: 'Acquisition of House and Lot', value: 'house and lot' },
											{ label: 'Acquisition of Condominium', value: 'condominium' },
											{ label: 'Acquisition of Townhouse', value: 'townhouse' },
											{ label: 'Construction of House', value: 'house construction' },
											{ label: 'Renovation of House', value: 'house renovation' },
											{ label: 'Others', value: 'others' },
										]}
									/>
								</View>
							</View>
							<View style = {styles.datestat}>
								<Text style = {{ color: '#fafafa', marginLeft: 1 }}>*Market Value of Property: ₱</Text>
								<TextInput
									placeholder = '1,000,000'
									placeholderTextColor = '#888'
									keyboardType = 'numeric'
									style = {styles.field}
									onChangeText = {(marketValue) => this.setState({marketValue})}
									value = {
										this.numberWithCommas(this.state.marketValue)}
								/>
							</View>
							<Text style = {styles.title}>Project Details</Text>
							<View style = {styles.datestat}>
								<Text style = {{ color: '#fafafa' }}>*Where is the property located?</Text>
							</View>
							<View style = {styles.datestat}>
								<View style = {{flex: 1}}>
								 <RNPickerSelect
									placeholder = {{ label: 'Select property location' }}
									style = {{ color: '#fafafa' }}
									onValueChange = {(location) => this.setState({location})}
									items = {[
										{ label: 'Metro Manila', value: 'Metro Manila' },
										{ label: 'Iloilo', value: 'Iloilo' },
										{ label: 'Cebu', value: 'Cebu' },
										{ label: 'Davao', value: 'Davao' },
										{ label: 'Others', value: 'Others' },
									]}
								/>
								</View>
							</View>
							<View style = {styles.datestat}>
								<Text style = {{ color: '#fafafa', marginLeft: 1 }}>*Project Name: </Text>
								<TextInput
									placeholder = 'Serendra'
									placeholderTextColor = '#888'
									style = {styles.field}
									onChangeText = {(projectName) => this.setState({projectName})}
									value = {this.state.projectName}
								/>
							</View>
							<Text style = {styles.title}>Income Details</Text>
							<View style = {styles.datestat}>
								<Text style = {{ color: '#fafafa', marginLeft: 1 }}>*Source of Fund: </Text>
								<View style = {{ flex: 1, paddingLeft: 30 }}>
									<RNPickerSelect
										placeholder = {{ label: 'Select source of fund' }}
										style = {{ color: '#fafafa' }}
										onValueChange = {(fund) => this.setState({fund})}
										items = {[
											{ label: 'Salary', value: 'salary' },
											{ label: 'Business', value: 'business' },
											{ label: 'Others', value: 'others' },
										]}
									/>
								</View>
							</View>
							<View style = {styles.datestat}>
								<Text style = {{ color: '#fafafa', marginLeft: 1 }}>*Gross Monthly Income: ₱</Text>
								<TextInput
									placeholder = '1,000,000'
									placeholderTextColor = '#888'
									keyboardType = 'numeric'
									style = {styles.field}
									onChangeText = {(monthlyIncome) => this.setState({monthlyIncome})}
									value = {this.numberWithCommas(this.state.monthlyIncome)
									}
								/>
							</View>
							<TouchableOpacity style = {{ alignSelf: 'stretch' }} onPress = {this.toSummary.bind(this)}>
								<View style = {styles.buttonNext}>
									<Text style = {{ color: '#fafafa' }}>Next</Text>
								</View>
							</TouchableOpacity>
						</KeyboardAwareScrollView>
					</View>
				</LinearGradient>
			);
		}
	}

    toSummary =  async () => {
		this.setState({
            animating:true,
        })
        if(this.state.first_name === '' ||
        this.state.last_name === '' ||
        this.state.birthday === '' ||
        this.state.civilStatus === '' || 
        this.state.address === '' || 
        this.state.city === '' ||
        this.state.mobile_number === '' || 
        this.state.citizenship === '' || 
        this.state.loanAmount === '' || 
        this.state.term === '' || 
        this.state.loanPurp === '' ||
        this.state.marketVal === '' ||
        this.state.fund === '' ||
        this.state.monthlyIncome === '' ||
        this.state.location === '' ||
        this.state.projectName === ''){
            Alert.alert("Error!","Fields must not be empty!");
        }else{
			const userID = await SecureStore.getItemAsync('userID');
            this.setState({
				monthlyIncome:this.formatBeforeSubmit(this.state.monthlyIncome),
				marketVal:this.formatBeforeSubmit(this.state.marketVal),
				term:this.formatBeforeSubmit(this.state.term),
				loanAmount:this.formatBeforeSubmit(this.state.loanAmount)
			},() => {
				const { navigate } = this.props.navigation;
				const { navigation } = this.props;
				let existCust = navigation.getParam('existCust', '');       
				let factorRate = ((0.08 / 12)/(1-(Math.pow(1+(0.08/12), -(this.state.term))))).toFixed(2)
				let loanAmort = (parseFloat(this.state.loanAmount) * parseFloat(factorRate)).toFixed(2)
				let creditRatio = (parseFloat(loanAmort) / parseFloat(this.state.monthlyIncome) * 100).toFixed(2)
				let age = this.getAge()
				console.log(age)

				if(
					this.state.civilStatus == 'Divorced (Illegally)' || 
					this.state.civilStatus == 'Annulled (Illegally)' ||
					this.state.monthlyIncome <= 40000 || 
					creditRatio > 40 ||
					age < 21 ||
					age == age + (this.state.term / 12) > 65
				){
					initialResult = this.state.initialResult
					// remarkAge = 'Age must be between 21-65 years old.'    
					// remarkStatus = 'Separated civil status must be legal'
					// remarkIncome = 'Monthly income should be higher than Php 40,000.00'
					// remarkRatio = 'Credit ratio must be less than 40%.'
					
					axios
						.post('https://ofbank.herokuapp.com/lending/1', {
							userID:userID,
							birthday:this.state.birthday,
							marketVal:this.state.marketVal,
							age: age,
							civilStatus: this.state.civilStatus,
							citizenship: this.state.citizenship,
							monthlyIncome: this.state.monthlyIncome,
							loanAmt: this.state.loanAmount,
							term: this.state.term,
							loanAmort: loanAmort,
							creditRatio: creditRatio,
							existCust: existCust,
							factorRate:factorRate,
							location: this.state.location,
							projName: this.state.projectName,
							initialResult: 'FAIL',
							loanPurp: this.state.loanPurp,
							fund: this.state.fund,
						})
						.then(response => {
							this.setState({
								animating:false,
							});
							console.log(response.data);
							if (response.data.message === 'OK') {
								
								navigate('Summary', {  
									age: age,
									civilStatus: this.state.civilStatus,
									citizenship: this.state.citizenship,
									monthlyIncome: this.state.monthlyIncome,
									loanAmt: this.state.loanAmount,
									term: this.state.term,
									loanAmort: loanAmort,
									creditRatio: creditRatio,
									existCust: existCust,
									location: this.state.location,
									projName: this.state.projectName,
									initialResult: 'FAIL',
									loanPurp: this.state.loanPurp,
									fund: this.state.fund
								})
							} 
						})
						.catch(error => {
							console.log(error.response);
						});
				}
				else{
					// const userID = await SecureStore.getItemAsync('userID');
					axios
						.post('https://ofbank.herokuapp.com/lending/1', {
							userID:userID,
							birthday:birthday,
							marketVal:this.state.marketVal,
							age: age,
							civilStatus: this.state.civilStatus,
							citizenship: this.state.citizenship,
							monthlyIncome: this.state.monthlyIncome,
							loanAmt: this.state.loanAmount,
							term: this.state.term,
							loanAmort: loanAmort,
							creditRatio: creditRatio,
							existCust: existCust,
							factorRate:factorRate,
							location: this.state.location,
							projName: this.state.projectName,
							initialResult: 'PASS',
							loanPurp: this.state.loanPurp,
							fund: this.state.fund,
						})
						.then(response => {
							this.setState({
								animating:false,
							});
							// console.log(response.data);
							if (response.data.message === 'OK' && response.data.status === 200) {
								
								navigate('Summary', {  
									age: age,
									civilStatus: this.state.civilStatus,
									citizenship: this.state.citizenship,
									monthlyIncome: this.state.monthlyIncome,
									loanAmt: this.state.loanAmount,
									term: this.state.term,
									loanAmort: loanAmort,
									creditRatio: creditRatio,
									existCust: existCust,
									location: this.state.location,
									projName: this.state.projectName,
									initialResult: 'PASS',
									loanPurp: this.state.loanPurp,
									fund: this.state.fund
								})
							} 
						})
						.catch(error => {
							console.log(error.response);
						});
				}
			});
        }
    }

    getAge(){
        let birthday = this.state.birthday
        var today = new Date();
        var birthDate = new Date(birthday);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
            {
                age = age - 1;
            }
            return age
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
	field: {
		flexGrow: 1,
		color: '#fafafa',
		padding: 3,
		borderBottomWidth: 0.5,
		borderColor: '#fafafa',
	},
	datestat: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'stretch',
		margin: 5,
		color: '#fafafa',
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

export default Lending_1;