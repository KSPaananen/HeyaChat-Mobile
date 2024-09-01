import { user } from '../models/user'

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
        description: "description1",
        title: "TestTitle",
        icon: require('../assets/icons/icon.png'),
        banner: require('../assets/icons/icon.png'),
    }
  }
