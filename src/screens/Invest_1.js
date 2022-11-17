import React from 'react';
import { ImageBackground, StyleSheet, View, TouchableOpacity, Text, Dimensions, BackHandler } from 'react-native';
import PieChart from 'react-native-pie-chart';
import Icon from 'react-native-vector-icons/FontAwesome5';

class Invest_1 extends React.Component {
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
        this.props.navigation.navigate('Invest');
        return true;
    };

    render() {
        const { navigation } = this.props;
        const inputQ1 = navigation.getParam('inputQ1', 0);
        const score = navigation.getParam('score', 0);
        const userID = navigation.getParam('userID', 0);
        const CASA = navigation.getParam('CASA', 0);
        const timeDep = navigation.getParam('timeDep', 0);  
        const govBonds = navigation.getParam('govBonds', 0);
        const PHStocks = navigation.getParam('PHStocks', 0);
        const finCASA = navigation.getParam('finCASA', 0);
        const finTimeDep = navigation.getParam('finTimeDep', 0);  
        const finGovBonds = navigation.getParam('finGovBonds', 0);
        const finPHStocks = navigation.getParam('finPHStocks', 0);
        const risk = navigation.getParam('risk', 0);
        const allocationReturn = navigation.getParam('allocationReturn', 0);

        let InvestAmt = this.numberWithCommas(parseFloat(inputQ1).toFixed(2))
        let CASAA = this.numberWithCommas(parseFloat(finCASA).toFixed(2))
        let timeDepp = this.numberWithCommas(parseFloat(finTimeDep).toFixed(2))
        let govBondss = this.numberWithCommas(parseFloat(finGovBonds).toFixed(2))
        let PHStockss = this.numberWithCommas(parseFloat(finPHStocks).toFixed(2))

        const series = [CASA, timeDep, govBonds, PHStocks];
        const sliceColor = ['#4caee3','#f27b35','#a8a8a8', '#ffc54e'];

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
                    onPress = {() => this.props.navigation.navigate('Invest')}
                />
                <Text style = {styles.title}>Your Recommended Portfolio</Text>
                <View style = {styles.box}>
                    <View>
                        <View style = {{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style = {[{ fontWeight: 'bold' }, styles.info]}>Amount Invested (PHP)</Text>
                            <Text style = {styles.info}>₱{InvestAmt}</Text>
                        </View>
                        <View style = {{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style = {[{ fontWeight: 'bold' }, styles.info]}>User Score</Text>
                            <Text style = {styles.info}>{score}%</Text>
                        </View>
                    </View>
                    <View style = {{ flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
                        <View style= {{width: '50%'}}>
                            <Text style = {{ fontWeight: 'bold', color: '#035', textAlign: 'center' }}>Return</Text> 
                        </View>
                        <View style= {{width: '50%'}}>
                            <Text style = {{ fontWeight: 'bold', color: '#035', textAlign: 'center' }}>Risk</Text>
                        </View>
                    </View>
                    <View style = {{ flexDirection: 'row', justifyContent: 'center', marginTop: 5}}>
                        <View style =  {{ width: '50%' }}>
                            <Text style = {{ textAlign: 'center', fontWeight: 'bold', color: '#2AC92A' }}>
                                <Icon
                                    name = 'long-arrow-alt-up'
                                    size = {20}
                                    color = '#2AC92A'
                                    padding = {10}
                                /> {allocationReturn}%</Text>                                
                        </View>
                        <View style =  {{ width: '50%' }}>
                            <Text style = {{ textAlign: 'center', fontWeight: 'bold', color: '#C92A2A' }}>
                                <Icon
                                    name = 'long-arrow-alt-down'
                                    size = {20}
                                    color = '#C92A2A'
                                /> {risk}%</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.box}>
                <View style = {{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between'}}>
                        <View style =  {{ width: '40%' }}>
                            <Text style = {{ fontWeight: 'bold', color: '#035', textAlign: 'center', marginBottom: 5 }}>Investment</Text>
                            <Text style = {{ fontWeight: 'bold', color: '#035' }}>CASA</Text>
                            <Text style = {{ fontWeight: 'bold', color: '#035' }}>Time Deposit</Text>
                            <Text style = {{ fontWeight: 'bold', color: '#035' }}>Government Bonds</Text>
                            <Text style = {{ fontWeight: 'bold', color: '#035' }}>Philippine Stocks</Text>
                        </View>
                        <View style =  {{ width: '35%'}}>
                            <Text style = {{ fontWeight: 'bold', color: '#035', textAlign: 'center', marginBottom: 5 }}>Amount</Text>
                            <Text style = {{ color: '#035', textAlign: 'right' }}>₱{CASAA}</Text>
                            <Text style = {{ color: '#035', textAlign: 'right' }}>₱{timeDepp}</Text>
                            <Text style = {{ color: '#035', textAlign: 'right' }}>₱{govBondss}</Text>
                            <Text style = {{ color: '#035', textAlign: 'right' }}>₱{PHStockss}</Text>
                        </View>
                        <View style =  {{ width: '25%' }}>
                            <Text style = {{ fontWeight: 'bold', color: '#035', textAlign: 'center', marginBottom: 5 }}>Allocation</Text>
                            <Text style = {{ color: '#035', textAlign: 'right' }}>{CASA}%</Text>
                            <Text style = {{ color: '#035', textAlign: 'right' }}>{timeDep}%</Text>
                            <Text style = {{ color: '#035', textAlign: 'right' }}>{govBonds}%</Text>
                            <Text style = {{ color: '#035', textAlign: 'right' }}>{PHStocks}%</Text>
                        </View>
                    </View>
                </View>
                <View style = {styles.boxPie}>
                <Text style = {{ color: '#035', fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>Allocation</Text>
                    <View style = {{ marginBottom: 10 }}>
                        <PieChart
                            style = {{ alignSelf: 'center' }}
                            chart_wh = {Dimensions.get('window').width / 2}
                            series = {series}
                            sliceColor = {sliceColor}
                        />
                    </View>
                    <View style = {{ flexDirection: 'row' }}>
                        <View style = {{ flex: 1 }}>
                            <View style = {{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style = {{ width: 10, height: 10, backgroundColor: '#4caee3', margin: 3 }}/>
                                <Text style = {{ color: '#035' }}>CASA</Text>
                            </View>
                            <View style = {{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style = {{ width: 10, height: 10, backgroundColor: '#f27b35', margin: 3 }}/>
                                <Text style = {{ color: '#035' }}>Time Deposit</Text>
                            </View>
                        </View>
                        <View style = {{ flex: 1 }}>
                            <View style = {{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style = {{ width: 10, height: 10, backgroundColor: '#a8a8a8', margin: 3 }}/>
                                <Text style = {{ color: '#035' }}>Government Bonds</Text>
                            </View>
                            <View style = {{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style = {{ width: 10, height: 10, backgroundColor: '#ffc54e', margin: 3 }}/>
                                <Text style = {{ color: '#035' }}>Philippine Stocks</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style = {{ alignSelf: 'stretch'}} onPress = {() => this.props.navigation.navigate('Invest')}>
                    <View style = {styles.buttonDone}>
                        <Text style = {{ color: '#fafafa' }}>Done</Text>
                    </View>
                </TouchableOpacity>
            </ImageBackground>
        );
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
    title: {
        color: '#fafafa',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
    },
    box: {
        alignSelf: 'stretch',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#fafafa',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#000',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
    },
    boxPie: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#fafafa',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#000',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
    },
    info: {
        color: '#035',
    },
    buttonDone: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4b79a1',
        margin: 20,
        marginTop: 0,
        padding: 15,
        borderRadius: 50,
        shadowRadius: 2,
        shadowOpacity: 0.8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
    },
});

export default Invest_1;