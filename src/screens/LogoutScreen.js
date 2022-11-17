import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { withNavigation } from 'react-navigation';

class LogoutScreen extends React.Component {
	componentDidMount() {
		const { navigation } = this.props;
	    this.focusListener = navigation.addListener('didFocus', () => {
	    	Alert.alert('Confirm', 'Are you sure you want to logout?', [
		        {   
		            text: 'Yes',
		            onPress: () => this.props.navigation.navigate('Login')
		        },
		        {   
		            text: 'No',
		            onPress: () => this.props.navigation.goBack()
		        },
		    ]);
	    });
	}

	componentWillUnmount() {
		this.focusListener.remove();
	}

	render() {
		return (
			<LinearGradient
                colors = {['#035', '#4a545d']}
                style = {styles.container}
            />
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		height: '100%',
	},
});

export default withNavigation(LogoutScreen);