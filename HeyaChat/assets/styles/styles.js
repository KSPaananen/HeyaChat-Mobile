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
    fontSize: 16,
    paddingTop: 5,
    paddingRight: 0,
    paddingBottom: 0,
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

export const searchCard = StyleSheet.create({
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
    fontSize: 16,
    paddingTop: 5,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 5
  },
  icon: {
    height: 50,
    width: 50,
    marginRight: 7.5,
    borderRadius: 100,
  }
})
