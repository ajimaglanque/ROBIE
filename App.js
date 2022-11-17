import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import CreatedScreen from './src/screens/CreatedScreen';
import HomeScreen from './src/screens/HomeScreen';
import CashInScreen from './src/screens/CashInScreen';
import CashIn_1 from './src/screens/CashIn_1';
import LendingScreen from './src/screens/LendingScreen';
import Lending_1 from './src/screens/Lending_1';
import Lending_2 from './src/screens/Lending_2';
import Lending_3 from './src/screens/Lending_3';
import SummaryScreen from './src/screens/SummaryScreen';
import Summary_1 from './src/screens/Summary_1';
import Summary_2 from './src/screens/Summary_2';
import PaymentScreen from './src/screens/PaymentScreen';
import Payment_1 from './src/screens/Payment_1';
import Payment_2 from './src/screens/Payment_2';
import Payment_3 from './src/screens/Payment_3';
import Payment_4 from './src/screens/Payment_4';
import FundTransferScreen from './src/screens/FundTransferScreen';
import Transfer_1 from './src/screens/Transfer_1';
import Transfer_2 from './src/screens/Transfer_2';
import InvestmentScreen from './src/screens/InvestmentScreen';
import Invest_1 from './src/screens/Invest_1';
import TransactionScreen from './src/screens/TransactionScreen';
import LogoutScreen from './src/screens/LogoutScreen';

const AppNavigator = createMaterialBottomTabNavigator(
    {   
        CashIn: {
            screen: CashInScreen,
            navigationOptions: {
                tabBarLabel: 'Cash In',
                tabBarIcon: ({ horizontal, tintColor }) =>
                    <Icon
                        name = 'money-bill'
                        size = { horizontal ? 14 : 19 }
                        color = {tintColor}
                    />
            },
        },
        Lending: {
            screen: LendingScreen,
            navigationOptions: {
                tabBarLabel: 'Lending',
                tabBarIcon: ({ horizontal, tintColor }) =>
                    <Icon
                        name = 'coins'
                        size = { horizontal ? 14 : 19 }
                        color = {tintColor}
                    />
            },
        },
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                tabBarIcon: ({ horizontal, tintColor }) =>
                    <Icon
                        name = 'home'
                        size = { horizontal ? 14 : 19 }
                        color = { tintColor }
                    />
            }
        },
        Payment: {
            screen: PaymentScreen,
            navigationOptions: {
                tabBarIcon: ({ horizontal, tintColor }) =>
                    <Icon
                        name = 'hand-holding-usd'
                        size = { horizontal ? 14 : 19 }
                        color = { tintColor }
                    />
            }
        },
        Invest: {
            screen: InvestmentScreen,
            navigationOptions: {
                tabBarIcon: ({ horizontal, tintColor }) =>
                    <Icon
                        name = 'industry'
                        size = { horizontal ? 14 : 19 }
                        color = { tintColor }
                    />
            }
        },
    },
    {
        initialRouteName: 'Home',
        activeColor: '#4b79a1',
        inactiveColor: 'gray',
        barStyle: { backgroundColor: '#fafafa' },
    }
);

const AppDrawer = createDrawerNavigator(
    {   
        Dashboard: {
            screen: AppNavigator,
            navigationOptions: {
                drawer: 'Dashboard',
                drawerIcon: () => (
                    <Icon
                        name = 'home'
                        color = '#fafafa'
                    />
                )
            }
        },
        Logout: {
            screen: LogoutScreen,
            navigationOptions: {
                drawerLabel: 'Logout',
                drawerIcon: () => (
                    <Icon
                        name = 'sign-out-alt'
                        color = '#fafafa'
                    />
                ),
            },
        },
    },
    {
        initialRouteName: 'Dashboard',
        drawerWidth: '50%',
        drawerBackgroundColor: 'rgba(0, 51, 85, 0.8)',
        contentOptions: {
            activeTintColor: '#fafafa',
            inactiveTintColor: '#fafafa',
            activeBackgroundColor: 'rgba(250, 250, 250, 0.3)',
        }
    }
);

const Authentication = createStackNavigator(
    {   
        Login: LoginScreen,
        Register: RegisterScreen,
        Success: CreatedScreen,
        CashIn1: CashIn_1,
        Lending1: Lending_1,
        Lending2: Lending_2,
        Lending3: Lending_3,
        Summary: SummaryScreen,
        Summary1: Summary_1,
        Summary2: Summary_2,
        Payment1: Payment_1,
        Payment2: Payment_2,
        Payment3: Payment_3,
        Payment4: Payment_4,
        Transfer: FundTransferScreen,
        Transfer1: Transfer_1,
        Transfer2: Transfer_2,
        Invest1: Invest_1,
        Transaction: TransactionScreen,
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none',
        defaultNavigationOptions: {
            gesturesEnabled: false,
        },
    }
);

const StartScreen = createSwitchNavigator(
    {   
        Auth: Authentication,
        App: AppDrawer,
    },
    {
        initialRouteName: 'Auth',
    },
);

const InitialNavigator = createSwitchNavigator(
    {
        Splash: SplashScreen,
        OFBank: StartScreen,
    },
    {
        initialRouteName: 'Splash',
    },
);

const AppContainer = createAppContainer(InitialNavigator);

export default class ROBIE extends React.Component {
    render() {
        return <AppContainer />;
    }
}