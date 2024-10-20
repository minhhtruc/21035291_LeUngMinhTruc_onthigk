import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, Text, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { FlatList, ScrollView, TextInput } from 'react-native'

const Screen_02 = ({ navigation, route }) => {
    const [isLoading, setIsLoading] = useState(false)

    const [listProduct, setListProduct] = useState([])

    const [categories, setCategories] = useState([
        {
            id: 1,
            type: 'Smart Phone',
            image: require('../assets/Data/smart.png')
        },
        {
            id: 2,
            type: 'Ipad',
            image: require('../assets/Data/ipad.png')
        },
        {
            id: 3,
            type: 'MacBook',
            image: require('../assets/Data/macbook.png')
        }
    ])

    const [categorieselected, setCategoriesSelected] = useState(categories[0])
    const [type, setType] = useState("Smart Phone")

    const [seeAll, setSeeAll] = useState(false)

    const [choiBesst, setchoiBesst] = useState('Best Sales')
    useEffect(() => {
        getProduct()
    }, [])
    const getProduct = async () => {

        const api = `https://6714a313690bf212c761ed78.mockapi.io/products`

        try {
            setIsLoading(true)
            const response = await fetch(api)

            const json = await response.json()

            setListProduct(json)
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
        <ScrollView stickyHeaderIndices={[1]}>
            <View style={{ flexDirection: 'row' }}>


                <View style={{
                    flexDirection: 'row',
                    margin: 20,
                    paddingVertical: 10,
                    alignItems: 'center',
                    paddingRight: 90,
                    backgroundColor: '#ddd9d9'

                }}>
                    <TouchableOpacity>

                        <Image source={require("../assets/Data/search.png")}
                            style={{ width: 16, height: 16, marginHorizontal: 10 }}
                        />
                    </TouchableOpacity>
                    <TextInput placeholder='Search' />
                </View>


                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#ddd9d9',
                        paddingHorizontal: 10, paddingVertical: 10,
                        marginVertical: 20

                    }}
                >
                    <Image source={require('../assets/Data/mdi_heart-outline.png')}
                        style={{ width: 30, height: 30 }}

                    />
                </View>
            </View>

            <View>
                <View style={{
                    flexDirection: 'row', alignItems: 'center',

                    marginHorizontal: 20, justifyContent: 'space-between',
                }}>

                    <Text
                        style={{ fontSize: 20, fontWeight: "600" }}
                    >Categories</Text>
                    <Text>
                        See all
                    </Text>
                </View>

            </View>


            {isLoading ?
                <ActivityIndicator />
                :
                (

                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop: 20 }}>

                            {
                                categories.map((category) => (
                                    <TouchableOpacity
                                        style={{
                                            borderWidth: type === category.type ? 2 : 0,
                                            paddingHorizontal: 11,
                                            paddingVertical: 5,
                                            height: 100,
                                            width: 100,
                                            borderColor: type === category.type ? '#fd70fd' : 'rgba(255,255,255,0)',
                                            backgroundColor: type === category.type ? 'pink' : 'rgba(255,255,255,0)',
                                        }}
                                        onPress={() => {
                                            setType(category.type)
                                            setchoiBesst("Best Sales")
                                            setSeeAll(false)
                                        }
                                        }

                                    >

                                        <Image source={category.image} style={{width: 50, height: 50}} />
                                        <Text>{category.type}</Text>
                                    </TouchableOpacity>
                                ))
                            }

                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-evenly',
                                marginTop: 20
                            }}
                        >
                            <TouchableOpacity

                                style={{
                                    backgroundColor: choiBesst === "Best Sales" ? 'pink' : 'rgba(255,255,255,0)',
                                    padding: 10, borderRadius: 10

                                }}

                                onPress={() => setchoiBesst("Best Sales")}
                            >
                                <Text
                                    style={{
                                        color: choiBesst === "Best Sales" ? '#fff' : '000',

                                    }}
                                >
                                    Best Sales
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity

                                style={{
                                    backgroundColor: choiBesst === "Best Matches" ? 'pink' : 'rgba(255,255,255,0)',
                                    padding: 10, borderRadius: 10
                                }}

                                onPress={() => setchoiBesst("Best Matches")}
                            >
                                <Text
                                    style={{
                                        color: choiBesst === "Best Matches" ? '#fff' : '000',

                                    }}
                                >
                                    Best Matches
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity

                                style={{
                                    backgroundColor: choiBesst === "Popular" ? 'pink' : 'rgba(255,255,255,0)',
                                    padding: 10, borderRadius: 10
                                }}

                                onPress={() => setchoiBesst("Popular")}
                            >
                                <Text
                                    style={{
                                        color: choiBesst === "Popular" ? '#fff' : '000',

                                    }}
                                >
                                    Popular
                                </Text>
                            </TouchableOpacity>
                        </View>


                        {isLoading ?
                            <ActivityIndicator />
                            :
                            (
                                <FlatList

                                    data={seeAll ?
                                        listProduct.filter((item) => item.category === type && item.labels.includes(choiBesst))
                                        :
                                        listProduct.filter((item) => item.category === type && item.labels.includes(choiBesst)).slice(0, 3)
                                    }
                                    renderItem={({ item }) => (
                                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 10, borderWidth: 1, borderColor: "#333", marginVertical: 5 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <View>
                                                    <Image
                                                        source={{ uri: item.image }}
                                                        style={{ width: 100, height: 100 }}
                                                    />

                                                </View>
                                                <View>
                                                    <Text style={{ marginVertical: 10 }}>{item.name}</Text>
                                                    {/* <Text style={{ marginVertical: 10 }}>{item.labels}</Text> */}

                                                    <View>
                                                        <Image source={require("../assets/Data/Rating5.png")} />
                                                    </View>
                                                </View>
                                            </View>

                                            <View>
                                                <Image source={require("../assets/Data/solar_inbox-outline.png")} />
                                                <Text>800</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}


                                />
                            )
                        }
                    </View>
                )
            }



            <View>
                <TouchableOpacity
                    style={{
                        alignSelf: 'center',
                        backgroundColor: '#ccc',
                        paddingVertical: 7,
                        paddingHorizontal: 102,
                        borderRadius: 20,
                        marginTop: 10

                    }}
                    onPress={() => {
                        setSeeAll(!seeAll)

                    }
                    }
                >
                    <Text
                        style={{ color: 'white', fontSize: 15 }}
                    >
                        {seeAll ? 'Hide' : 'See All'}
                    </Text>
                </TouchableOpacity>
            </View>


            <View
                style={{
                    marginVertical: 20,
                    marginHorizontal: 10,
                }}
            >
                <Image source={require("../assets/Data/banner.png")}
                    style={{
                        width: '100%',
                        borderRadius: 10
                    }}
                />
            </View> 


            <View 
            style={{flexDirection:'row',alignItems:'end',justifyContent:'space-between',marginHorizontal:'14px'}}
            >
                <View style={{alignItems:'center'}}>
                    <Image source={require('../assets/Data/clarity_home-solid.png')}
                     style={{width:20,height:20}}/>
                    <Text style={{color:'#09c7c7'}}>Home</Text>
                </View>
                <View style={{alignItems:'center'}}>
                    <Image source={require('../assets/Data/search.png')}
                    style={{width:20,height:20}}/>
                    <Text>Search</Text>
                </View>
                <View style={{alignItems:'center'}}>
                    <Image source={require('../assets/Data/mdi_heart-outline.png')}
                    style={{width:20,height:20}}/>
                    <Text>Favorites</Text>
                </View>
                <View style={{alignItems:'center'}}>
                    <Image source={require('../assets/Data/Vector.png')}
                    style={{width:20,height:20}}/>
                    <Text>Inbox</Text>
                </View>
                <View style={{alignItems:'center'}}>
                    <Image source={require('../assets/Data/codicon_account.png')}
                    style={{width:20,height:20}}/>
                    <Text>Account</Text>
                </View>
            </View>
        </ScrollView>
    )
}


export default Screen_02
