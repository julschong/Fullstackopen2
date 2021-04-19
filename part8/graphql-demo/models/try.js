const mongoose = require('mongoose')
const Book = require('./book')
const Author = require('./author')
require('dotenv').config({ path: __dirname + '\\..\\.env' })

const main = async () => {
    mongoose.connect(process.env.TEST_MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    const newAuthor = new Author({
        name: 'Christine',
        born: 1992,
    })

    const julius = await Author.findOne({ name: 'Julius' })
    console.log(julius)

    const newBook = new Book({
        title: 'Try1',
        author: julius,
        published: 2021,
        genres: ['coding'],
    })
    try {
        await newBook.save()
    } catch (e) {
        console.log(e.message)
    } finally {
        mongoose.connection.close()
    }
}

main()
