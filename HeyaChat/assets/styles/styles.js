import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  overlay: {
    position: 'absolute',
    
  },
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
    marginBottom: 60,
    marginLeft: 25,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
  },
  title: {
    alignItems: 'flex-start',
    fontFamily: '',
    fontSize: 25,
    fontWeight: 'bold',
    padding: 5,
    paddingBottom: 10
  },
  closingIcon: {
    borderRadius: 100,
    height: 55,
    width: 55,
    top: -106,
    right: -293
  }
})

export const summaryCard = StyleSheet.create({
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
    justifyContent: 'center',
  },
  itemLeft: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  itemMiddle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  itemRight: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  text: {
    fontFamily: '',
    fontSize: 16,
    paddingTop: 5,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 5
  },
  icon: {
    height: 50,
    width: 50,
    marginRight: 5,
    borderRadius: 100,
  }
})
