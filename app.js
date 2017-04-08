var express =require('express'),
    mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookmodel');
var app = express();

var port = process.env.PORT || 3000;

var bookRouter = express.Router();
bookRouter.route('/Books')
    .get(function(req,res){
        var query = {};
        if(req.query.genre){
            query.genre=req.query.genre;
        }
        Book.find(query, function(err, books){
            if(err)
                console.log(err);
            else
                res.json(books);
        });
});
bookRouter.route('/Books/:bookid')
    .get(function(req,res){

        Book.findById(req.params.bookid, function(err, book){
            if(err)
                console.log(err);
            else
                res.json(book);
        });
});
app.use('/api',bookRouter);

app.get('/',function(req,res){
   res.send("welcome to my API");
});


app.listen(port, function(){
   console.log("Gulp is runung  on port "+ port);
});
