import React from 'react';
import { Image, TouchableOpacity  } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { cleanInfo } from '../redux/actions/actions';

class LogoutButton extends React.Component {
    constructor(props){
      super(props);
      this._onPressButton = this._onPressButton.bind(this);
    }
    _onPressButton =  () =>  {
     this.props.cleanInfo();
     this.props.navigation.navigate('Login');

    }

  render() {
    return (
        <TouchableOpacity style={this.props.styles.touch} onPress={this._onPressButton} > 
          <Image  style={this.props.styles.image}  source={require('../assets/logout.png')}  />
        </TouchableOpacity>
    )
  }
}


const mapDispatchToProps = (dispatch) => ({
  cleanInfo: () => dispatch(cleanInfo()),
  
})

export default connect(null,mapDispatchToProps)(withNavigation(LogoutButton));

