import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from './Screen/Home';
import Login from './Screen/Login';
import Signup from './Screen/Signup';
import Splash from './Screen/Splash';
import MyAddress from './Screen/MyAddress';
import MyOrders from './Screen/MyOrders';
import Offers from './Screen/Offers';
import AddAddress from './Screen/AddAddress';
import Checkout from './Screen/Checkout';
import payment from './Screen/payment';
import Logout from './Screen/Logout';

const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name = "Splash" component={Splash}/>
            <Stack.Screen options={{headerShown: false}} name = "Login" component={Login}/>
            <Stack.Screen options={{headerShown: false}} name = "Signup" component={Signup}/>
            <Stack.Screen options={{headerShown: false}} name = "Home" component={Home}/>
            <Stack.Screen options={{headerShown: false}} name = "MyAddress" component={MyAddress}/>
            <Stack.Screen options={{headerShown: false}} name = "MyOrders" component={MyOrders}/>
            <Stack.Screen options={{headerShown: false}} name = "Offers" component={Offers}/>
            <Stack.Screen options={{headerShown: false}} name = "AddAddress" component={AddAddress}/>
            <Stack.Screen options={{headerShown: false}} name = "Checkout" component={Checkout}/>
            <Stack.Screen options={{headerShown: false}} name = "payment" component={payment}/>
            <Stack.Screen options={{headerShown: false}} name = "Logout" component={Logout}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
