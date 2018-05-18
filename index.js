var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')

var server = express()
var port = 8080

server.use(logger('dev'))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false}))

server.set('view engine', 'ejs')
server.use(express.static('views'))
server.set('views', __dirname+'/views')

server.get('/', function(request, response){
    // response.send('<h1>Buy a Banana</h1>')
    response.render('home.ejs')
})
server.get('/about', function(request, response){
    response.render('about.ejs')
})
server.get('/contact', function(request, response){
    response.render('contact.ejs')
})
server.get('/portfolio', function(request, response){
    response.render('portfolio.ejs')
})
server.post('/', function(request, response){
    console.log(request.body)
    var names = request.body.people
    var nameList = names.split(",")
    var groups = [ ]
    var currentGroup = [ ]
    while (nameList.length > 0){
        var randomNumber = Math.floor(Math.random()*nameList.length)
        var randomPerson = nameList[randomNumber]
        nameList.splice(randomNumber, 1)
        currentGroup.push(randomPerson)
        if (currentGroup.length >= 2){
            groups.push(currentGroup)
            currentGroup = [ ]
        }
    }
    response.render('results.ejs', {data: groups})
})
server.listen(port, () => {
    console.log('Server running on port' + port)
})
