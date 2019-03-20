import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    Dimensions,
    Platform,
    ScrollView,
    Alert
} from 'react-native'
import ImagePicker from 'react-native-image-picker'

import { connect } from 'react-redux'
import { addPost } from '../store/actions/posts'

const noUser = 'Você precisa estar logado para adicionar imagens'

class AddPhoto extends Component {
    state = {
        image: null,
        comment: '',
    }

    // call after component update, this.props is updated
    componentDidUpdate = prevProps => {

        // post done
        if (prevProps.loading && !this.props.loading) {
            this.setState({ image: null, comment: '' });
            this.props.navigation.navigate('Feed')
        }
    }

    pickImage = () => {
        if (!this.props.name) {
            Alert.alert('Falha', noUser)
            return
        }

        ImagePicker.showImagePicker({
            title: 'Escolha a imagem',
            maxHeight: 600,
            maxWidth: 800
        }, res => {
            if (!res.didCancel) {
                this.setState({ image: { uri: res.uri, base64: res.data } })
            }
        })
    }

    save = async () => {
        if (!this.props.name) {
            Alert.alert('Falha', noUser)
            return
        }

        this.props.onAddPost({
            id: Math.random(),
            nickname: this.props.name,
            email: this.props.email,
            image: this.state.image,
            comments: [{
                nickname: this.props.name,
                comment: this.state.comment
            }]
        })

        // TODO: remove this two lines, is executed before resp from server
        // this.setState({ image: null, comment: '' })
        // this.props.navigation.navigate('Feed')
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Compartilhe uma imagem</Text>
                    <View styles={styles.imageContainer}>
                        <Image source={this.state.image} style={styles.image} />
                    </View>
                    <TouchableOpacity onPress={this.pickImage} style={styles.button}>
                        <Text style={styles.buttonText}>Escolha a foto</Text>
                    </TouchableOpacity>
                    <TextInput placeholder='Algum comentário na foto ?'
                        style={styles.input} value={this.state.comment}
                        editable={this.props.name != null}
                        onChangeText={comment => this.setState({ comment })} />
                    <TouchableOpacity 
                        onPress={this.save} 
                        disable={this.props.loading} 
                        style={[styles.button, this.props.loading ? styles.buttonDisabled : null]}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center'
  },
  title: {
      fontSize: 20,
      marginTop: Platform.OS === 'ios' ? 30 : 10,
      fontWeight: 'bold'
  },
  imageContainer: {
      width: '90%',
      height: Dimensions.get('window').width * 3 / 4,
      backgroundColor: '#EEE',
      marginTop: 10
  },
  image: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').width * 3 / 4,
      resizeMode: 'center'
  },
  button: {
      marginTop: 30,
      padding: 10,
      backgroundColor: '#4286F4'
  },
  buttonText: {
      fontSize: 20,
      color: '#FFF'
  },
  buttonDisabled: {
    backgroundColor: '#AAA'
  },
  input: {
      marginTop: 20,
      width: '90%'
  }
})

const mapStateToProps = ({ user, posts }) => {
    return {
        email: user.email,
        name: user.name,
        loading: posts.isUploading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPost: post => dispatch(addPost(post)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPhoto)