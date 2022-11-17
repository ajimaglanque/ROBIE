import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator,StyleSheet, View, Text, TouchableOpacity, Alert, BackHandler } from 'react-native';
import { RadioGroup } from 'react-native-btr';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RNPickerSelect from 'react-native-picker-select';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
class Lending_2 extends React.Component {
	constructor(props) {
		super(props);
		this.state =  {
            animating:false,
			employment: '',
			occupation: '',
			industry: '',
            loanPurp: '',
            loanAmt: '',
            woeOfw:'',
            woeLoanAmount: '',
            woeIndustry: '',
            woeLoanPurp: '',
            woeOccupation: '',
            woeFundSource: '',
            userScore: '',
            OFW: '',
            scoreResult: '',
            riskRating: '',
            PD: '',
            data: [
                {
                    label: 'Yes',
                    value: 'yes',
                    color: '#fafafa',
                    checked: true
                },
                {
                    label: 'No',
                    value: 'no',
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
        this.props.navigation.navigate('Lending');
        return true;
    };

    onPress = data => this.setState({ data });
	render() {
        let selectedButton = this.state.data.find(e => e.selected == true);
        selectedButton = selectedButton ? selectedButton.value : this.state.data[0].label;
        
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
                        <Text style = {styles.title}>Scorecard Screening</Text>
                        <View style = {{ flexGrow: 1 }}/>
                        <Text style = {styles.question}>Employment Type:</Text>
                        <RNPickerSelect
                            placeholder = {{ label: 'Select employment type' }}
                            style = {{ color: '#fafafa', margin: 5 }}
                            onValueChange = {(employment) => this.setState({employment})}
                            items = {[
                                { label: 'Employed', value: 'employed' },
                                { label: 'Self-Employed', value: 'self-employed' },
                                { label: 'Mixed', value: 'mixed' },
                                { label: 'None', value: 'none' },
                            ]}
                        />
                        <View style = {{ flexGrow: 1 }}/>
                        <Text style = {styles.question}>Occupation:</Text>
                        <RNPickerSelect
                            placeholder = {{ label: 'Select occupation' }}
                            style = {{ color: '#fafafa', margin: 5 }}
                            onValueChange = {(occupation) => this.setState({occupation})}
                            items = {[
                                { label: 'Professional', value: 'professional' },
                                { label: 'Agriculture', value: 'agriculture' },
                                { label: 'Armed Forces', value: 'armed forces' },
                                { label: 'Manager', value: 'manager' },
                                { label: 'Clerical Support', value: 'clerical support' },
                                { label: 'Craft and Related Trade', value: 'craft and related trade' },
                                { label: 'Pensioner/Retired', value: 'pensioner/retired' },
                                { label: 'Service and Sales', value: 'service and sales' },
                                { label: 'Student', value: 'student' },
                                { label: 'Technician or Associate Professional', value: 'technician or associate professional' },
                                { label: 'Unemployed', value: 'unemployed' },
                                { label: 'Unskilled', value: 'unskilled' },
                                { label: 'Others', value: 'others' },
                            ]}
                        />
                        <View style = {{ flexGrow: 1 }}/>
                        <Text style = {styles.question}>Industry:</Text>
                        <RNPickerSelect
                            placeholder = {{ label: 'Select industry' }}
                            style = {{ color: '#fafafa', margin: 5 }}
                            onValueChange = {(industry) => this.setState({industry})}
                            items = {[
                                { label: 'Activities of Private Households as Employers', value: 'activities of private households as employers' },
                                { label: 'Accommodation and Food Service Activities', value: 'accommodation and food service activities' },
                                { label: 'Administration and Support Service Activites', value: 'administration and support service activities' },
                                { label: 'Education', value: 'education' },
                                { label: 'Human Health and Social Work Activites', value: 'human health and social work activities' },
                                { label: 'Real Estate Activites', value: 'real estate activities' },
                                { label: 'Professional, Scientific, and Technical Services', value: 'professional, scientific, and technical services' },
                                { label: 'Arts, Entertainment, and Recreation', value: 'arts, entertainment, and recreation' },
                                { label: 'Wholesale and Retail Trade', value: 'wholesale and retail trade' },
                                { label: 'Construction', value: 'construction' },
                                { label: 'Manufacturing', value: 'manufacturing' },
                                { label: 'Information and Communication', value: 'information and communication' },
                                { label: 'Transportation', value: 'Transportation' },
                                { label: 'Mining and Quarrying', value: 'mining and quarrying' },
                                { label: 'Others', value: 'others' },
                            ]}
                        />
                        <View style = {{ flexGrow: 1 }}/>
                        <Text style = {styles.question}>Is the applicant an OFW?</Text>
                        <RadioGroup
                            style = {{ alignSelf: 'flex-start', margin: 5 }}
                            color = '#fafafa'
                            radioButtons = {this.state.data}
                        />
                        <View style = {{ flexGrow: 1 }}/>
                        <TouchableOpacity style = {{ alignSelf: 'stretch' }} onPress = {this.toSummary1.bind(this)}>
                            <View style = {styles.buttonNext}>
                                <Text style = {{ color: '#fafafa' }}>Next</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            );
        }
	}

    toSummary1 = async () => {
        this.setState({
            animating:true,
        })
        const userID = await SecureStore.getItemAsync('userID');
        const { navigate } = this.props.navigation;
        const { navigation } = this.props;  
        let loanPurp = navigation.getParam('loanPurp', '');
        let loanAmt = navigation.getParam('loanAmt', '');
        let fund = navigation.getParam('fund', '');
        let initialResult = navigation.getParam('initialResult', '');
        let existCust = navigation.getParam('existCust', '');

        let selectedButton = this.state.data.find(e => e.selected == true);
        selectedButton = selectedButton ? selectedButton.value : this.state.data[0].label;
        let OFW = selectedButton
        let industry = this.state.industry
        let occupation = this.state.occupation
    
        let estOfw = -0.7014
        let estLoanAmount = -0.8989
        let estIndustry = -0.6707
        let estOccupation = -0.9293
        let estLoanPurp = -0.7313
        let estFundSource = -0.6336
        let intercept = -1.
        let offSet = 633.904
        let factor = 36.0674
        let userScore = 0
        let woeOfw = 0
        let woeLoanAmount = 0
        let woeIndustry = 0
        let woeLoanPurp = 0
        let woeOccupation = 0
        let woeFundSource = 0
    
        if(this.state.employment === '' ||
        this.state.occupation === '' ||
        this.state.industry === ''){
            Alert.alert("Error!","Fields must not be empty!");
        }
        if(OFW == 'Yes') {
            woeOfw = 0.22765
            userScore += 119
        }
        if(OFW == 'No'){
            woeOfw = -0.03168
            userScore += 112
        }
        if(loanAmt > 0 && loanAmt <= 1000000){
            woeLoanAmount = 0.67264
            userScore += 135
        }
        if(loanAmt > 1000000 && loanAmt <= 1500000){
            woeLoanAmount = -0.03579
            userScore += 112
        }
        if(loanAmt > 1500000 && loanAmt <= 3000000){
            woeLoanAmount = -0.10423
            userScore += 110
        }
        if(loanAmt > 3000000) {
            woeLoanAmount = -0.12943
            userScore += 109
        }
        if(industry == 'Activities of Private Households as Employers'){
            woeIndustry = -0.1263
            userScore += 110
        }
        if(industry == 'Accommodation and Food Service Activities' ||
        industry == 'Administrative and Support Service Activities' ||
        industry == 'Education' ||
        industry == 'Human Health and Social Work Activities' ||
        industry == 'Real Estate Activities' ||
        industry == 'Transportation'){
            woeIndustry = 0.2921
            userScore += 120
        }
        if(industry == 'Professional, Scientific and Technical Services' ||
        industry == 'Arts, Entertainment and Recreation' ||
        industry == 'Information and Communication'){
            woeIndustry = -0.0086
            userScore += 113
        }
        if(industry == 'Wholesale and retail Trade' ||
        industry == 'Construction' ||
        industry == 'Manufacturing' ||
        industry == 'Mining and Quarrying'){
            woeIndustry = 0.7113
            userScore += 130
        }
        if(industry == 'Others'){
            woeIndustry = 0.1796
            userScore += 117
        }
        if(loanPurp == 'Acquisition of House and Lot' ||
        loanPurp == 'Acquisition of Lot only' ||
        loanPurp == 'Acquisition of Townhouse'){
            woeLoanPurp = -0.1192
            userScore += 110
        }
        if(loanPurp == 'Acquisition of Condominium'){
            woeLoanPurp = 0.7113
            userScore += 110
        }
        if(loanPurp == 'Construction of House'){
            woeLoanPurp = 0.6165
            userScore += 129
        }
        if(loanPurp == 'Renovation of House' ||
        loanPurp == 'Others') {
            woeLoanPurp = 0.7113
            userScore += 132
        }
        if(occupation == 'Clerical Support' ||
        occupation == 'Craft and Related Trade' ||
        occupation == 'Armed Forces' ||
        occupation == 'Service and Sales'){
            woeOccupation = -0.4441
            userScore += 98
        }
        if(occupation == 'Professional' ||
        occupation == 'Manager'){
            woeOccupation = 0.0932
            userScore += 116
        }
        if(occupation == 'Technician or Associate Professional'){
            woeOccupation = 0.0105
            userScore += 113
        }
        if(occupation == 'Others' ||
        occupation == 'Agriculture' ||
        occupation == 'Pensioner/Retired' ||
        occupation == 'Student' ||
        occupation == 'Unemployed' ||
        occupation == 'Unskilled'){
            woeOccupation = -0.0720
            userScore += 111
        }
        if(fund == 'Salary'){
            woeFundSource = -0.10487
            userScore += 111
        }
        if(fund == 'Business'){
            woeFundSource = 0.57064
            userScore += 126
        }
        if(fund == 'Others') {
            woeFundSource = 0.57064
            userScore += 148
        }
        if(fund == ''){
            userScore == 0
        }
        else{
            offSet = 633.904
            factor = 36.0674
            odds = (-(intercept + ((woeOccupation * estOccupation) + (woeIndustry * estIndustry) + (woeLoanAmount * estLoanAmount) + (woeOfw * estOfw) + (woeFundSource * estFundSource) + (woeLoanPurp * estLoanPurp)))).toFixed(2)
            scaledPD = (1/(1 + (1.00452 * Math.exp(odds)))).toFixed(2)
            userScore = parseInt(offSet + (factor * -Math.log(scaledPD/(1 - scaledPD))))
    
            if(userScore < 672){
                scoreResult = this.state.scoreResult
                riskRating = ''
                scoreResult = 'FAIL'
            }
            else if(userScore >= 731){
                riskRating = 'Superior'
                scoreResult = 'PASS'
            }
            else if(userScore < 731 && userScore >= 700){
                riskRating = 'Very Good'
                scoreResult = 'PASS'
            }
            else if(userScore < 700 && userScore >= 690){
                riskRating = 'Good'
                scoreResult = 'PASS'
            }
            else if(userScore < 690 && userScore >=680){
                riskRating = 'Satisfactory'
                scoreResult = 'PASS'
            }
            else if(userScore < 680 && userScore >= 670){
                riskRating = 'Fair'
                scoreResult = 'PASS'
            }
            else if(userScore < 670 && userScore >= 660){
                riskRating = 'Poor'
                scoreResult = 'PASS'
            }
            else if(userScore < 660 && userScore >=650){
                riskRating = 'Very Poor'
                scoreResult = 'PASS'
            }

            

            axios
                .post('https://ofbank.herokuapp.com/lending/2', {
                    userID:userID,
                    employment:this.state.employment,
                    occupation:this.state.occupation,
                    industry:this.state.industry,
                    scoreResult: scoreResult,
                    userScore: userScore,
                    PD: scaledPD
                })
                .then(response => {
                    this.setState({
                        animating:false,
                    });
                    // console.log(response.data);
                    if (response.data.message === 'OK') {
                        navigate('Summary1', {  
                            riskRating: riskRating,
                            scoreResult: scoreResult,
                            userScore: userScore,
                            PD: scaledPD,
                            initialResult: initialResult,
                            existCust: existCust
                        })
                    }
                })
                .catch(error => {
                    console.log(error.response);
                });
    
            // navigate('Summary1', {  
            //     riskRating: riskRating,
            //     scoreResult: scoreResult,
            //     userScore: userScore,
            //     PD: scaledPD,
            //     initialResult: initialResult,
            //     existCust: existCust
            // })
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
		alignItems: 'flex-start',
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
	},
	question: {
		color: '#fafafa',
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
    activityContainer: {
		flex: 1,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF88',
	},
});

export default Lending_2;