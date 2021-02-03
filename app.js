const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Swal = require('sweetalert2')
const random = require('mongoose-simple-random');
// const random = require('mongoose-random');
// const ejs = require('ejs');
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

// connect db
// local db
// mongoose.connect('mongodb://localhost:27017/djv', {useNewUrlParser: true, useUnifiedTopology: true});
// cloud atlas db
mongoose.connect('mongodb+srv://nando:nandonando@cluster0.hi96w.mongodb.net/djv', {useNewUrlParser: true, useUnifiedTopology: true});


const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, "Please check your word"]
    }
});

const vocabularySchema = new mongoose.Schema({
    word: {
        type: String,
        required: [true, "Please check your word"]
    },
    japanWord: {
        type: String,
        required: [true, "Please check your hiragana / katakana"]
    },
    meaning: {
        type: String,
        required: [true, "Please check your meaning"]
    },
    category: categorySchema
})

const Vocabulary = mongoose.model("Vocabulary", vocabularySchema);
const Category = mongoose.model("Category", categorySchema);

const noun = new Category({
    category: "noun"
})

const adj = new Category({
    category: "adjective"
})

const verb = new Category({
    category: "verb"
})

app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.get('/vocabulary', (req, res) => {
    Vocabulary.find( (err, vocabularies) => {
        if(err){
            console.log(err)
        }else{
            res.render('vocabulary.ejs', {items: vocabularies});
        }
    });
})

app.get('/random-word', (req, res) => {
    // Get the count of all users
    Vocabulary.count().exec(function (err, count) {

    // Get a random entry
    const random = Math.floor(Math.random() * count)

    // Again query all users but only fetch one offset by our random #
    Vocabulary.findOne().skip(random).exec(function (err, result) {
        // Tada! random vocabulary
        // console.log(result); 
        // res.render('random.ejs', {items: results});
        if(err){
            console.log(err)
        }else{
            res.render('random.ejs', {items: result});
        }
    })
})

});

app.get('/new', (req, res) => {
    res.render('new.ejs');
})

app.post('/create', (req, res) => {

    const input_word = req.body.word;
    const input_japanWord = req.body.japanWord;
    const input_meaning = req.body.meaning;
    let input_category = '';

    if(req.body.category === 'noun'){
        input_category = noun;
    }else if(req.body.category === 'adjective'){
        input_category = adj;
    }else if(req.body.category === 'verb'){
        input_category = verb;
    }

    const vocabulary = new Vocabulary({
        word: input_word,
        japanWord: input_japanWord,
        meaning: input_meaning,
        category: input_category
    })

    Swal.fire('Success');
    vocabulary.save();

    res.redirect('/vocabulary');
})

app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    // console.log(id);
    Vocabulary.findById(id, (err, vocabularies) => {
        if(err){
            console.log(err)
        }else{
            res.render('edit.ejs', {items: vocabularies});
        }
    });
})

app.post('/update/:id', (req, res) => {
    const id = req.params.id;
    const input_word = req.body.word;
    const input_japanWord = req.body.japanWord;
    const input_meaning = req.body.meaning;
    let input_category = '';

    if(req.body.category === 'noun'){
        input_category = noun;
    }else if(req.body.category === 'adjective'){
        input_category = adj;
    }else if(req.body.category === 'verb'){
        input_category = verb;
    }
    
    // const selectedRow = Vocabulary.findOne({_id: id});
    const filter = {
        _id: id
    }

    const update = {
        word: input_word,
        japanWord: input_japanWord,
        meaning: input_meaning,
        category: input_category
    }

    Vocabulary.findOneAndUpdate(filter, update, (err) => {
        if(err){
            console.log(err);
        }else{
            console.log("ok");
        }
    })

    res.redirect('/vocabulary');
    
})

app.get('/delete/:id', (req, res) => {
    const id = req.params.id;

    Vocabulary.deleteOne({_id: id}, (err) => {
        if(err){
            console.log(err);
        }
    })

    res.redirect('/vocabulary'); 
})

app.get('/about', (req, res) => {
    res.render('about.ejs');
})

app.get('/haha', (req, res) => {
    let kotak = [];
    let ini = "";
    for(let i = 0; i<2;i++){
        // random some word
        Vocabulary.aggregate([{ $sample: { size: 4 } }], function(err, result){
            if(err){
                console.log(err)
            }else{
                // res.render('quiz.ejs', {items: result});
                return ini = "result";
            }
        });
        kotak.push(ini);
    }
    console.log(kotak);

});

// app.get('/quiz', (req, res) => {
//     let boxes = [];
//     Vocabulary.aggregate([{ $sample: { size: 4 } }], function(err, result){
//         for(let i = 0;i<10;i++){
//             let x = '';
//             if(err){
//                 console.log(err)
//             }else{
//                 x = result;
//             }
//             boxes.push(x);
//         }
//         res.render('quiz.ejs', {items: boxes});
//         console.log(boxes);
//     });
// })


function generateQuiz(){
    
}

app.get('/quiz', (req, res) => {
    var boxes = [];
    
        // for(let i=0;i<2;i++){
            Vocabulary.aggregate([{ $sample: { size: 4 } }], function(err, result){
                res.render('quiz.ejs', {items: result});
            });
            // box = Vocabulary.aggregate([{ $sample: { size: 4 } }]);
            // boxes.push(box);
        // }
        // console.log(boxes);
        
    // console.log(box);
        // console.log(box);
    // console.log(boxes);
    // res.render('quiz.ejs', {items: boxes});
})

app.get('/coba', (req, res) => {
    res.render('coba.ejs', {items: kotak});
})

let port = process.env.PORT;
if(port == nul || port == ''){
    port = 3000;
}

app.listen(port, () => {
    console.log("App starting at port 3000");
})