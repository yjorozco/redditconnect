import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import List from './List';
import { PropTypes } from 'prop-types';


class Main extends React.Component {

    constructor(props){
        super(props);
 
    }

    static propTypes = {
        props: PropTypes.array,
    }

    render(){
        return (
            <View style={styles.container}>
                { (this.props.posts.length > 0) && <List list={this.props.posts[0].data.children}/>}
            </View>
        )
    }     
}


const mapStateToProps = state =>({
    token: state.user.token,
    posts: state.posts
})

const styles = StyleSheet.create({
    container:{
      flex:1,
      alignContent:'center',
      backgroundColor:"#8F05FF",
   
    },
  });


export default connect(mapStateToProps,null)(Main);