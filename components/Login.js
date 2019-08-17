import  React from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity, Image } from  'react-native'; 
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { logInUser, postReddit, meProfile } from '../redux/actions/actions';


class Login extends React.Component{

    constructor(props){
        super(props);
        this.login = this.login.bind(this);
        this.handleUserNameUpdate = this.handleUserNameUpdate.bind(this);
        this.handleUserPasswordUpdate = this.handleUserPasswordUpdate.bind(this);
        if(this.props.token){
            this.props.navigation.navigate('Main')
        }
      
    }

    static propTypes = {
        err: PropTypes.string,
        token: PropTypes.string,
        logInUser: PropTypes.func,
        meProfile: PropTypes.func
    }


    login = async () =>{
        this.props.logInUser(this.state.username,this.state.password);
        this.setState({
            disabled: true
        })
        
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.token) {
          this.props.postReddit();
          this.props.meProfile(nextProps.token);
          this.props.navigation.navigate('Main');
        }else{
            this.setState({
                disabled: false
            })
        }
    }
    checkValidation = () =>{
        (this.state.username=="" || this.state.password=="")?this.setState({disabled:true}):this.setState({disabled:false});
    }
    handleUserNameUpdate = (username) =>{
        this.setState({username});
        this.checkValidation();
    }
    handleUserPasswordUpdate = (password) =>{
        this.setState({password});
        this.checkValidation();
    }
    state = {
        username:"",
        password:"",
        disabled:true,
    }

    render(){
        
        return(
            <View style={styles.container}>
                <View style={styles.top}> 
                    <Image
                        style={styles.image}
                        source={require('../assets/reddit.png')} />    
                </View>
                <View style={styles.card}>
              
                    <Text style={styles.label}>Login</Text>
                    <Text style={styles.err}>{this.props.err}</Text>
                    <Text style={styles.label}>Username:</Text>
                    <TextInput style={styles.text} 
                        placeholder="Username"
                        value={this.state.username}
                        onChangeText={this.handleUserNameUpdate}
                        autoCapitalize="none"
                    />
                    <Text style={styles.label}>Password:</Text>
                    <TextInput style={styles.text}
                        placeholder="Password"
                        value={this.state.password}
                        onChangeText={this.handleUserPasswordUpdate}
                        autoCapitalize="none"                
                    />
                    <TouchableOpacity disabled={this.state.disabled}
                        style={styles.button}
                        activeOpacity = { .5 }
                        onPress={ this.login}
                        
                    >
                        <Text style={styles.butttonText}> SUBMIT </Text>                            
                    </TouchableOpacity>
                </View>
            </View>
        )
    }



}

const mapStateToProps = state =>({
    err: state.user.loginErr,
    token: state.user.token,
    me: state.user.me
})

const mapDispatchToProps = (dispatch) => ({
    logInUser: (username, password) => dispatch(logInUser(username,password)),
    postReddit: () => dispatch(postReddit()),
    meProfile: (token) => dispatch(meProfile(token))
})

export default connect(mapStateToProps,mapDispatchToProps )(Login);

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
