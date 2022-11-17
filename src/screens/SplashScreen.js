import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const FadeInView = (props) => {
	const [fadeAnim] = useState(new Animated.Value(0))

	React.useEffect(() => {
		Animated.timing(
			fadeAnim,
			{
				toValue: 1,
				duration: 3000,
			}
		).start();
	}, [])

	return (
		<Animated.View 
			style = {{
				...props.style,
				opacity: fadeAnim,
			}}
		>
			{props.children}
		</Animated.View>
	);
}


class SplashScreen extends React.Component {
	isFinished = async() => {
		return new Promise((resolve) => 
			setTimeout(
				() => { resolve('result') },
				5000
			)
		)
	}

	async componentDidMount() {
		const data = await this.isFinished();

		if (data !== null) {
			this.props.navigation.navigate('OFBank');
		}
	}

	render() {
		return (
			<LinearGradient
				colors = {['#035', '#4a545d']}
				style = {styles.container}
			>
				<FadeInView style = {styles.box}>
					<Text style = {styles.title}>
						ROBIE
					</Text>
					<Text style = {{ color: '#fafafa'}}>
						by
					</Text>
					<Image
						style = {{ width: '30%', height: '30%' }}
						resizeMode = 'contain'
						source = {require('../images/SGV.png')}
					/>
				</FadeInView>
			</LinearGradient>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	box: {
		width: '80%',
		height: '50%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 70,
		fontWeight: 'bold',
		color: '#fafafa',
	}
});

export default SplashScreen;