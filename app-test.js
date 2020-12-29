// 1. require mongoose
const mongoose = require('mongoose');
// 2. connect to mongoose (jika databse djv belum ada, maka akan otomatis dibuat)
mongoose.connect('mongodb://localhost:27017/djv', {useNewUrlParser: true, useUnifiedTopology: true});
// 3. membuat schema
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
    // embedd schema kategori untuk foreign key
    category: categorySchema
})
// 4. membuat model
const Vocabulary = mongoose.model("Vocabulary", vocabularySchema);



const Category = mongoose.model("Category", categorySchema);

const noun = new Category({
    category: "noun"
})

// noun.save();

// const mirror = new Vocabulary({
//     word: "mirror",
//     japanWord: "かがみ",
//     meaning: "mirror",
//     category: noun
// })

// mirror.save();

// Vocabulary.updateOne({_id: "5fe9976fdd40570cd74c4a2e"}, {category: noun}, (err) => {
//     if(err){
//         console.log(err)
//     }else{
//         console.log("Berhasil cuk!")
//     }
// })

// Vocabulary.updateMany({}, {category: noun}, (err) => {
//     if(err){
//         console.log(err)
//     }else{
//         console.log("Berhasil update banyak cuk!")
//     }
// })


// const photo = new Vocabulary({
//     word: "shasi",
//     japanWord: "しゃしん",
//     meaning: "photo",
//     category: "noun"
// })

// photo.save();


// 5. memnbuat objek
// const window = new Vocabulary({
//     word: "mado",
//     japanWord: "まど",
//     meaning: "window",
//     category: "noun"
// })

// 6. save ke db
// vocabulary.save();

// const wall = new Vocabulary({
//     word: "kabe",
//     japanWord: "かべ",
//     meaning: "wall",
//     category: "noun"
// })

// const book = new Vocabulary({
//     word: "hon",
//     japanWord: "ほん",
//     meaning: "book",
//     category: "noun"
// })

// const chair = new Vocabulary({
//     word: "isu",
//     japanWord: "いす",
//     meaning: "chair",
//     category: "noun"
// })

// Vocabulary.insertMany([wall, book, chair], (err) => {
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Successfully save to djv");
//     }
// })


Vocabulary.find( (err, vocabularies) => {
    if(err){
        console.log(err);
    }else{
        vocabularies.forEach( (vocabulary) => {
            console.log(`${vocabulary.word} | ${vocabulary.japanWord} | ${vocabulary.meaning}`);
        })
    }
    mongoose.connection.close();
})
