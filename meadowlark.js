var express = require('express');

var fortune = require('./lib/fortune.js');

var app = express();

// 设置 handlebars 视图引擎
var handlebars = require('express-handlebars').create({ defaultLayout:'main' });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    //res.type('text/plain');
    //res.send('Meadowlark Travel');
    res.render('home');
});

app.get('/about', function(req, res){
    //res.type('text/plain');
    //res.send('About Meadowlark Travel');
    //var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    //res.render('about', { fortune: randomFortune });
    res.render('about', { fortune: fortune.getFortune() } );
});

// 定制404页面
app.use(function(req, res){
    //res.type('text/plain');
    res.status(404);
    //res.send('404 - Not Found');
    res.render('404');
});

// 定制 500 页面
app.use(function(err, req, res, next){
    console.error(err.stack);
    //res.type('text/plain');
    res.status(500);
    //res.send('500 - Server Error');
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.' );
});