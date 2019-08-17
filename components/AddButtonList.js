import React from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity  } from 'react-native';
import { withNavigation } from 'react-navigation';

class AddButtonList extends React.Component {
    constructor(props){
      super(props);
      this._onPressButton = this._onPressButton.bind(this);
    }
    _onPressButton = () => {
      this.props.navigation.navigate('AddPost');
    }

  render() {
    return (
        <TouchableOpacity style={this.props.styles.touch} onPress={this._onPressButton} > 
          <Image  style={this.props.styles.image}  source={require('../assets/add_blue.jpg')}  />
        </TouchableOpacity>
    )
  }
}

// withNavigation returns a component that wraps MyBackButton and passes in the
// navigation prop
export default withNavigation(AddButtonList);
