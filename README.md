# flix-chat 2.0 server

Server for an experimental chat application inspired by Slack.

Uses:
- Express
- GraphQL
- PostgreSQL


## How to use

Prerequisites:
- You neeed PostgreSQL to be installed before running this application
- A `config/db.config.js` file configured in the following format:

```JavaScript
module.exports = {
    database: 'flix-chat',
    username: 'your-username',
    password: 'your-password'
}
```

You can use a default username of 'postgres' and the password you used to set up the PostgreSQL service during installation.

Clone:
    
    git clone git@github.com:krynv/flix-chat-server.git

Install dependencies:

    npm i

Run:

    npm start

Access GraphiQL at:

    http://localhost:1337/graphiql



## Usage

### Simple GraqhQL query

```
{
    hi
}
```

Will return: 
```
{
    "data": {
        "hi": "hello world"
    }
}
```