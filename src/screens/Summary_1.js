import React from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

class Summary_1 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            initialResult: '',
            scoreResult: '',
            tatDetails: '',
			existCust: '',
			overallStatus: ''
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
        const { navigation } = this.props; 
        const riskRating = navigation.getParam('riskRating', '');
        const scoreResult = navigation.getParam('scoreResult', '');
        const PD = navigation.getParam('PD', '');
        const userScore = navigation.getParam('userScore', '');

		return (
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
            		<View style = {{ flexGrow: 1 }}/>
            		<Text style = {styles.title}>Scorecard Screening - {scoreResult}</Text>
            		<View style = {{ flexGrow: 1 }}/>
            		<View>
            			<View style = {{ flexDirection: 'row', justifyContent: 'space-between' }}>
	            			<Text style = {styles.info}>Risk Rating:  {riskRating} - {userScore}</Text>
	            		</View>
						<View style = {{ flexDirection: 'row', justifyContent: 'space-between' }}>
	            			<Text style = {styles.info}>Probability of Default:  {PD}%</Text>
	            		</View>
		            </View>
		            <View style = {{ flexGrow: 1 }}/>
		            <TouchableOpacity style = {{ alignSelf: 'stretch' }} onPress =  { this.Summary1.bind(this) }>
                        <View style = {styles.buttonDone}>
                            <Text style = {{ color: '#fafafa' }}>Done</Text>
                        </View>
                    </TouchableOpacity>
            	</View>
            </ImageBackground>
		);
	}
    Summary1 = () => {
        const { navigate } = this.props.navigation;
        const { navigation } = this.props; 
        let initialResult = navigation.getParam('initialResult', ''); 
        let scoreResult = navigation.getParam('scoreResult', '');
        let existCust = navigation.getParam('existCust', ''); 

        if(initialResult == 'PASS' && scoreResult == 'PASS'){

            let initialResult = navigation.getParam('initialResult', '');
            let scoreResult = navigation.getParam('scoreResult', '');
            let existCust = navigation.getParam('existCust', ''); 
			let tatDetails = this.state.tatDetails


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
                navigate('Summary2', {
                    initialResult: initialResult,
                    scoreResult: scoreResult,
					tatDetails: tatDetails,
					overallStatus: 'Loan Pre-approved'
                })
            }
        }
        else{
            navigate('Lending3', {
                initialResult: initialResult,
                scoreResult: scoreResult,
				existCust: existCust,
				overallStatus: 'Loan for Admin Approval'
            })
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

export default Summary_1;