import React,{Component}from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView} from 'react-native';


import db from '../config';
import firebase from 'firebase';

export default class AddTaskScreen extends Component {
    constructor(){
        super ();
        this.state={
            userId:firebase.auth().currentUser.email,
            task:"",
            reminder:""

        }
    }
    createUniqueId(){
        return Math.random().toString(36).substring(7);
      }
    
    addTask=async(task)=>{
        var randomRequestId = this.createUniqueId()
        db.collection("task_list").add({
            "user_id":this.state.userId,
            "task":task,
            "request_id"  : randomRequestId,
            "date"       : firebase.firestore.FieldValue.serverTimestamp()
        })
       
    }
    render() {
        return(
            <View>
                <TextInput
                placeholder="Enter Task"
                onChangeText={(text)=>{
                    this.setState({task:text})
                }}
                value={this.state.task}
                ></TextInput>
                <TextInput
                placeholder="Set time and date for reminder"
                onChangeText={(text)=>{
                    this.setState({reminder:text})
                }}
                value={this.state.reminder}
                ></TextInput>
                <TouchableOpacity
                onPress={()=>{
                    this.addTask(this.state.task);
                    this.setState({task:"",reminder:""})
                }}
                >
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}