import { friends, colleagues } from "./01-basics";
import { Friend, Colleague, SecureFriendContact, FriendPartial, EventPass, WorkFriend } from "./myTypes";

function updateFriend(friend: Friend, updates: FriendPartial ) : Friend {
  return { ...friend, ...updates}
}

console.log(updateFriend(friends[0], {
  phone: '08712345',
  dob: new Date("1998-10-22")
}))

function secureFindFriends(friends: Friend[], criteria: (f: Friend) => boolean): SecureFriendContact[] {
    const matches = friends.filter(criteria);
    return matches.map((f) => {
      const secure: SecureFriendContact = {
        name: f.name,
        phone: f.phone,
      };
      return secure;
    });
}
  
let result = secureFindFriends(
    friends,
    (f: Friend) => f.age < 30
)
  
console.log(result)

function generateEventPass(colleague: Colleague): EventPass {
    const passCode = Math.round(Math.random() * (1000 - 1) + 1);
    return {
      name: colleague.name,
      department: colleague.department,
      passCode: passCode,
    };
  }
  console.log(generateEventPass(colleagues.current[0]));

  function intersection(friends: Friend[], colleagues: Colleague[]): WorkFriend[] {
    let result : WorkFriend[] = []
    friends.reduce((res, friend) => {
      const colleague = colleagues.find((col) => col.name === friend.name);
      if (colleague) {  // Colleague is also a Friend
        let newWF : WorkFriend = {
          name: colleague.name,
          age: friend.age,
          contact: {
            email: colleague.contact.email,
            extension: colleague.contact.extension
          }
        }

        res.push(newWF)
      }
      return res;
    }, result);
    return result;      //res = accumulator, friend = current value, result = starting value ([])
  }
  
  console.log(intersection(friends, colleagues.current));   //no intersecting names

  const friend3: Friend = {   //adding a common name between both friend and colleague arrays
    name: "Patti Burke",
    phone: "083-941-0726",
    age: 31,
  }

  friends.push(friend3);
  console.log(intersection(friends, colleagues.current));
