import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, SafeAreaView, FlatList, Image, Button } from 'react-native';

export default function App() {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      const products = await response.json();
      setLoading(false);
      setProducts(products);

    }

    fetchData()
  }, []);

  const renderProductItem = ({item, index}) => {
    const {title, price, image, category} = item;
    return (
      <SafeAreaView>
        <View style={{ width: 150, height: 400, borderWidth: 1, borderColor: '#ccc', borderRadius: 10, margin: 8, padding: 15}}>
          <Image
            style={{width: '100%', height: 150}}
            source={{uri: image}}
            resizeMode="contain"
          />
          <View style={{marginTop: 16}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{title.slice(0,40)}</Text>
            <Text style={{marginTop: 4}}>{`category: ${category}`}</Text>
            <Text style={{marginTop: 4}}>{`Price: ${price}`}</Text>
            <Button
              title="Learn More"
              color="#841584"
              style
            />
          </View>
        </View>
      </SafeAreaView>

      
    )
  }
  
  if(loading){
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={'orange'}/>
      </View>
    )
  }


  return (
    <SafeAreaView style={styles.container}>
      <Text style={{marginTop: 50, color: '#F94892',backgroundColor: '#92A9BD', paddingHorizontal: 50, paddingVertical: 10, borderRadius: 10, fontSize: 30, fontWeight: 'bold'}}>Our Degital Shop</Text>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{padding: 20}}
        numColumns={2}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
