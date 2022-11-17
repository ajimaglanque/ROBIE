import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, BackHandler, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import flatListData from '../data/flatListData';

class FlatListItem extends React.Component {
	render() {
		return (
			<View style = {styles.item}>
				<Image 
					style = {styles.logo}
					resizeMode = 'contain'
					source = {this.props.item.image}
				/>
				<Text style = {styles.name}>
					{this.props.item.name}
				</Text>
				<Icon
					style = {styles.arrow}
					name = 'angle-right'
					size = {15}
					color = '#035'
				/>
			</View>
		);
	}
}

class CashInScreen extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			bank: '',
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

	render() {
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
                <Text style = {styles.title}>Cash In via</Text>
                <View style = {styles.box}>
                	<FlatList
                		data = {flatListData}
                		renderItem = {({index, item}) => {
                			return(
                				<TouchableOpacity onPress = {() => this.props.navigation.navigate('CashIn1', {
                					bankLogo: item.image,
                					bankName: item.name,
                				})}>
	                				<FlatListItem
	                					item = {item}
	                					index = {index}
	                				/>
                				</TouchableOpacity>
                			);
                		}}
                	/>
                </View>
            </LinearGradient>
		);
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
		fontSize: 20,
		fontWeight: 'bold',
	},
	box: {
		flex: 1,
		alignSelf: 'stretch',
		margin: 20,
		padding: 10,
		backgroundColor: 'white',
		borderRadius: 5,
		shadowRadius: 3,
		shadowOpacity: 0.8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
	},
	item: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	logo: {
		width: 50,
		height: 50,
		margin: 5,
	},
	name: {
		flex: 1,
		margin: 5,
		color: '#035',
	},
	arrow: {
		margin: 5,
	}
});

export default CashInScreen;