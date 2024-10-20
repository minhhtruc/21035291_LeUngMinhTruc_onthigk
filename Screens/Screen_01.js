import React, { useEffect, useState } from 'react'
import { Button, TouchableOpacity } from 'react-native'
import { Text } from 'react-native'
import { Image } from 'react-native'
import { View } from 'react-native'
import { TextInput } from 'react-native-web'
const Screen_01 = ({ navigation })  => {
    const [isLoading, setIsLoading] = useState(false)
    const [account, setAccount] = useState([])


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [showPass, setShowpass] = useState(true)

  

    useEffect(() => {

        getAccount()
          
    }, [])

    const getAccount = async () => {

        const api = `https://6714a313690bf212c761ed78.mockapi.io/dangnhap`

        try {
            setIsLoading(true)
            const response = await fetch(api)

            const json = await response.json()

            setAccount(json)
            console.log(json)

        } catch (error) {
            console.log(error)
            alert('Error', 'Cannot fetch account data at the moment. Please try again later.');
        }
        finally {
            setIsLoading(false)
        }

    }
   

    return (
        <View>
            <View >
                <View

                    style={{ alignItems: 'center', marginVertical: 60 }}
                >

                    <Image
                        source={require("../assets/Data/icon.png")}
                        style={{
                            width: 100,
                            height:100,
                        }}
                    />
                </View>
                <Text
                    style={{
                        alignSelf: 'center',
                        fontSize: 30,
                        fontWeight: 'bold',
                    }}
                >
                    Hello Again
                </Text>
                <Text
                    style={{
                        alignSelf: 'center',
                        fontSize: 15,
                        marginVertical: 20,
                        color: "rgb(205 181 181)"


                    }}
                >
                    Log into your account
                </Text>
            </View>

            <View>

                <View
                    style={{
                        flexDirection: 'row',
                        borderWidth: 1,
                        borderColor: "rgb(205 181 181)",
                        paddingHorizontal: 14,
                        paddingVertical: 12,
                        marginHorizontal: 18,
                        borderRadius: 10,
                        marginBottom: 23,
                        alignItems: 'center'
                    }}
                >
                    <Image source={require('../assets/Data/Vector.png')}
                        style={{ marginRight: 10 }}
                    />
                    <TextInput placeholder='Enter your email address'

                        style={{ width: '100%', outline: 'none' }}
                        value={email}
                        onChangeText={(e) => setEmail(e)}
                    />

                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        borderWidth: 1,
                        borderColor: "rgb(205 181 181)",
                        paddingHorizontal: 14,
                        paddingVertical: 12,
                        marginHorizontal: 18,
                        borderRadius: 10,
                        marginBottom: 23,
                        alignItems: 'center'
                    }}
                >
                    <TouchableOpacity>

                        <Image source={require('../assets/Data/Vector.png')}
                            style={{ marginRight: 10 }}
                        />
                    </TouchableOpacity>

                    <TextInput placeholder='Enter your password'
                        style={{ width: '100%', outline: 'none' }}
                        value={password}
                        onChangeText={(e) => setPassword(e)}
                        secureTextEntry={showPass}
                    />


                    <TouchableOpacity
                        onPress={() => setShowpass(!showPass)}
                    >

                        <Image source={require('../assets/Data/eye.png')} />
                    </TouchableOpacity>

                </View>


            </View>

            <View>
                <TouchableOpacity>

                    <Text
                        style={{
                            alignSelf: 'flex-end',
                            marginRight: 20,
                            color: '#42d1d1',
                            fontSize: 14
                        }}
                    >Forgot password? </Text>
                </TouchableOpacity>
            </View>


            <View>
                <TouchableOpacity
                    style={{

                        backgroundColor: '#42d1d1',
                        alignSelf: 'center',
                        paddingVertical: 14,
                        paddingHorizontal: 148,
                        marginTop: 20,
                        borderRadius: 10
                    }}


                    onPress={() => {
                        if (email && password) {
                            const foundAccount = account.find((item) => item.email === email && item.password === password);

                            if (foundAccount) {
                                navigation.navigate("Screen_02"  );
                            } else {
                                alert("Thông tin đăng nhập không chính xác");
                            }
                        } else {
                            alert("Vui lòng nhập đầy đủ thông tin trước khi đăng nhập");
                        }
                    }}

                >


                    <Text
                        style={{ textAlign: 'center', fontSize: 15, color: '#fff' }}
                    >
                        Continue
                    </Text>

                </TouchableOpacity>


                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 20
                    }}
                >
                    <View style={{ backgroundColor: '#ccc', height: 1, width: 160, marginRight: 5 }}></View>
                    or
                    <View style={{ backgroundColor: '#ccc', height: 1, width: 160, marginLeft: 5 }}></View>

                </View>

                <View
                    style={{ flexDirection: 'row', justifyContent: 'center' }}
                >
                    <Image source={require("../assets/Data/face.png")} />
                    <Image source={require("../assets/Data/google.png")}
                        style={{ marginHorizontal: 10 }}
                    />
                    <Image source={require("../assets/Data/apple.png")} />

                </View>
            </View>
        </View>
    )
}
export default Screen_01