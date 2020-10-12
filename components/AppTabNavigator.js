import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import AddTaskScreen from '../screens/AddTaskScreen';
import ViewTaskScreen from '../screens/ViewTaskScreen';

export const AppTabNavigator = createBottomTabNavigator({
  AddTask : {
    screen: AddTaskScreen,
    navigationOptions :{
     
      tabBarLabel : "Add Tasks",
    }
  },
  ViewTask: {
    screen: ViewTaskScreen,
    navigationOptions :{
    
      tabBarLabel : "View Tasks",
    }
  }
});
