import React from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

class SummaryScreen extends React.Component {
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
        const { navigate } = this.props.navigation;
        const { navigation } = this.props;  
        const civilStatus = navigation.getParam('civilStatus', '');
        const citizenship = navigation.getParam('citizenship', '');  
        const monthlyIncome = navigation.getParam('monthlyIncome', 0);
        const loanAmt = navigation.getParam('loanAmt', '');
        const term = navigation.getParam('term', '');
        const loanAmort = navigation.getParam('loanAmort', '');
        const creditRatio = navigation.getParam('creditRatio', '');
        const existCust = navigation.getParam('existCust', '');
        const location = navigation.getParam('location', '');
        const projName = navigation.getParam('projName', '');
        const initialResult = navigation.getParam('initialResult', '');
        const loanPurp = navigation.getParam('loanPurp', '');
        const fund = navigation.getParam('fund', '');
        const age = navigation.getParam('age', '');

        let monthlyIncomee = this.numberWithCommas(parseFloat(monthlyIncome).toFixed(2))
        let loanAmount = this.numberWithCommas(parseFloat(loanAmt).toFixed(2))
        let loanAmrt = this.numberWithCommas(parseFloat(loanAmort).toFixed(2))

		return(
			<ImageBackground
                source = {require('../images/background.png')}
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
            		<Text style = {styles.title}>Initial Screening - {initialResult}</Text>
            		<View>
            			<View style = {{ flexDirection: 'row', justifyContent: 'space-between' }}>
	            			<Text style = {styles.info}>Age: </Text>
	            			<Text style = {styles.info}>{age} years old</Text>
	            		</View>
	            		<View style = {{ flexDirection: 'row', justifyContent: 'space-between' }}>
	            			<Text style = {styles.info}>Civil Status: </Text>
	            			<Text style = {styles.info}>{civilStatus}</Text>
	            		</View>	
	            		<View style = {{ flexDirection: 'row', justifyContent: 'space-between' }}>
		            		<Text style = {styles.info}>Citizenship: </Text>
		            		<Text style = {styles.info}>{citizenship}</Text>
		            	</View>
	            		<View style = {{ flexDirection: 'row', justifyContent: 'space-between' }}>
		            		<Text style = {styles.info}>Monthly Income: </Text>
		            		<Text style = {styles.info}>₱{monthlyIncomee}</Text>
		            	</View>
	            		<View style = {{ flexDirection: 'row', justifyContent: 'space-between' }}>
	    	        		<Text style = {styles.info}>Credit Ratio: </Text>
	    	        		<Text style = {styles.info}>{creditRatio}%</Text>
	    	        	</View>
	            	</View>
            		<Text style = {styles.title}>Loan Information</Text>
            		<View>
				<View style = {{ flexDirection: 'row', justifyContent: 'space-between' }}>
	    	        		<Text style = {styles.info}>Loan Amount: </Text>
	    	        		<Text style = {styles.info}>₱{loanAmount}</Text>
	    	        	</View>
				<View style = {{ flexDirection: 'row', justifyContent: 'space-between' }}>
	    	        		<Text style = {styles.info}>Loan Term: </Text>
	    	        		<Text style = {styles.info}>{term} months</Text>
	    	        	</View>
				<View style = {{ flexDirection: 'row', justifyContent: 'space-between' }}>
	    	        		<Text style = {styles.info}>Loan Amortization: </Text>
	    	        		<Text style = {styles.info}>₱{loanAmrt}</Text>
	    	        	</View>
            		</View>
            		<Text style = {styles.title}>Other Information</Text>
            		<View>
				<View style = {{ flexDirection: 'row', justifyContent: 'space-between' }}>
	    	        		<Text style = {styles.info}>Existing Depositor: </Text>
	    	        		<Text style = {styles.info}>{existCust}</Text>
	    	        	</View>
				<View style = {{ flexDirection: 'row', justifyContent: 'space-between' }}>
	    	        		<Text style = {styles.info}>Property Location: </Text>
	    	        		<Text style = {styles.info}>{location}</Text>
	    	        	</View>
				<View style = {{ flexDirection: 'row', justifyContent: 'space-between' }}>
	    	        		<Text style = {styles.info}>Accredited Project: </Text>
	    	        		<Text style = {styles.info}>{projName}</Text>
	    	        	</View>
	            	</View>
            		<TouchableOpacity style = {{ alignSelf: 'stretch' }} onPress =  {() => {
                        navigate('Lending2', {
                            loanAmt: loanAmt,
                            loanPurp: loanPurp,
                            fund: fund,
                            initialResult: initialResult,
                            existCust: existCust
                        })
                    }}>
                        <View style = {styles.buttonNext}>
                            <Text style = {{ color: '#fafafa' }}>Next</Text>
                        </View>
                    </TouchableOpacity>
            	</View>
            </ImageBackground>
		);
	}

    numberWithCommas(x){
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
	title: {
		alignSelf: 'center',
		color: '#035',
		fontSize: 25,
		fontWeight: 'bold',
		margin: 3,
	},
	info: {
		color: '#035',
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

export default SummaryScreen;