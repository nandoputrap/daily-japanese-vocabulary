const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const random = require('mongoose-random');
// const ejs = require('ejs');
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({ extended: false }))
// connect db
mongoose.connect('mongodb://localhost:27017/djv', {useNewUrlParser: true, useUnifiedTopology: true});


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

app.get('/random', (req, res) => {
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

app.listen(3000, () => {
    console.log("App starting at port 3000");
})