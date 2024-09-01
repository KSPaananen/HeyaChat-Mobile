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
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    fontSize: 15,
    backgroundColor: '#0011',
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#0011',
  },
  inputIcon: {
    
  }
})

export const profile = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    margin: 0,
    borderRadius: 10,
    backgroundColor: 'black',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  }

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
    height: 75
  },
  profileIcon: {
    position: 'absolute',
    borderRadius: 100,
    height: 75,
    width: 75,
    marginTop: -38,
    marginLeft: 300,
    
    
  },
  profileIconBackground: {
    position: 'absolute',
    borderRadius: 100,
    height: 85,
    width: 85,
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
    paddingBottom: 10,
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
    flex: 1,
    position: 'absolute',
    width: 0,
  },
  olExitIcon: {
    flex: 1,
    borderRadius: 100,
    height: 55,
    width: 55,
    top: -18,
    left: 322
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