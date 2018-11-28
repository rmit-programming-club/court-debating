let fs = require('fs');

function shuffle(a) {                                                           
  for(let i = a.length - 1; i > 0; i--){                                        

    const j = Math.floor(Math.random() * (i + 1));                              
    [a[i], a[j]] = [a[j], a[i]];                                                
  }                                                                             
  return a;                                                                     
}      

let db = {
  users: [],
  friendships: [],
  member_names: shuffle(["Python", "Ruby", "Brainf*ck", "JS", "Java", "R", "C", "Lua",
  "C++", "C#", "F#", "Piet", "Matlab", "Haskell", "Assembly", "Smalltalk",
  "Fortran", "COBOL", "Coffeescript", "Visual Basic", "Logo", "Shell", "Vimscript",
  "Elixir", "Rust", "Go", "Groovy", "AspectJ", "PHP"])
};

if(fs.existsSync('db.json')){
  db = JSON.parse(fs.readFileSync('db.json'));
}


act_names = ["Ethical Programming", "Assange Satisfaction", "AI Protection",
"Software Quality", "2038 Resolution", "Global Security"]

topic = ["Use of tabs in code", "Use of PC's in development", "Use of dynamically typed languages",
      "Use of spaces for indentation in code", "Placing curly braces on a new line",
      "Use of Macs in development", "Use of statically typed languages", 
      "Use of functional programming", "Use of comments", "Use of a gui in editing files",
      "Use of gui git helpers", "Use of Object Orientated programming",
      "Using console logging for debugging", "Coding classes that are larger than 100 lines",
      "Writing lines that are longer than 80 characters", "Violation of PEP8 standards",
      "Writing full stack JS", "Use of global variables", "Use of the singleton pattern",
      "Use of Vue over React", "Use of React over Vue", "Use of NoSQL Databases"]

sanction = ["is punishible by death", "must be monitored by the government",
          "is punishible by a jail sentence of 6 years",
          "makes the programmer eligible for an honerary doctorate",
          "is punishable by getting raided by Linus Torvolds",
          "will be encouraged by government education programs",
          "will be encouraged through $6 billion in marketing",
          "is punishable by a fine $400", "is punishable by being exhiled from the state",
          "will be encouraged by tax breaks", "must be traced by the ASIO",
          "is punishable by being forced to use Dvorak", "is punishable by being forced to use vim",
          "will award the programmer $200 in AWS credits", "is punishable by being banned from the RMIT programming club"]

connectors = ["unless", "if"]

modifiers = ["the programmer has a blood alcohol concentraction between 0.129 and 0.138",
          "the programmer has a license", "the programmer is Linus Torvolds",
          "Julian Assange gets angry", "PHP becomes mainstream", "the software uses React",
          "the software uses blockchain", "the software uses big data", "the software uses artificial intelligence",
          "vim is the developer's primary editor", "emacs is the developer's primary editor"]


function pick(list){
  return list[Math.floor(Math.random() * list.length)];
}

if(process.argv[2] == 'users'){
  db.users.forEach((user) => console.log(user.real_name + ": " + user.name));
}
else if (process.argv[2] == 'government'){
  db.users.forEach((user) => {
    console.log(user.real_name + ": " + (Math.random() > 0.5 ? "Goverment": "Opposition"));
  });
}
else if (process.argv[2] == 'newuser'){
  let id = db.users.length;
  let name = "Member for " + db.member_names[id];
  user = {
    id: id,
    name: name,
    real_name: process.argv.slice(3).join(" ")
  };
  db.users.push(user);
  console.log(user.real_name + ": " + user.name);
}
else if(process.argv[2] == 'bill'){
  let name = pick(act_names) + " Act 2018" +  (Math.random() > 0.5 ? " (Ammendment)": "");
  console.log(name);

  let clauses = [];
  for(let i = 0; i < 3; i++){
    let clause = pick(topic) + " " + pick(sanction);

    if(Math.random() > 0.5){
      clause += " " + pick(connectors) + " " + pick(modifiers);
    }

    console.log(" - " + clause);
  }
}
else if(process.argv[2] == 'newfriend'){
  let person1 = process.argv[3];
  let person2 = process.argv[4];
  db.friendships.push([person1, person2]);
}
else if(process.argv[2] == 'endfriend'){
  let person1 = process.argv[3];
  let person2 = process.argv[4];
  db.friendships = db.friendships.filter((friendship) => {
    return !(friendship.includes(person1) && friendship.includes(person2));
  });
}
else if(process.argv[2] == 'power'){

  dampening = 0.85;

  function getFriends(user){
    let friends = [];
    for(let friendship of db.friendships){
      if(user == friendship[0]){
        friends.push(friendship[1]); 
      }
      else if (user == friendship[1]){
        friends.push(friendship[0]);
      }
    }

    return friends;
  }


  let powers = {};
  for(let player of db.users){
    powers[player.real_name] = 1;
  }
  let new_powers = Object.assign({}, powers);

  for(let i = 0; i < 10; i++){
    for(let name in powers){
      let power = powers[name];

      let friends = getFriends(name);
      for(let friend of friends){
        power_to_give = dampening * (power / friends.length)
        if(power_to_give === NaN){
          console.log("Error");
          console.log(name);
          console.log(friend);
          console.log(friends);
        }
        new_powers[friend] += power_to_give
        new_powers[name] -= power_to_give
      }
    }
    powers = Object.assign({}, new_powers);
  }
  Object.entries(powers).sort((ranking1, ranking2) => {
    return ranking2[1] - ranking1[1];
  }).forEach((ranking) => {
    console.log(ranking[0] + ": " + ranking[1].toFixed(2));
  });

}


