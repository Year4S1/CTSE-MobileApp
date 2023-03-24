import React , {useState,useEffect} from 'react'
import {StatusBar} from 'expo-status-bar'
import {StyleSheet, Text, View, Button, Linking} from 'react-native'
import {BarCodeScanner } from 'expo-barcode-scanner'

function Qr() {
    const [hasPermission, setHasPermission] = useState(false)
    const [scanData, setScanData] = useState()

    useEffect(()=>{
        (async() =>{
            const {status} = await BarCodeScanner.requestPermissionsAsync()
            setHasPermission(status==="granted")
        })()
    },[])

    if(!hasPermission){
        return(
            <View style={styles.container}>
                <Text>Please grant camera permission</Text>
            </View>
        )
    }

    const handleBarCordeScanner = ({data}) =>{
        setScanData(data)
    }
  return (
    <View style={styles.container}>
                <BarCodeScanner style={StyleSheet.absoluteFillObject} 
                onBarCodeScanned={scanData? undefined: handleBarCordeScanner}
                />
                {
                    scanData && (
                    <>
                    <Button title="scan again" onPress={() => setScanData(undefined)}>Scan Again</Button>
                    <Text>{scanData}</Text>
                    <Button title="Open Link" onPress={() => Linking.openURL(scanData)}>Open Link</Button></>
                )}
                <StatusBar style="auto"></StatusBar>
            </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
        alignItems:'center',
        justifyContent: 'center'
    }
})

export default Qr