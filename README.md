# flix-chat 2.0 server

Server for a chat application inspired by Slack

## How to use

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