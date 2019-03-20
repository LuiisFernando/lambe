import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

import { connect } from 'react-redux'
import { createUser } from '../store/actions/user'

import commonStyle from '../commonStyle'

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
    }

    render() {
        return(
            <View style={styles.container}>
            
                <TextInput placeholder="Nome" style={styles.input}
                    autoFocus={true} value={this.state.name} 
                    onChangeText={name => this.setState({ name })} />

                <TextInput placeholder="Email" style={styles.input}
                    keyboardType='email-address' value={this.state.email} 
                    onChangeText={email => this.setState({ email })} />

                <TextInput placeholder="Senha" style={styles.input}
                    secureTextEntry={true}  value={this.state.password} 
                    onChangeText={password => this.setState({ password })} />

                <TouchableOpacity 
                    onPress={() => { this.props.onCreateUser(this.state) }}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Salvar</Text>
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
      color: '#FFF',
      fontSize: 20
  },
  input: {
      ...commonStyle.input,
      paddingLeft: 15
  }
})

const mapDispatchToProps = dispatch => {
    return {
        onCreateUser: user => dispatch(createUser(user))
    }
}

export default connect(null, mapDispatchToProps)(Register)