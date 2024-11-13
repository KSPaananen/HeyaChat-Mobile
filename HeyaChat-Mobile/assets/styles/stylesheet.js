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
    marginTop: 20,
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