import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator,StyleSheet, Dimensions, Text, View, TextInput, TouchableOpacity, Alert, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loggedIn: false,
            showError: false,
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
        Alert.alert('Are you sure you want to exit the app?', '', [
            {   
                text: 'Yes',
                onPress: () => {
                    return false;
                }
            },
            {   
                text: 'No',
                onPress: () => {}   
            },
        ]);
        return true;
    };

    loginUser = (e) => {
        this.setState({
            animating:true,
        })
        if (this.state.username === '' || this.state.password === '') {
            Alert.alert('Error!', 'Username/Password cannot be empty!');
        } else {
            e.preventDefault();
            console.log(this.state)
            axios
                .get('https://ofbank.herokuapp.com/loginUser', {
                    params: {
                        username: this.state.username,
                        password: this.state.password,
                    },
                })
                .then(response => {
                    this.storeData(response.data.token)
                    this.storeUserID(response.data.userID)
                    this.setState({
                        loggedIn: true,
                        showError: false,
                        animating:false,
                    });
                    this.props.navigation.navigate('App')
                })
                .catch(error => {
                    console.log(error.response.data)
                    if((error.response.data.message == 'username not found') && error.response.status == '400'){
                        Alert.alert('Error', 'Username not found');    
                    }else if((error.response.data.message == 'passwords do not match') && error.response.status == '400'){
                        Alert.alert('Error', 'Passwords do not match');
                    }else if(error.response.status == '500'||error.response.status == '503'){
                        Alert.alert('Error!', 'Connection to the server is closed');
                    }else{
                        console.log(error.response)
                    }

                    this.setState({animating:false})



                    // if ((error.response.data === 'bad username' || error.response.data === 'passwords do not match') && error.response.status === 400) {
                    //     Alert.alert('Error', 'Incorrect Username/Password');
                    //     this.setState({
                    //         showError: true,
                    //     });
                    // } else {
                    //     console.log(error.response);
                    // }
                });
        }
    };

    isLoading = () => {

    }

    storeData = async (data) => {
        try {
            await SecureStore.setItemAsync('jwtToken', data);
            const token = await SecureStore.getItemAsync('jwtToken');
            console.log(token);
        } catch (e) {
            console.log(e);
        }
    }
    storeUserID = async (data) => {
        try {
            await SecureStore.setItemAsync('userID', data.toString());
            const userID = await SecureStore.getItemAsync('userID');
            console.log(userID);
        } catch (e) {
            console.log(e);
        }
    }

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
                        <Text style = {styles.logo}>ROBIE</Text>
                        <View style = {{ marginBottom: 30 }}>
                            <View style = {styles.inputWrapper}>
                                <Icon
                                    style = {styles.icon}
                                    name = 'user'
                                    size = {20}
                                    color = '#888'
                                />
                                <TextInput
                                    style = {styles.textHolder}
                                    placeholder = 'Username'
                                    placeholderTextColor = '#888'
                                    onChangeText = {(username) => this.setState({username})}
                                    value = {this.state.username}
                                />
                            </View>
                            <View style = {styles.inputWrapper}>
                                <Icon
                                    style = {styles.icon}
                                    name = 'lock'
                                    size = {20}
                                    color = '#888'
                                />
                                <TextInput
                                    style = {styles.textHolder}
                                    placeholder = 'Password'
                                    placeholderTextColor = '#888'
                                    secureTextEntry = {true}
                                    onChangeText = {(password) => this.setState({password})}
    
                                />
                            </View>
                        </View>
                        <TouchableOpacity onPress = {this.loginUser.bind(this)}>
                            <View style = {styles.buttonLogin}>
                                <Text style = {styles.textLogin}>Login</Text>
                            </View>
                        </TouchableOpacity>
                        <Text style = {{ color: '#fafafa' }}>Forgot Password?</Text>
                        <TouchableOpacity onPress = {() => this.props.navigation.navigate('Register')}>
                            <View style = {styles.buttonRegister}>
                                <Text style = {styles.textRegister}>Don't have an account? Sign up.</Text>
                            </View>
                        </TouchableOpacity>
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: 'bold',
        fontSize: 80,
        color: '#9d9ea0',
        marginTop: 70,
        marginBottom: 100,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#aeafb1',
        paddingLeft: 10,
        marginBottom: 10,
        borderRadius: 50,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
    },
    icon: {
        padding: 5
    },
    textHolder: {
        height: 40,
        width: 200,
    },
    buttonLogin: {
        height: 40,
        width: 240,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4b79a1',
        borderRadius: 50,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
    },
    textLogin: {
        textAlign: 'center',
        color: '#fafafa',
    },
    buttonRegister: {
        height: 40,
        width: 240,
        marginTop: 40,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: 'transparent',
    },
    textRegister: {
        textAlign: 'center',
        color: '#fafafa',
    },
    activityContainer: {
		flex: 1,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF88',
	},
})

export default LoginScreen;