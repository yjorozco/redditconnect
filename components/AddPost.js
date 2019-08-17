import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {  postSubmit } from '../redux/actions/actions';
import { withNavigation } from 'react-navigation';

class AddPost extends React.Component {

    constructor(props){
        super(props);
        this.handleTitleUpdate = this.handleTitleUpdate.bind(this);
        this.handleDescriptionUpdate = this.handleDescriptionUpdate.bind(this);       
    }
    checkValidation = () =>{
        (this.state.title=="" || this.state.description=="")?this.setState({disabled:true}):this.setState({disabled:false});
    }

    handleTitleUpdate = async (title) =>{
        await this.setState({title});
        await this.checkValidation();
    }
    handleDescriptionUpdate = async (description) =>{
        await this.setState({description});
        await this.checkValidation();
    }
    state = {
        title:"",
        description:"",
        disabled:true,
    }
    submitPost = async () =>{
     
        const info = {
            title: this.state.title,
            description: this.state.description,
            token: this.props.token
        }

        await this.props.submitPost(info);
        if(await this.props.submit.ok){
            await this.props.postReddit()
            await this.props.navigation.goBack();
        }else{
            await this.props.navigation.navigate('Login');
        }

    }
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.card}>
              
                    <Text style={styles.label}>Add Post</Text>
                    <Text style={styles.err}>{this.props.err}</Text>
                    <Text style={styles.label}>Title:</Text>
                    <TextInput style={styles.text} 
                        placeholder="Title"
                        autoCapitalize="none"   
                        onChangeText={this.handleTitleUpdate} 
                        value={this.state.title}                    
                    />
                    <Text style={styles.label}>Description:</Text>
                    <TextInput style={styles.text}
                        placeholder="Description"
                        autoCapitalize="none"
                        multiline = {true}
                        numberOfLines = {4}  
                        onChangeText={this.handleDescriptionUpdate}     
                        value={this.state.description}                       
                    />
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity = { .5 }   
                        disabled={this.state.disabled}   
                        onPress = {this.submitPost}                  
                    >
                        <Text style={styles.butttonText} > Add </Text>                            
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state =>({   
    token: state.user.token, 
    submit: state.submit
})

const mapDispatchToProps = (dispatch) => ({
    submitPost: (info) => dispatch(postSubmit(info)),
    postReddit: () => dispatch(postReddit()),
    
})


export default connect(mapStateToProps,mapDispatchToProps )(withNavigation(AddPost));

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        flex:1,
        alignItems: 'center',
        backgroundColor:"#8F05FF",
    },
    top:{
        alignItems:'center',
        justifyContent:'center',
        paddingTop:15,
        paddingBottom:15,
        width: "70%",
   
    },
    card:{
       alignItems:'stretch',
       justifyContent:'center',
       backgroundColor:"#8F05FF",
       paddingTop:15,
       paddingBottom:15,
       width: "70%",
       borderColor:"white",
       borderRadius:10,
       borderWidth: 1, 
    },
    err:{
        textAlign:'center',
        color:'white',
        paddingTop:5,
        paddingBottom:5,
    },
    text:{
        textAlign:'center',
        backgroundColor:'white',
        paddingTop:5,
        paddingBottom:5,
        marginLeft:30,
        marginRight:30,
       
    },
    label: {
        textAlign:'center',
        paddingTop:5,
        paddingBottom:5,
        fontSize: 18,
        color: "white"
    },
    butttonText: {
        textAlign:'center', 
        color: "white"    
    },
    button:{
        marginTop:10,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:30,
        marginRight:30,
        backgroundColor:"#8F05FF",
        borderRadius:10,
        borderWidth: 1,
        textAlign:'center',
        borderColor: '#fff',
 
    },
    image: {
        justifyContent:"center",
        width: 50, 
        height: 50,
        paddingBottom:15,
    },

})