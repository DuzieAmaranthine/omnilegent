import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../entities/user.entity';
import { Role, RoleKey } from '../entities/role.entity';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UserRole } from '../entities/user_role.entity';
import { ChatRoom } from '../entities/chat_room.entity';
import { Book } from '../entities/book.entity';
import { UserChatRoom } from '../entities/user_chatroom.entity';
dotenv.config();

export default class Seeds implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    // CREATE ROLES
    console.log('\nCreating Roles');

    const roleObjects = Role.ROLES.map((key) => ({ key }));
    const roleRepository = connection.getRepository(Role);
    for (const roleObj of roleObjects) {
      // only insert roles if not present already
      const role = await roleRepository.findOne(roleObj);
      if (!role) {
        console.log(`Creating role '${roleObj.key}'`);
        await roleRepository.insert(roleObj);
      } else {
        console.log(`Role '${role.key}' already exists`);
      }
    }

    // CREATE ADMIN USER
    const userRepository = connection.getRepository(User);
    let adminUser = await userRepository.findOne({ email: process.env.ADMIN_EMAIL });
    if (!adminUser) {
      const adminRole = await roleRepository.findOne({ key: RoleKey.ADMIN });
      console.log(`\nCreating Admin User with email ${process.env.ADMIN_EMAIL}`);
      console.log(adminRole);
      const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      adminUser = new User();
      adminUser.email = process.env.ADMIN_EMAIL;
      adminUser.passwordHash = passwordHash;
      adminUser.firstName = 'Admin';
      adminUser.lastName = 'Site';
      const adminUserRole = new UserRole();
      adminUserRole.role = adminRole;
      adminUser.userRoles = [adminUserRole];
      await userRepository.save(adminUser);
    } else {
      console.log(`\nAdmin User with email ${process.env.ADMIN_EMAIL} already exists`);
    }

    // CREATE USERS
    let user1 = new User();
    user1.email = 'fake1@fake.com';
    user1.passwordHash = await bcrypt.hash('asdf', 10);
    user1.firstName = 'chin'
    user1.lastName = 'chin'
    const newUser1Role = new UserRole();
    const user1Role = await roleRepository.findOne({key : RoleKey.USER});
    newUser1Role.role = user1Role;
    user1.userRoles = [newUser1Role];

    await userRepository.save(user1);
    console.log(`\nUser with ${user1.email} created`);

    let user2 = new User();
    user2.email = 'waifu4laifu@fake.com';
    user2.passwordHash = await bcrypt.hash('asdf', 10);
    user2.firstName = 'duzie'
    user2.lastName = 'amaran'
    const newUser2Role = new UserRole();
    const user2Role = await roleRepository.findOne({key : RoleKey.USER});
    newUser2Role.role = user2Role;
    user2.userRoles = [newUser2Role];

    await userRepository.save(user2);
    console.log(`\nUser with ${user2.email} created`);

    let user3 = new User();
    user3.email = 'fake2@fake.com';
    user3.passwordHash = await bcrypt.hash('asdf', 10);
    user3.firstName = 'christian'
    user3.lastName = 'a'
    const newUser3Role = new UserRole();
    const user3Role = await roleRepository.findOne({key : RoleKey.USER});
    newUser3Role.role = user3Role;
    user3.userRoles = [newUser3Role];

    await userRepository.save(user3);
    console.log(`\nUser with ${user3.email} created`);

    // CREATE CHATROOMS

    const chatroomRepository = connection.getRepository(ChatRoom);

    let roomArray = [
      'IT or The Stand?', 
      'Cozy Mysteries', 
      'First rule of fight club',
      'Moore books from Moore!',
      'Pokemon books'
    ];

    let userArray = [user1, user2, user3];

    roomArray.forEach( async (title) => {
      let index = Math.floor(Math.random() * userArray.length);
      let tempUser = userArray[index];
      let room = new ChatRoom();
      room.title = title;
      room.key = crypto.randomBytes(8).toString('hex');
      room.ownerName = tempUser.firstName;
      room.description = 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum';
      room.ownerId = tempUser.id;

      const newRoom = await chatroomRepository.save(room);

      // let newUserChat = new UserChatRoom();
      // newUserChat.userId = tempUser.id;
      // newUserChat.roomId = newRoom.id;

      // tempUser.userChatRooms = [newUserChat];
      // newRoom.userChatRooms = [newUserChat];

      // const updatedRoom = await chatroomRepository.update(newRoom.id, newRoom);
      // const updatedUser = await userRepository.update(tempUser.id, tempUser);

      console.log(`Created room : ${room.title}`);
      
    });

    //CREATE BOOKS

    const bookRepository = connection.getRepository(Book);

    const books = {
      book1 : {
        title : 'IT',
        author : 'Stephen King',
        description : 'In 1985, six men and one woman are called back together to search for a creature of unspeakable evil that had stalked them as children.',
        pages : 1156,
        pubDate : '2016-01-05',
        thumbnail : 'http://books.google.com/books/content?id=S85NCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      },
      book2 : {
        title : 'If It Bleeds',
        author : 'Stephen King',
        description : 'The four never-before-published novellas in this collection represent horror master King at his finest, using the weird and uncanny to riff on mortality, the price of creativity, and the unpredictable consequences of material attachments.',
        pages : 448,
        pubDate : '2021-06',
        thumbnail : 'http://books.google.com/books/content?id=6KYsEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      },
      book3 : {
        title : 'The Institute',
        author : 'Stephen King',
        description : 'From #1 New York Times bestselling author Stephen King, the most riveting and unforgettable story of kids confronting evil since It. “This is King at his best” (The St. Louis Post-Dispatch). In the middle of the night, in a house on a quiet street in suburban Minneapolis, intruders silently murder Luke Ellis’s parents and load him into a black SUV. The operation takes less than two minutes. Luke will wake up at The Institute, in a room that looks just like his own, except there’s no window. And outside his door are other doors, behind which are other kids with special talents—telekinesis and telepathy—who got to this place the same way Luke did: Kalisha, Nick, George, Iris, and ten-year-old Avery Dixon. They are all in Front Half. Others, Luke learns, graduated to Back Half, “like the roach motel,” Kalisha says. “You check in, but you don’t check out.” In this most sinister of institutions, the director, Mrs. Sigsby, and her staff are ruthlessly dedicated to extracting from these children the force of their extranormal gifts. There are no scruples here. If you go along, you get tokens for the vending machines. If you don’t, punishment is brutal. As each new victim disappears to Back Half, Luke becomes more and more desperate to get out and get help. But no one has ever escaped from the Institute. As psychically terrifying as Firestarter, and with the spectacular kid power of It, The Institute “is another winner: creepy and touching and horrifyingly believable, all at once” (The Boston Globe).',
        pages : 576,
        pubDate : '2020-09-01',
        thumbnail : 'http://books.google.com/books/content?id=7ff1DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      },
      book4 : {
        title : 'Elevation',
        author : 'Stephen King',
        description : '#1 NEW YORK TIMES BESTSELLER The latest from legendary master storyteller Stephen King, a riveting, extraordinarily eerie, and moving story about a man whose mysterious affliction brings a small town together—a timely, upbeat tale about finding common ground despite deep-rooted differences. Although Scott Carey doesn’t look any different, he’s been steadily losing weight. There are a couple of other odd things, too. He weighs the same in his clothes and out of them, no matter how heavy they are. Scott doesn’t want to be poked and prodded. He mostly just wants someone else to know, and he trusts Doctor Bob Ellis. In the small town of Castle Rock, the setting of many of King’s most iconic stories, Scott is engaged in a low grade—but escalating—battle with the lesbians next door whose dog regularly drops his business on Scott’s lawn. One of the women is friendly; the other, cold as ice. Both are trying to launch a new restaurant, but the people of Castle Rock want no part of a gay married couple, and the place is in trouble. When Scott finally understands the prejudices they face–including his own—he tries to help. Unlikely alliances, the annual foot race, and the mystery of Scott’s affliction bring out the best in people who have indulged the worst in themselves and others. From Stephen King, our “most precious renewable resource, like Shakespeare in the malleability of his work” (The Guardian), Elevation is an antidote to our divisive culture, as gloriously joyful (with a twinge of deep sadness) as “It’s a Wonderful Life.”',
        pages : 160,
        pubDate : '2018-10-30',
        thumbnail : 'http://books.google.com/books/content?id=S85NCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      },
      book5 : {
        title : '1922',
        author : 'Stephen King',
        description : 'The chilling novella featured in Stephen King’s New York Times bestselling collection Full Dark, No Stars, 1922 is about a man who succumbs to the violence within—setting in motion a grisly train of murder and madness. Wilfred James owns eighty acres of farmland in Nebraska that have been in his family for generations. His wife, Arlette, owns an adjoining one hundred acres. She wants to sell her land but if she does, Wilfred will be forced to sell as well. James will do anything to hold onto his farm, and he\'ll get his son to go along. Betrayal, murder, madness, rats, 1922 is a breathtaking exploration into the dark side of human nature from the great American storyteller Stephen King.',
        pages : 114,
        pubDate : '2019-11-12',
        thumbnail : 'http://books.google.com/books/content?id=S85NCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      },
      book6 : {
        title : 'Insomnia',
        author : 'Stephen King',
        description : 'New edition. Originally published: 1994.',
        pages : 912,
        pubDate : '2016-02-16',
        thumbnail : 'http://books.google.com/books/content?id=GoSMCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      }
    }

    let book1 = new Book();
    book1.title = books.book1.title;
    book1.author = books.book1.author;
    book1.description = books.book1.description;
    book1.pages = books.book1.pages;
    book1.pubDate = books.book1.pubDate;
    book1.thumbnail = books.book1.thumbnail;
    book1.hasRead = false;
    book1.userId = userArray[Math.floor(Math.random() * userArray.length)].id;
    await bookRepository.save(book1);
    console.log(`${book1.title} by ${book1.author} is saved`);

    let book2 = new Book();
    book2.title = books.book2.title;
    book2.author = books.book2.author;
    book2.description = books.book2.description;
    book2.pages = books.book2.pages;
    book2.pubDate = books.book2.pubDate;
    book2.thumbnail = books.book2.thumbnail;
    book2.hasRead = false;
    book2.userId = userArray[Math.floor(Math.random() * userArray.length)].id;
    await bookRepository.save(book2);
    console.log(`${book2.title} by ${book2.author} is saved`);

    let book3 = new Book();
    book3.title = books.book3.title;
    book3.author = books.book3.author;
    book3.description = books.book3.description;
    book3.pages = books.book3.pages;
    book3.pubDate = books.book3.pubDate;
    book3.thumbnail = books.book3.thumbnail;
    book3.hasRead = false;
    book3.userId = userArray[Math.floor(Math.random() * userArray.length)].id;
    await bookRepository.save(book3);
    console.log(`${book3.title} by ${book3.author} is saved`);

    let book4 = new Book();
    book4.title = books.book4.title;
    book4.author = books.book4.author;
    book4.description = books.book4.description;
    book4.pages = books.book4.pages;
    book4.pubDate = books.book4.pubDate;
    book4.thumbnail = books.book4.thumbnail;
    book4.hasRead = false;
    book4.userId = userArray[Math.floor(Math.random() * userArray.length)].id;
    await bookRepository.save(book4);
    console.log(`${book4.title} by ${book4.author} is saved`);

    let book5 = new Book();
    book5.title = books.book5.title;
    book5.author = books.book5.author;
    book5.description = books.book5.description;
    book5.pages = books.book5.pages;
    book5.pubDate = books.book5.pubDate;
    book5.thumbnail = books.book5.thumbnail;
    book5.hasRead = false;
    book5.userId = userArray[Math.floor(Math.random() * userArray.length)].id;
    await bookRepository.save(book5);
    console.log(`${book5.title} by ${book5.author} is saved`);

    let book6 = new Book();
    book6.title = books.book6.title;
    book6.author = books.book6.author;
    book6.description = books.book6.description;
    book6.pages = books.book6.pages;
    book6.pubDate = books.book6.pubDate;
    book6.thumbnail = books.book6.thumbnail;
    book6.hasRead = false;
    book6.userId = userArray[Math.floor(Math.random() * userArray.length)].id;
    await bookRepository.save(book6);
    console.log(`${book6.title} by ${book6.author} is saved`);
  }
}
