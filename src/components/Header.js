import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Platform,
    Image
} from 'react-native'

import icon from '../../assets/imgs/icon.png'

import { connect } from 'react-redux'
import { Gravatar } from 'react-native-gravatar'

class Header extends Component {
    render() {
        const name = this.props.name || 'Anonymous'
        const gravatar = this.props.email ?
            <Gravatar options={{ email: this.props.email, secure: true }}
                style={styles.avatar} />
            : null
        return(
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <Image source={icon} style={styles.image} />
                    <Text style={styles.title}>Lambe Lambe</Text>
                </View>
                <View style={styles.userContainer}>
                    <Text style={styles.user}>{name}</Text>
                    {gravatar}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
      marginTop: Platform.OS === 'ios' ? 20 : 0,
      padding: 20,
      borderBottomWidth: 1,
      borderColor: '#BBB',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between'
  },
  rowContainer: {
      flexDirection: 'row',
      alignItems: 'center'
  },
  image: {
      height: 30,
      width: 30,
      resizeMode: 'contain' // show all the image, not part of image
  },
  title: {
      color: '#000',
      fontFamily: 'shelter', //ios use the name of font and android use the name of file
      height: 30,
      fontSize: 28
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  user: {
      fontSize: 10,
      color: '#888'
  },
  avatar: {
    width: 30,
    height: 30,
    marginLeft: 10
  }
})

const mapStateToProps = ({ user }) => {
    return {
        email: user.email,
        name: user.name
    }
}


export default connect(mapStateToProps)(Header)