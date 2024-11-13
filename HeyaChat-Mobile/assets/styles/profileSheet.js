import { StyleSheet } from 'react-native'

export const profile = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgb(245, 245, 245)'
    },
  
    // Head
    head: {
      flex: 1,
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      backgroundColor: 'lightgray'
    },
    banner: {
      flex: 1,
      height: 120,
    },
    title: {
      position: 'absolute',
      fontSize: 12,
      paddingVertical: 5,
      paddingHorizontal: 10, 
      borderRadius: 10,
      backgroundColor: 'gray', 
    },
    titleBackground: {
      position: 'absolute', 
      marginTop: 0,
      top: 150, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      alignItems: 'center', 
    },
    profileIcon: {
      borderRadius: 100,
      height: 100,
      width: 100,
    },
    profileIconBackground: {
      position: 'absolute',
      borderRadius: 100,
      height: 110,
      width: 110,
      top: -5,
      backgroundColor: 'lightgray',
    },
    headSection: {
      marginTop: 0,
      marginBottom: 10,
    },
    displayname: {
      fontSize: 25,
    },
    username: {
      fontSize: 15,
      fontStyle: 'italic',
    },
    editIcon: {
      marginTop: 10,
      marginLeft: 5,
      height: 20,
      width: 20,
      borderRadius: 5,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    dropdownIcon: {
      height: 35,
      width: 35,
    },
    descriptionWrapper: {
      flex: 1,
      borderRadius: 15,
      backgroundColor: 'gray'
    },
    descriptionContainer: {
      marginHorizontal: 10,
      paddingTop: 5,
      paddingHorizontal: 10,
    },
    description: {
      fontSize: 13,
    },
    descriptionTitle: {
      fontSize: 15,
      fontWeight: 'bold',
      paddingBottom: 5,
    },
    descriptionFade: {
      position: 'absolute',
      // borderRadius: 15,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      bottom: 0,
      left: 0,
      right: 0, 
    },
  
    // Body
    body: {
      flex: 1,
      padding: 10,
    },
    section: {
      marginTop: 0,
      marginBottom: 10,
    },
  
    // Re-usables
    primaryButton: {
      marginTop: 10,
      marginHorizontal: 5,
      width: 100,
      height: 35,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'black',
    },
    secondaryButton: {
      marginTop: 10,
      marginHorizontal: 5,
      width: 50,
      height: 35,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'black',
    },
    buttonText: {
      fontSize: 12,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    returnButton: {
  
    },
  
  })