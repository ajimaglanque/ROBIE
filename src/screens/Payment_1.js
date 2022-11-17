import React from 'react';
import { ImageBackground, StyleSheet, Text, View, FlatList, Image, TouchableOpacity, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import flatListData from '../data/paymentData';

class FlatListItem extends React.Component {
	render() {
		return (
			<Image
				style = {styles.logo}
				resizeMode = 'contain'
				source = {this.props.item.image}
			/>
		);
	}
}

class Payment_1 extends React.Component {
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
        this.props.navigation.navigate('Payment');
        return true;
    };

	render() {
		const { navigation } = this.props;
		let bname = JSON.parse(JSON.stringify(navigation.getParam('billerName', '')));
		return (
			<ImageBackground source = {require('../images/background.png')} style = {styles.container}>
				<Icon
					style = {styles.icon}
					name = 'angle-left'
					size = {30}
					color = '#fafafa'
					onPress = {() => this.props.navigation.navigate('Payment')}
				/>
				<Text style = {styles.title}>{bname}</Text>
				<View style = {styles.box}>
					<FlatList
						numColumns = {3}
						data = {flatListData}
						showVerticalScrollIndicator = {false}
						renderItem = {({index, item}) => {
							if(item.type === bname) {
								return(
									<TouchableOpacity style = {styles.icobox} onPress = {() => this.props.navigation.navigate('Payment2', {
										billerName: item.name,
										billerLogo: item.image,
									})}>
										<FlatListItem
											item = {item}
											index = {index}
										/>
									</TouchableOpacity>
								);	
							}
						}}
					/>
				</View>
			</ImageBackground>
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
		fontSize: 25,
		fontWeight: 'bold',
	},
	box: {
		width: '90%',
		height: '50%',
		justifyContent: 'space-around',
        backgroundColor: '#fafafa',
        padding: 10,
        marginTop: 40,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#000',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
	},
	icobox: {
		//flex: 1,
		width: 80,
		height: 80,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 5,
		margin: 3,
	},
	logo: {
		width: '100%',
		height: '100%',
	},
});

export default Payment_1;