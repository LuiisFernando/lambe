import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

import { login } from '../store/actions/user'

import commonStyle from '../commonStyle'

class Login extends Component {
    state = {
        name: '',
        email: '',
        password: '',
    }

    componentDidUpdate = prevProps => {
        if (prevProps.isLoading && !this.props.isLoading) {
            this.props.navigation.navigate('Profile')
        }
    }

    login = () => {
        this.props.onLogin({...this.state})
        // this.props.navigation.navigate('Profile')
    }

    render() {
        return (
            <View style={styles.container}>

                <TextInput placeholder="Email" style={styles.input}
                    autoFocus={true} keyboardType='email-address'
                    value={this.state.email} onChangeText={email => this.setState({ email })} />

                <TextInput placeholder="Senha" style={styles.input}
                    secureTextEntry={true}  value={this.state.password} 
                    onChangeText={password => this.setState({ password })} />

                <TouchableOpacity onPress={this.login} style={[styles.button, { marginTop: 30 }]}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('Register')
                }} style={styles.button}>
                    <Text style={styles.buttonText}>Criar nova conta</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
      ...commonStyle.container
  },
  button: {
      ...commonStyle.button
  },
  buttonText: {
      textAlign: 'center',
      fontSize: 20,
      color: '#FFF'
  },
  input: {
      ...commonStyle.input
  }
})

const mapStateToProps = ({ user }) => {
    return {
        isLoading: user.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // user as parameter get the actionCreator login and send it to all reducers
        onLogin: user => dispatch(login(user)) 
    }
}

//connecting the component with redux and call the component
export default connect(mapStateToProps, mapDispatchToProps)(Login)