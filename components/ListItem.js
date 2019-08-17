import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import { PropTypes } from 'prop-types';

export default class ListItem extends React.Component {
  static propTypes = {
    item: PropTypes.object,

  }
  shouldComponentUpdate(nextProps, nextState){
    if(JSON.stringify(nextProps.item) !== JSON.stringify(this.props.item.data)){
      return true;
    }
    return false;
  }
  componentWillMount() {
    this.setState ({item:this.props.item.data});
  }
    render() {
      const item = this.state.item;  
      return (

          <View key={item.id} style={styles.container}>
            <View style={ styles.subcontainer}>
             {item.thumbnail && <Image  style={{width: 30, height: 30, borderRadius: 60/ 2}} source={{uri:item.thumbnail}}/>}      
              <Text style={styles.fullname}>{item.author_fullname}</Text>
            </View>
            <Text style={styles.text}>{item.title}</Text>
            <Text style={styles.text}>{item.selftext}</Text>          
          </View>
 
      );
    }
  }

  const styles = StyleSheet.create({
        container:{
          flex:1,
          padding: 5,         
        },
        subcontainer:{
          flexDirection: "row",
          paddingBottom: 10
        },
        text:{
          color: "white",
          textAlign: 'justify',
          paddingBottom: 10,
     
        },
        fullname: {
          color: "white",
          paddingLeft: 5
        }
  });

