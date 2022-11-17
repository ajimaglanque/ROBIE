import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, Text, TouchableOpacity, BackHandler, Alert } from 'react-native';
import { RadioGroup } from 'react-native-btr';
import Icon from 'react-native-vector-icons/FontAwesome5';

class LendingScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
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
	
	onPress = data => this.setState({ data });
	render() {
		let selectedButton = this.state.data.find(e => e.checked == true);
		selectedButton = selectedButton ? selectedButton.value : this.state.data[0].label;
		const { navigate } = this.props.navigation;

		return (
			<LinearGradient
				colors = {['#035', '#4a545d']}
				style = {styles.container}
			>
				<Icon
                    style = {styles.icon}
                    name = 'bars'
                    size = {30}
                    color = '#fafafa'
                    onPress = {() => this.props.navigation.openDrawer()}
                />
                <View style = {styles.box}>
                	<Text style = {styles.title}>Initial Screening</Text>
                	<View style = {{ flexGrow: 1 }}/>
            		<Text style = {{ color: '#fafafa' }}>Is the applicant an existing customer of the bank?</Text>
            		<RadioGroup
            			style = {{ alignSelf: 'flex-start', margin: 5 }}
						color = '#fafafa'
						radioButtons = {this.state.data}
						onPress = {this.onPress}
					/>
                	<View style = {{ flexGrow: 1 }}/>
                	<TouchableOpacity style = {{ alignSelf: 'stretch' }} onPress = {() => {
							navigate('Lending1', { 
								existCust: selectedButton
							});
							console.log(selectedButton)
						}}>
                        <View style = {styles.buttonNext}>
                            <Text style = {{ color: '#fafafa' }}>Next</Text>
                        </View>
                    </TouchableOpacity>
                </View>
			</LinearGradient>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	icon: {
		alignSelf: 'flex-start',
		marginTop: 30,
		marginLeft: 20,
	},
	box: {
		flex: 1,
		alignSelf: 'stretch',
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
		color: '#fafafa',
		fontSize: 25,
		fontWeight: 'bold',
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
});

export default LendingScreen;