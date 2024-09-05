import { user } from './localDB/models'

// User object for placeholder values & testing

export const testUser: user = {
    userId: 1,
    username: "username1",
    email: "test.email@email.com",
    phone: "+1234567890",
    interactions: {
        dateMet: new Date(Date.UTC(2012, 11, 20, 3, 0, 0)),
        lastMessage: "Last message1",
        lastMessageDT: new Date(Date.UTC(2012, 11, 20, 3, 0, 0)),
    },
    profile: {
        displayname: "displayname1", 
        description: "This is an example description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        title: "TestTitle 1",
        icon: require('../assets/icons/icon.png'),
        banner: require('../assets/icons/icon.png'),
    }
  }
