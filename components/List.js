import React from 'react';
import { FlatList, StyleSheet,  Dimensions , View } from 'react-native';
import ListItem from './ListItem'
import { PropTypes } from 'prop-types';
import AddButtonList from './AddButtonList';
import LogoutButton from './LogoutButton';


export default class List extends React.Component {

  constructor(props){
    super(props);

  }



  _keyExtractor = (item, index) => {   
    return item.data.id
  } ;                                                      

  static propTypes = {
    list: PropTypes.array,
  }

  FlatListItemSeparator = () => <View style={styles.line} />

  render() {
    return (
      
       <View style={styles.container}>
         <FlatList
          ItemSeparatorComponent={ this.FlatListItemSeparator}
          keyExtractor = {this._keyExtractor}
          data={this.props.list}
          renderItem={({item}) => <ListItem item={item}/>}
        />
        <View style={styles.buttons}>
          <AddButtonList styles = {styles} />
          <LogoutButton styles = {styles} />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    alignContent:'center',
  },
  line: {
    height: 0.5,
    width: "100%",
    backgroundColor:"#0001FF"
  },
  image:{
    width: 40, 
    height: 40,
    borderRadius: 60/ 2,
  },
  touch:{
    position: 'relative', 

  },
  buttons:{
    flexDirection:'row',
    position: 'absolute', 
    marginTop: Dimensions.get('window').height - 210,
    marginLeft: Dimensions.get('window').width - 100
  }
});