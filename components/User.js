import React from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import moment from "moment";


class User extends React.Component {

    constructor(props){
        super(props);
    }

    

    render(){
        const date = moment.unix(parseInt(this.props.me.created)).format("YYYY-MM-DD");
        return (
            <View style={styles.container}> 
                <View style={styles.text}>
                    <Text style={styles.label}>Name:</Text>
                    <Text>{this.props.me.name}</Text>                       
                </View>
                <View style={styles.text}>
                    <Text style={styles.label}>Created:</Text>
                    <Text>{ date } </Text>                      
                </View>                
                <Image style={styles.images} source={{uri:this.props.me.icon_img}} />
            </View>
        )
    }

    
}

const mapStateToProps = state =>({
    me: state.user.me
})

export default connect(mapStateToProps,null )(User);

const styles =  StyleSheet.create({
    container:{
        flex:1,
        paddingTop: 70,       
        backgroundColor:"#8F05FF",
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center"

    },
    text:{
        flexDirection:"row",
        paddingBottom:15  
        
    },
    label:{
        paddingRight:5
        
    },
    images: {
        width: 170, 
        height: 170,
        alignItems:"center"         
    }


})