import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Dimensions, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

class Payment_2 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			accountNumber: '',
			amount: '',
			email: ''
		}
	}

	submitPayment = () => {
		if(this.state.amount === '' ||
            this.state.accountNumber === ''){
                Alert.alert("Error!","Fields must not be empty!");
			}
			else{
				this.setState({
					amount:this.formatBeforeSubmit(this.state.amount)
				},() => {
					const { navigation } = this.props;
					let billerLogo = navigation.getParam('billerLogo', '');
					let billerName = JSON.parse(JSON.stringify(navigation.getParam('billerName', '')));
					
					this.props.navigation.navigate('Payment3',{  
						amount: this.state.amount,
						email: this.state.email,
						accountNumber: this.state.accountNumber,
						billerLogo: billerLogo,
						billerName: billerName
					})
				});
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
	render() {
		const { navigation } = this.props;
		let blogo = navigation.getParam('billerLogo', '');
		let bname = JSON.parse(JSON.stringify(navigation.getParam('billerName', '')));
		let sendAmount = this.numberWithCommas(this.state.amount);
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
	                    onPress = {() => this.props.navigation.navigate('Payment1')}
	                />
	                <View style = {styles.box}>
	                	<Text style = {styles.title}>Pay Bills:</Text>
	                	<Text style = {styles.title}>{bname}</Text>
	                	<Image 
							style = {styles.image}
							resizeMode = 'contain'
							source = {blogo}
						/>
						<View style = {{ flexGrow: 1 }}/>
						<TextInput
							placeholder = '*Account Transaction Number'
							placeholderTextColor = '#888'
							keyboardType = 'number-pad'
							maxLength = {10}
							style = {styles.field}
							onChangeText = {(accountNumber) => this.setState({accountNumber})}
							value = {this.state.accountNumber}
						/>
						<TextInput
							placeholder = '*Amount'
							placeholderTextColor = '#888'
							keyboardType = 'numeric'
							style = {styles.field}
							onChangeText = {(amount) => this.setState({amount})}
							value = {sendAmount}
						/>
						<TextInput
							placeholder = 'E-mail (Optional)'
							placeholderTextColor = '#888'
							style = {styles.field}
							onChangeText = {(email) => this.setState({email})}
							value = {this.state.email}
						/>
						<View style = {{ flexGrow: 1 }}/>
						<TouchableOpacity style = {{ alignSelf: 'stretch' }} onPress = {this.submitPayment.bind(this)}>
	                        <View style = {styles.buttonProceed}>
	                            <Text style = {{ color: '#fafafa' }}>Proceed</Text>
	                        </View>
	                    </TouchableOpacity>
	                </View>
				</LinearGradient>
			</KeyboardAwareScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: Dimensions.get('window').height,
		alignItems: 'stretch',
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
		textAlign: 'center',
		color: '#fafafa',
		fontSize: 25,
		fontWeight: 'bold',
	},
	image: {
		width: '70%',
		height: '25%',
		alignSelf: 'center',
	},
	field: {
		alignSelf: 'stretch',
		color: '#fafafa',
		margin: 5,
		padding: 3,
		borderBottomWidth: 0.5,
		borderColor: '#fafafa',
	},
	buttonProceed: {
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

export default Payment_2;