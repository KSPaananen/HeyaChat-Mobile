import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  ol: {
    flex: 1,
    position: 'absolute',
    width: 0,
  },
  olSummaryIcon: {
    borderRadius: 100,
    height: 150,
    width: 45,
    top: 650,
    left: 10

  },
})

export const header = StyleSheet.create({
  buttonRight: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginRight: 5,
    backgroundColor: 'blue'
  },
  buttonTextRight: {
    fontSize: 15,
    color: 'white',
  },
  iconRight: {
    height: 45,
    width: 45,
    margin: 5,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
    marginLeft: 0,
    fontSize: 15,
    backgroundColor: '#0011',
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#0011',
  },
  inputIcon: {
    
  }
})

export const modals = StyleSheet.create({
  shadow: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    },
  modal: {
    flex: 1,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#fff',
    marginTop: 60,
    marginRight: 25,
    marginBottom: 120,
    marginLeft: 25,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 0,
    paddingLeft: 10,
  },
  title: {
    alignItems: 'flex-start',
    fontSize: 25,
    fontWeight: 'bold',
    padding: 5,
    paddingBottom: 10
  },
  ol: { // Overlay
    position: 'absolute', 
    top: 0, 
    right: 0, 
    bottom: 0, 
    left: 0, 
    alignItems: 'flex-end'
  },
  exitBtnWrapper: {
    bottom: 18, 
    left: 18
  },
  olExitBtn: {
    height: 50, 
    width: 50, 
    borderRadius: 100
  }
})

export const modalCard = StyleSheet.create({
  card: {
    borderRadius: 5,
    margin: 5,
    padding: 5,
    height: 65,
    backgroundColor: '#0011',
  },
  cardItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  itemLeft: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  itemRight: {
    flex: 0.5,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  username: {
    fontSize: 18,
    paddingTop: 5,
    paddingLeft: 5
  },
  date: {
    fontSize: 11,
    fontStyle: 'italic',
    paddingTop: 5,
    paddingLeft: 5
  },
  title: {
    fontSize: 14,
    fontStyle: 'italic',
    paddingTop: 2,
    paddingLeft: 5
  },
  icon: {
    height: 50,
    width: 50,
    marginRight: 7.5,
    borderRadius: 100,
  }
})

export const home = StyleSheet.create({
  container: {
    flex: 1,
 
  },
  ol: {
    position: 'absolute', 
    top: 0, 
    right: 0, 
    bottom: 0, 
    left: 0, 
    alignItems: 'flex-end', 
    justifyContent: 'flex-end',
  },
  
})

export const messager = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  body: {
    marginBottom: 0
  },
  footer: {
    position: 'absolute',
    flexDirection: 'row',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  inputWrapper: {
    flex: 1,
    height: 55,
    padding: 2.5,
    marginVertical: 10, 
    marginHorizontal: 5,
    borderRadius: 100,
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  input: {
    height: 50,
    overflow: 'hidden',
    borderTopRightRadius: 100,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  inputIcon: {

  },
  iconWrapper: {
    height: 55,
    width: 55,
    marginRight: 5,
    marginBottom: 10,
    borderRadius: 100,
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  icon: {
    height: 50,
    width: 50,
    marginTop: 5,
    marginLeft: 2.5,
    marginBottom: 5,
    borderRadius: 100,
  },

})

export const messageCard = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageSent: {
    alignItems: 'flex-end',
    flexDirection: 'row', 
    justifyContent: 'flex-end'
  },
  messageReceived: {
    alignItems: 'flex-end',
    flexDirection: 'row', 
    justifyContent: 'flex-start'
  },
  icon: {
    height: 25,
    width: 25,
    marginBottom: 10,
    borderRadius: 100,
    alignItems: 'flex-end'
  },
  messageFrame: {
    flex: 1,
    marginVertical: 10,
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'lightgray'
  },
  username: {
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: '600',
  }, 
  dateTime: {
    marginRight: 5,
    marginBottom: 1,
    fontSize: 11,
    fontStyle: 'italic',

  },
  mediaContainer: {
    overflow: 'hidden', 
    borderWidth: 3, 
    borderRadius: 10, 
    borderColor: 'gray', 
    backgroundColor: 'darkgray', 
    marginTop: 10
  },
  mediaWrapper: {
    flex: 1, 
    height: 250, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  media: {
    height: "100%"
  },

})

export const profile = StyleSheet.create({
  container: {
    flex: 1,
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

export const settings = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    backgroundColor: 'lightgray',
    marginBottom: 10,

  },
  head: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  body: {
    padding: 10,
    flexDirection: 'column',
  },
  section: {
    marginTop: 10,
  },
  separator: {
    flex: 1,
    height: 1,
    marginTop: 17,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  banner: {
    flex: 1,
    justifyContent: 'center',
    height: 80
  },
  profileIcon: {
    position: 'absolute',
    borderRadius: 100,
    height: 80,
    width: 80,
    marginTop: -38,
    marginLeft: 300,
  },
  profileIconBackground: {
    position: 'absolute',
    borderRadius: 100,
    height: 90,
    width: 90,
    marginTop: -43,
    marginLeft: 295,
    backgroundColor: 'lightgray'
    
    
  },
  h1: {
    fontSize: 25,
  },
  h2: {
    fontSize: 15,
  },
  h3: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  h4: {
    fontSize: 15,
  },
  input: {
    flex: 1,
    fontSize: 15,
    height: 40,
    marginTop: 5,
    marginRight: 100,
    borderRadius: 5,
  },
  bodyTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  bodyText: {
    fontSize: 15,
  },
  button: {
    flex: 1,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: 10,
    borderRadius: 5,
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  }

})

export const search = StyleSheet.create({
  header: {
    marginTop: 10,
    marginRight: 5,
    marginBottom: 10,
    marginLeft: 5
  },
  title: {
    fontSize: 20
  },
  separator: {
    flex: 1,
    padding: 0.5,
    marginTop: 10,
    backgroundColor: 'black'
  }
})

export const userCard = StyleSheet.create({
  card: {
    borderRadius: 5,
    marginTop: 5,
    height: 75,
    backgroundColor: '#0011',
  },
  cardItem: {
    flex: 1,
    flexDirection: 'row',
  },
  itemLeft: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  itemMiddle: {
    flex: 1.3,
    paddingLeft: 5,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  itemRight: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 18,
    paddingTop: 5,
  },
  status: {
    fontSize: 10,
    paddingTop: 5,
    fontStyle: 'italic'
  },
  text: {
    fontSize: 13,
    paddingTop: 0
  },
  icon: {
    borderRadius: 100,
    height: 60,
    width: 60,
    marginTop: 7.5,
    marginLeft: 7.5,
  },
  dmIcon: {
    borderRadius: 5,
    height: 75,
    width: 60,
  }
})