import { useEffect } from 'react'
import { StyleSheet, View, Text, Pressable, ImageBackground } from 'react-native'

// This component should be hosted inside medium sized modal

import Terms from '../../Reusables/LegalTexts/Terms'

type Props = {
    navigation: any
    param1?: any // Permanent ban boolean
    param2?: any // Expiration date
    param3?: any // Reason
}

// Section heights
let backgroundHeight: number = 0
let titleHeight: number = 0
let bodyHeight: number = 0
let footerHeight: number = 0

const Suspension: React.FC<Props> = ({ navigation, param1, param2, param3 }) => {
    // Parameters to variables
    const permanent: boolean = param1
    const date: string = param2 ?? ""
    const reason: string = param3 ?? ""

    useEffect(() => {
        // Set section heights based on suspension status
        if (permanent) {
            backgroundHeight = 130
            titleHeight = 45
            bodyHeight = 105
            footerHeight = 110
        } else {
            backgroundHeight = 165
            titleHeight = 55
            bodyHeight = 105
            footerHeight = 65
        }
    },[])

    const RequestData = async () => {

    }

    const RequestDelete = async () => {

    }

    return (
        <View style={susp.container}>

            <ImageBackground style={{ height: backgroundHeight }} imageStyle={{ flex: 1 }} source={require('../../../assets/images/suspensionHeader.png')} resizeMode="cover" />
            
            <View style={{ ...susp.titleWrapper, ...{ height: titleHeight } }}>
                <Text style={susp.title}>Account suspended</Text>
            </View>

            <View style={susp.separatorWrapper} >
                <View style={susp.separator} />
            </View>

            <View style={{ ...susp.bodyWrapper, ...{ height: bodyHeight } }}>
                {permanent && <Text style={susp.text}>
                    Your account has been permanently suspended for violating our
                    <Pressable style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 5 }} onPress={() => navigation.navigate("FullscreenModal", { param: "Terms of service", Component: Terms })}>
                        <Text style={{ fontSize: 13, textDecorationLine: 'underline', top: 4, right: 1, color: 'rgba(50, 50, 50, 1)'  }}>Terms Of Service</Text>
                    </Pressable>
                    
                </Text>}
                {permanent === false && <Text style={susp.text}>
                    Your account has been temporarily suspended {date !== "" && <Text>until {date}</Text>} for violating our 
                    <Pressable style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 5 }} onPress={() => navigation.navigate("FullscreenModal", { param: "Terms of service", Component: Terms })}>
                        <Text style={{ fontSize: 13, textDecorationLine: 'underline', top: 0, right: 0, color: 'rgba(50, 50, 50, 1)'  }}>Terms Of Service</Text>
                    </Pressable>
                </Text>}
                {reason !== "" && <Text style={susp.text}>
                    Reason: {reason}
                </Text>}
            </View>

            <View style={{ ...susp.footerWrapper, ...{ height: footerHeight } }}>
                <Pressable style={{ ...susp.primaryBtn, ...{ backgroundColor: 'rgba(250, 250, 250, 1)', borderColor: 'rgb(63, 118, 198)' } }} onPress={() => RequestData()}>
                    <Text style={{ fontSize: 15, color: 'rgb(63, 118, 198)' }}>Request data</Text>
                </Pressable>

                {permanent &&  <Pressable style={{ ...susp.primaryBtn, ...{ backgroundColor: 'rgb(63, 118, 198)', borderColor: 'rgb(63, 118, 198)' } }} onPress={() => RequestDelete()}>
                    <Text style={{ fontSize: 15, color: 'rgba(250, 250, 250, 1)' }}>Delete account</Text>
                </Pressable>}
            </View>

        </View>
    )
}

export default Suspension

export const susp = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 15,
    borderWidth: 0,
    overflow: 'hidden',
    backgroundColor: 'rgba(250, 250, 250, 1)'
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  separatorWrapper: {
    flexDirection: 'row',  
  },
  separator: {
      flex: 1,
      height: 1,
      marginVertical: 5,
      marginHorizontal: 15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgb(245, 245, 245)'
  },
   titleWrapper: {
    paddingVertical: 5,
    alignItems: 'center', 
    justifyContent: 'center',
   },
   bodyWrapper: {
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
   },
   footerWrapper: {
    alignItems: 'center', 
    justifyContent: 'flex-end',
   },
   primaryBtn: {
    height: 40,
    width: 280,
    borderRadius: 15,
    borderWidth: 2.5,
    marginBottom: 10,
    alignItems: 'center', 
    justifyContent: 'center',
    overflow: 'hidden',
   },
   title: {
    fontSize: 25,
    color: 'rgba(35, 35, 35, 1)'
   },
   text: {
    paddingTop: 10,
    fontSize: 13,
    textAlign: 'center',
    color: 'rgba(35, 35, 35, 1)'
   }

})