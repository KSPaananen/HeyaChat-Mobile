import { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Pressable, Image, ImageBackground } from 'react-native'
import { useMediumModalContext } from '../../../Reusables/Modals/MediumModal'

// This component should be hosted inside a modal

import Terms from '../../../Reusables/LegalTexts/Terms'
import RequestDelete from './RequestDelete'

type Props = {
    navigation?: any
    arg1?: boolean// Permanent boolean
    arg2?: string // Expires date
    arg3?: string // Reason
}

const Suspension: React.FC<Props> = ({ navigation, arg1, arg2, arg3 }) => {
  // Use parent components context to persist data
  const { args, setArgs } = useMediumModalContext()
  
  const [processing, setProcessing] = useState<boolean>(false)
  const [permanent, setPermanent] = useState<boolean>(arg1 ?? args.arg1 ?? false)
  const [expires, setExpires] = useState<string>(arg2 ?? args.arg2 ?? "")
  const [reason, setReason] = useState<string>(arg3 ?? args.arg3 ?? "")

  useEffect(() => {
    // Persist data to mediumModalContext
    setArgs({ arg1, arg2, arg3 })

  }, [])

  return (
    <View style={susp.container}>
            
      <ImageBackground style={susp.background} imageStyle={{ flex: 1 }} source={require('../../../../assets/images/suspensionHeader.png')} resizeMode="cover" />

      <View style={susp.titleWrapper}>
        <Text style={susp.title}>Account suspended</Text>
      </View>

      <View style={susp.separatorWrapper} >
        <View style={susp.separator} />
      </View>

      <View style={susp.bodyWrapper}>

        {permanent && <Text style={susp.text}>
          Your account has been permanently suspended for violating our
          <Pressable style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 5 }} onPress={() => navigation.navigate("FullscreenModal", { Component: Terms, Props: ["Terms Of Service"] })}>
            <Text style={{ fontSize: 13, textDecorationLine: 'underline', top: 3, right: 2, color: 'rgba(50, 50, 50, 1)'  }}>Terms Of Service. </Text>
          </Pressable>   
        </Text>}

        {permanent=== false && <Text style={susp.text}>
          Your account has been temporarily suspended {expires !== "" && <Text>until {expires}</Text>} for violating our 
          <Pressable style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 5 }} onPress={() => navigation.navigate("FullscreenModal", { Component: Terms, Props: ["Terms Of Service"] })}>
            <Text style={{ fontSize: 13, textDecorationLine: 'underline', top: 3, right: 2, color: 'rgba(50, 50, 50, 1)'  }}>Terms Of Service. </Text>
          </Pressable>
          Repeat violations will result in longer suspensions.
        </Text>}

        {reason !== "" && <Text style={susp.text}>
          Reason: {reason}
        </Text>}

      </View>

      <View style={susp.footerWrapper}>
        {permanent &&  <Pressable style={{ ...susp.primaryBtn, ...{ backgroundColor: 'rgb(63, 118, 198)', borderColor: 'rgb(63, 118, 198)' } }} onPress={() => navigation.navigate("MediumModal", { Component: RequestDelete, Props:[navigation] })}>
          {processing === false && <Text style={{ fontSize: 15, color: 'rgba(250, 250, 250, 1)' }}>Delete account</Text>}
          {processing && <Image style={susp.loadingIcon} source={require('../../../../assets/icons/loadingicon.gif')} />}
        </Pressable>}

        {permanent === false &&  <Pressable style={{ ...susp.primaryBtn, ...{ backgroundColor: 'rgb(63, 118, 198)', borderColor: 'rgb(63, 118, 198)' } }} onPress={() => {navigation.goBack()}}>
          <Text style={{ fontSize: 15, color: 'rgba(250, 250, 250, 1)' }}>I understand</Text>
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
  separatorWrapper: {
    flexDirection: 'row',  
  },
  separator: {
      flex: 1,
      height: 1,
      marginHorizontal: 15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgb(25, 25, 25)'
  },
  background: {
    height: 155
  },
   titleWrapper: {
    height: 50,
    alignItems: 'center', 
    justifyContent: 'center',
   },
   bodyWrapper: {
    height: 145,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
   },
   footerWrapper: {
    height: 50,
    alignItems: 'center', 
    justifyContent: 'flex-end',
   },
   primaryBtn: {
    height: 40,
    width: 260,
    borderRadius: 15,
    borderWidth: 2.5,
    marginBottom: 10,
    alignItems: 'center', 
    justifyContent: 'center',
    overflow: 'hidden',
   },
   title: {
    fontSize: 24,
    color: 'rgba(35, 35, 35, 1)'
   },
   text: {
    paddingTop: 10,
    fontSize: 13,
    lineHeight: 17,
    textAlign: 'center',
    color: 'rgba(35, 35, 35, 1)'
   },
   loadingIcon: {
    height: 35,
    width: 35
  },

})