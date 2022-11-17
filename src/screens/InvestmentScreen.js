import React from 'react';
import { ActivityIndicator,ImageBackground, StyleSheet, Text, View, TextInput, Slider, FlatList, TouchableOpacity, Alert, BackHandler } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RadioGroup, CheckBox } from 'react-native-btr';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

class InvestmentScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            animating:false,
            valueQ1: 0,
            sliderQ1: 0,
            valueQ2: 0,
            sliderQ2: 0,
            CASA: 0,
            timeDeposit: 0,
            governmentBonds: 0,
            PHStocks: 0,
            risk: 0,
            allocationReturn: 0,
            radioButtonsQ3: [
                {
                    label: 'Protect the value of your money',
                    value: 0.25,
                    color: '#035',
                    checked: true
                },
                {
                    label: 'Generate income',
                    value: 1.00,
                    color: '#035',
                },
                {
                    label: 'Increase the value of your money',
                    value: 0.75,
                    color: '#035',
                },
                {
                    label: 'Preserve the value of money for next generation',
                    value: 0.50,
                    color: '#035',
                },
            ],
            radioButtonsQ4: [
                {
                    label: 'I prefer investment products with minimal risk and short investment horizon',
                    value: 0.10,
                    color: '#035',
                    checked: true
                },
                {
                    label: 'I want higher potential returns on investment that are higher than the regular traditional deposit products',
                    value: 0.50,
                    color: '#035',
                },
                {
                    label: 'I am willing to accept more risk for a portfolio that can provide appreciation of capital over time',
                    value: 0.70,
                    color: '#035',
                },
            ],
            radioButtonsQ5: [
                {
                    label: 'Inexperienced',
                    color: '#035',
                    checked: true
                },
                {
                    label: 'Slightly inexperienced',
                    color: '#035',
                },
                {
                    label: 'Somewhat experienced',
                    color: '#035',
                },
                {
                    label: 'Experienced',
                    color: '#035',
                },
            ],
            checkBoxQ6: [
                {
                    title: 'Bank Deposit Products',
                    value: 0.10,
                },
                {
                    title: 'Foreign Currency',
                    value: 0.50,
                },
                {
                    title: 'Government Security',
                    value: 0.10,
                },
                {
                    title: 'Corporate Bonds/Commercial Pages',
                    value: 0.25,
                },
                {
                    title: 'Stock/Equities',
                    value: 0.80,
                },
                {
                    title: 'Mutual Funds',
                    value: 0.30,
                },
                {
                    title: 'Cryptocurency',
                    value: 1.00,
                },
            ],
            radioButtonsQ7: [
                {
                    label: 'Short-term (Less than 1 year)',
                    value: 0.20,
                    color: '#035',
                    checked: true
                },
                {
                    label: 'Medium-term (1 to 5 years)',
                    value: 0.50,
                    color: '#035',
                },
                {
                    label: 'Long-term (Over 5 years)',
                    value: 1.00,
                    color: '#035',
                },
            ],
            radioButtonsQ8: [
                {
                    label: 'Not important',
                    value: 1.00,
                    color: '#035',
                    checked: true
                },
                {
                    label: 'Slightly important',
                    value: 0.75,
                    color: '#035',
                },
                {
                    label: 'Moderately important',
                    value: 0.50,
                    color: '#035',
                },
                {
                    label: 'Very important',
                    value: 0.25,
                    color: '#035',
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

    onChangeQ1(valueQ1) {
        console.log(valueQ1)
        if (valueQ1 == '') {
            valueQ1 = 0;
        }
        this.setState(() => {
            return {
                valueQ1: valueQ1
            };
        });
    }

    onChangeQ2(valueQ2) {
        if (valueQ2 == '') {
            valueQ2 = 0;
        }
        this.setState(() => {
            return {
                valueQ2: parseFloat(valueQ2)
            };
        });
    }

    toggle = index => {
        const checkBoxQ6 = [...this.state.checkBoxQ6];
        const item = checkBoxQ6[index];
        item.checked = !item.checked;
        this.setState({checkBoxQ6});
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


    renderItem = ({item, index}) =>
        <View style = {{ flexDirection: 'row', margin: 5 }}>
            <CheckBox
                checked = {item.checked}
                color = '#035'
                onPress = {() => this.toggle(index)}
            />
            <Text style = {{ color: '#035', margin: 5 }}>{item.title}</Text>
        </View>

    keyExtractor = (item, index) => item.title + index;

    submit = () => {
        this.setState({
            animating:true,
        })
        this.setState({
            valueQ1:this.formatBeforeSubmit(this.state.valueQ1)
        },() => {
            let amountQ1 = this.state.valueQ1;

            let answerQ2 = 0;
            if(this.state.valueQ2 < 25) {
                answerQ2 = 1.00;
                id = 1;
            } else {
                if(this.state.valueQ2 < 51) {
                    answerQ2 = 0.75;
                    id = 2;
                } else {
                    if (this.state.valueQ2 < 76) {
                        answerQ2 = 0.5;
                        id = 3;
                    } else {
                        answerQ2 = 0.25;
                        id = 4;
                    }
                }
            }

            let answerQ3 = this.state.radioButtonsQ3.find(e => e.checked == true);
            answerQ3 = answerQ3 ? answerQ3.value : this.state.radioButtonsQ3[0].value;
            let answerQ4 = this.state.radioButtonsQ4.find(e => e.checked == true);
            answerQ4 = answerQ4 ? answerQ4.value : this.state.radioButtonsQ4[0].value;
            let answerQ5 = this.state.radioButtonsQ5.find(e => e.checked == true);
            answerQ5 = answerQ5 ? answerQ5.value : this.state.radioButtonsQ5[0].value;

            let sum = 0;
            let counter = 0;
            for(i = 0; i < 7; i++) {
                if(this.state.checkBoxQ6[i].checked == true) {
                    sum += this.state.checkBoxQ6[i].value;
                    counter++;
                }
            }
            answerQ6 = sum / counter;

            let answerQ7 = this.state.radioButtonsQ7.find(e => e.checked == true);
            answerQ7 = answerQ7 ? answerQ7.value : this.state.radioButtonsQ7[0].value;
            let answerQ8 = this.state.radioButtonsQ8.find(e => e.checked == true);
            answerQ8 = answerQ8 ? answerQ8.value : this.state.radioButtonsQ8[0].value;

            userScore = ((answerQ2 + answerQ3 + answerQ4 + answerQ6 + answerQ7 + answerQ8) / 6) * 100;
            userScore = userScore.toFixed(2);

            if(userScore < 11) {
                idScore = 10;
            } else {
                if(userScore < 21) {
                    idScore = 20;
                } else {
                    if(userScore < 31) {
                        idScore = 30;
                    } else {
                        if(userScore < 41) {
                            idScore = 40;
                        } else {
                            if(userScore < 51) {
                                idScore = 50;
                            } else {
                                if(userScore < 61) {
                                    idScore = 60;
                                } else {
                                    if(userScore < 71) {
                                        idScore = 70;
                                    } else {
                                        if(userScore < 81) {
                                            idScore = 80;
                                        } else {
                                            if(userScore < 91) {
                                                idScore = 90;
                                            } else {
                                                idScore = 100;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            
            userID = `${id}-${idScore}`;
            console.log('userID: ' + userID);

            axios
                .get('http://ofbank.herokuapp.com/investments', {
                    params: {
                        userID: userID,
                    },
                })
                .then((response) => {
                    this.setState({
                        animating:false
                    });
                    if((response.data.message === 'Connection is closed.') || response.data.name === 'ConnectionError') {
                        Alert.alert('Error!', 'Connection to the server is closed.');
                    } else if(response.data.name === 'RequestError') {
                        Alert.alert('Error!', 'Request error.');
                    } else {
                        this.setState({
                            CASA: response.data.result[0].CASA,
                            timeDeposit: response.data.result[0].timeDeposit,
                            governmentBonds: response.data.result[0].governmentBonds,
                            PHStocks: response.data.result[0].philippineStocks,
                            risk: response.data.result[0].risk,
                            allocationReturn: response.data.result[0].allocation_return,
                        });

                        finCASA = amountQ1 * this.state.CASA;
                        finTimeDep = amountQ1 * this.state.timeDeposit;
                        finGovBonds = amountQ1 * this.state.governmentBonds;
                        finPHStocks = amountQ1 * this.state.PHStocks;
                        
                        this.props.navigation.navigate('Invest1', {
                            inputQ1: amountQ1,
                            score: userScore,
                            userID: userID,
                            CASA: this.state.CASA,
                            timeDep: this.state.timeDeposit,
                            govBonds: this.state.governmentBonds,
                            PHStocks: this.state.PHStocks,
                            finCASA: finCASA,
                            finTimeDep: finTimeDep,
                            finGovBonds: finGovBonds,
                            finPHStocks: finPHStocks,
                            risk: this.state.risk,
                            allocationReturn: this.state.allocationReturn,
                        })
                    }
                })
                .catch(error => {
                    this.setState({
                        animating:false
                    });
                    if((error.response.data.message == 'Not valid account') && error.response.status == '400') {
                        Alert.alert('Error!', 'Not a valid account.');
                    } else if(error.response.status == '500') {
                        Alert.alert('Error!', 'Cannot connect to the server.');
                    } else {
                        console.log(error.response);
                    }
                });
        });
    }

    render() {
        if(this.state.animating){
            return (
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
                    <Icon
                        style = {styles.icon}
                        name = 'bars'
                        size = {30}
                        color = '#fafafa'
                        onPress = {() => this.props.navigation.openDrawer()}
                    />
                    <Text style = {styles.title}>Robie</Text>
                    <View style = {styles.box}>
                        <KeyboardAwareScrollView enableOnAndroid = {true}>
                            <Text style = {styles.question}>
                                1. Amount in PHP you are willing to invest per year?
                            </Text>
                            <View style = {{ flexDirection: 'row', margin: 5 }}>
                                <Text>₱ </Text>
                                <TextInput
                                    style = {styles.text}
                                    keyboardType = 'numeric'
                                    maxLength = {8}
                                    value = {
                                        this.numberWithCommas(this.state.valueQ1)
                                    }
                                    onChangeText = {this.onChangeQ1.bind(this)}
                                />
                            </View>
                            <Slider
                                style = {{ margin: 5 }}
                                step = {1000}
                                maximumValue = {10000000}
                                value = {this.state.valueQ1}
                                onValueChange = {this.onChangeQ1.bind(this)}
                            />
                            <Text style = {styles.question}>
                                2. Of this amount, what percentage are you willing to allocate on investments readily converted to cash?
                            </Text>
                            <View style = {{ flexDirection: 'row', margin: 5 }}>
                                <TextInput
                                    style = {styles.text}
                                    keyboardType = 'numeric'
                                    maxLength = {3}
                                    maximumValue = {100}
                                    value = {this.state.valueQ2.toString()}
                                    onChangeText = {this.onChangeQ2.bind(this)}
                                />
                                <Text>%</Text>
                            </View>
                            <Slider
                                style = {{ margin: 5 }}
                                step = {1}
                                maximumValue = {100}
                                value = {this.state.valueQ2}
                                onValueChange = {this.onChangeQ2.bind(this)}
                            />
                            <Text style = {styles.question}>
                                3. What is your main goal in making this investment?
                            </Text>
                            <RadioGroup
                                style = {{ margin: 5 }}
                                color = '#035'
                                radioButtons = {this.state.radioButtonsQ3}
                            />
                            <Text style = {styles.question}>
                                4. Which statement best describes your attitude towards the level of risk you are willing to take for the duration of your investment?
                            </Text>
                            <RadioGroup
                                style = {{ margin: 5 }}
                                color = '#035'
                                radioButtons = {this.state.radioButtonsQ4}
                            />
                            <Text style = {styles.question}>
                                5. When it comes to investing, would describe yourself as:
                            </Text>
                            <RadioGroup
                                style = {{ margin: 5 }}
                                color = '#035'
                                radioButtons = {this.state.radioButtonsQ5}
                            />
                            <Text style = {styles.question}>
                                6. I am currently invested or have previously invested in the following:
                            </Text>
                            <FlatList
                                data = {this.state.checkBoxQ6}
                                extraData = {this.state}
                                renderItem = {this.renderItem}
                                keyExtractor = {this.keyExtractor}
                            />
                            <Text style = {styles.question}>
                                7. For how long are you willing to allow your funds to stay invested?
                            </Text>
                            <RadioGroup
                                style = {{ margin: 5 }}
                                color = '#035'
                                radioButtons = {this.state.radioButtonsQ7}
                            />
                            <Text style = {styles.question}>
                                8. How important liquidity is to you?
                            </Text>
                            <RadioGroup
                                style = {{ margin: 5 }}
                                color = '#035'
                                radioButtons = {this.state.radioButtonsQ8}
                            />
                            <TouchableOpacity style = {{ alignSelf: 'stretch', marginBottom: 20 }} onPress = {this.submit.bind(this)}>
                                <View style = {styles.buttonDone}>
                                    <Text style = {{ color: '#fafafa' }}>Done</Text>
                                </View>
                            </TouchableOpacity>
                        </KeyboardAwareScrollView>
                    </View>
                </ImageBackground>
            );
        }
        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    icon: {
        alignSelf: 'flex-start',
        marginTop: 30,
        marginLeft: 20,
    },
    title: {
        color: '#fafafa',
        fontSize: 25,
        fontWeight: 'bold',
    },
    box: {
        flex: 1,
        alignSelf: 'stretch',
        margin: 20,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#000',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
    },
    question: {
        color: '#035',
        fontWeight: 'bold',
        margin: 5,
    },
    text: {
        textAlign: 'center',
        borderColor: '#888',
        borderBottomWidth: 0.5,
        width: '30%',
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
    activityContainer: {
		flex: 1,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF88',
	},
});

export default InvestmentScreen;