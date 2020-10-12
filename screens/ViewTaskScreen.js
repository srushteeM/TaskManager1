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
    ScrollView,
FlatList} from 'react-native';
    import { ListItem } from 'react-native-elements'

import db from '../config';
import firebase from 'firebase';

export default class ViewTaskScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId:firebase.auth().currentUser.email,
            taskList:[]
        }
        this.requestRef= null
    }
    getTaskList =()=>{
        this.requestRef = db.collection("task_list").where("user_id","==",this.state.userId)
        .onSnapshot((snapshot)=>{
          var taskList = snapshot.docs.map((doc) => doc.data())
          this.setState({
            taskList : taskList
          });
        })
      }
    
      componentDidMount(){
        this.getTaskList()
      }
    
      componentWillUnmount(){
        this.requestRef();
      }
      keyExtractor = (item, index) => index.toString()

      renderItem = ( {item, i} ) =>{
        return (
          <ListItem
            key={i}
            title={item.task}
            subtitle={item.date}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            rightElement={
                <TouchableOpacity style={styles.button}>
                  <Text style={{color:'#ffff'}}>Done</Text>
                </TouchableOpacity>
              }
            bottomDivider
          />
        )
      }
    render() {
        return(
            <View style={{flex:1}}>
          {
            this.state.taskList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Tasks Pending</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.taskList}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
        )
    }
}
const styles = StyleSheet.create({
    subContainer:{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       }
    }
  })
  