<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?

Used to allow a server to store information about a client, in our case we stored session information in the sqlite3 DB

Server creates and validates ucer login, creates and sends cookie back to the client, gets stored at the client and is sent back for every request

cookie is cryptogrphically signed, we used express-sessions as the library for managing this

2. What does bcrypt do to help us store passwords in a secure manner.

applies a one-way hashing algorithm to the password, as well a "salt' ..a random string added to the hash


3. What does bcrypt do to slow down attackers?

uses a key (an integer) that is able adjust the cost of hashing( to us the time it takes to hash the password...smaller integer less time, larger more time...which makes it more resistant to rainbow attacks, by requiring more time )


4. What are the three parts of the JSON Web Token?

header

payload

signature
