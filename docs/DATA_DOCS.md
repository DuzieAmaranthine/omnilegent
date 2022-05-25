# Data Documentation

The following documentation provides a look at the types of data the application uses and what the requests look like. 

### User

```typescript
User {
  id : number,
  firstName : string,
  lastName : string,
  email : string,
  passwordHash : string,
  userRole : UserRole, // OneToMany
  userChatRoom : UserChatRoom, // OneToMany
  userBookClub : UserBookClub, // OneToMany
}
```

```typescript
Controllers {
  GET : '/users' // returns all users for Admin use,
  GET : 'users/me' // returns current user
  POST : '/users' // create a new user
}
```
### Role
Primarily used to differentiate between admin users and regular users. 

```typescript
Role {
  RoleKey {
    ADMIN : 'admin',
    USER : 'user',
  }

  id : number,
  key : RoleKey,
  userRole : UserRole, // OneToMany
}
```

### UserRole
Handles the ManyToMany relation between users and roles.

```typescript
  UserRole {
    id : number, 
    roleId : number,
    userId : number,
    contextId : string,
    role : Role, // ManyToOne
    user : User, // ManyToOne
  }
```
### Book 
Stores the data for each book a user has completed or desires to read

```typescript
  Book {
    id : number,
    bookId : string,
    title : string,
    author : string,
    genre : string,
    description : string,
    pages : number,
    pubDate : string,
    thumbnail : string,
    hasRead : boolean,
    dateRead : string,
    userId : number,
  }
```

```typescript
  Controller {
    GET : '/books' // returns all books for user
    GET : '/books_read' // returns all read books for user
    GET : '/books_to_read' // returns all tbr books
    GET : 'books/:id' // returns one book by id
    POST : '/books' // adds a book to a user
    PUT : '/books/:id' // changes the books read status
    DELETE : '/books/:id' // deletes a book
  }
```

### ChatRoom
Handles chat room sockets for users to message in real time. This will eventually be transformed into a full book club.

```typescript
ChatRoom {
  id : number,
  key : string,
  title : string,
  ownerName : string,
  description : string,
  meetingTime : string,
  currentTopic : string,
  ownerId : number,
  userChatRoom : UserChatRoom, // OneToMany
  message : Message // OneToMany
}
```

```typescript
Controller {
  GET : '/chat_rooms' // returns all chat rooms
  GET : '/chat_rooms/:id' // returns one chat room from id
  GET : 'current_rooms' // returns all rooms a user has joined
  GET : 'available_rooms' // returns all rooms available to join
  GET : '/club_members/:id' // returns a list of room members
  POST : '/chat_rooms' // creates a chat room
  POST : '/join_room/:id' // allows a user to join a room
  DELETE : '/chat_rooms/:id' // allows a user to delete one of their created rooms
  DELETE : '/quit_room/:id' // allows a user to leave a room
}
```

### UserChatRoom
Handles the ManyToMany relations between a user and a chat room.

```typescript
UserChatRoom {
  id : number,
  userId : number,
  chatRoomId : number,
  user : User, // ManyToOne
  chatRoom : ChatRoom, // ManyToOne
}
```

### Message
Handles the message work for the chat rooms. Uses sockets to handle real time messaging.

```typescript
Message {
  id : number,
  userName : string,
  contents : string,
  chatRoomId : number,
  chatRoom : ChatRoom // ManyToOne
}
```

### BookClub (In Development)
A social environment for specific books and topics.

```typescript
BookClub {
  id : number,
  ownerId : number,
  key : string,
  title : string,
  description : string,
  isPublic : boolean,
  bannedUsers : UserBookClub // OneToMany
  members : UserBookClub // OneToMany
}
```

### UserBookClub (In Development)
Handles the ManyToMany relations between user and book clubs, including both members and banned users.

```typescript
UserBookClub {
  id : number,
  userId : number,
  bookClubId : number,
  isBanned : boolean,
  user : User // ManyToOne
  bookClub : BookClub // ManyToOne
}
```






