import React from "react";
import {View,Text} from "react-native";
// import {ListItem} from 'native-base';
import * as firebase from 'firebase';
// import firebaseConfig from './dataconn';


const firebaseConfig = {
  apiKey: "AIzaSyDG6wgspWq86fh6vG1CV8NCSFRBCtO9brU",
  authDomain: "fir-rn-77117.firebaseapp.com",
  databaseURL: "https://fir-rn-77117.firebaseio.com",
  projectId: "fir-rn-77117",
  storageBucket: "fir-rn-77117.appspot.com",
  messagingSenderId: "161950307698",
  appId: "1:161950307698:web:10146570a720b5ef5779eb"
};

firebase.initializeApp(firebaseConfig);

import {Container,Header,Content,Form,Item,Input,Label,Button, ListItem,List} from 'native-base'
   export default class App extends React.Component{
         state={
        text:"",
        mylist:[]
      }
     componentDidMount(){
       const myitems=firebase.database().ref("mywishes");
      myitems.on("value",datasnap=>{

if(datasnap.val()){
  this.setState({mylist:Object.values(datasnap.val())})
}
        

      })
     }
     saveitem(){
      //  console.log(this.state.text)
      const myitems=firebase.database().ref("mywishes");

      myitems.push().set({
        text:this.state.text,
        time:Date.now()
      })

      this.setState({text:""})
     }
     removeIt(){
      firebase.database().ref("mywishes").remove()
      this.setState({mylist:[{text:"removed successfuly"}]})
     }

render(){
const myitems=this.state.mylist.map(item=>{
  return(
    <ListItem style={{justifyContent:"space-between"}} key={item.time}>
      <Text>{item.text}</Text>
      <Text>{new Date(item.time).toDateString()}</Text>
    </ListItem>
  )
})

  return(

    <View style={{flex:1,backgroundColor:'#fff',paddingTop:10,}}>
       <Item floatingLabel>
         <Label>Username</Label>
         <Input
         value={this.state.text}
         onChangeText={(text)=>this.setState({text})}
         />
       </Item>
       <View flexDirection='row'> 
         <Button style={{padding:10,width:120}} rounded success
         onPress={()=>this.saveitem()}
         >
           <Text style={{color:"white"}}>Save</Text>
         </Button>
    
    <Button style={{padding:20,width:80}} rounded danger
    onPress={()=>this.removeIt()}
    >
           <Text style={{color:"white"}}>Delete</Text>
         </Button>
       </View>
       <List>{myitems}</List>
     </View>
    
       );

}

   }
  
 
