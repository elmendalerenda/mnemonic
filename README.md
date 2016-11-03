#Mnemonic

## Requirements
 - Ruby 2.1.3
 - [Node 4.x](https://nodejs.org/en/download/package-manager)
 - [phantomjs](http://phantomjs.org/download.html)
 - [gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)
 - An account key from [Microsoft Azure Data Market](https://datamarket.azure.com) and subscribe to [Bing Search API](https://datamarket.azure.com/dataset/bing/search)

## Configure local environment
 - Clone this repository
 - Install dependencies
```bash
 $> cd client && npm install && bower install && cd -
 $> cd server && bundle install
```

## Run local environment
```bash
 $> export bing_key=MyKeY
 $> export subscription_key=MySuBsCrIpTiOnKeY
 $> cd server && script.sh
 $> cd client && gulp serve
```

## Deploy instructions to Heroku

### Heroku requirements
 - Environent var `bing_key` in order to connect with Bing Search API

### Deploy commands
```bash
 $> cd client && gulp build && cd -
 $> git subtree push --prefix server heroku master
```
