const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const app = express()

mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: false,})
    .then(() => console.log("Database connected"))
    .catch(err => console.log(err));

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false })) // 중첩된 객체표현을 끈다

app.get('/', (req, res) => {
    const articles = [{
        title: 'Test Article',
        createdAt: new Date(),
        description: 'Test description'
    },
    {
        title: 'Test Article 2',
        createdAt: new Date(),
        description: 'Test description 2'
    },
    {
        title: 'Test Article 3',
        createdAt: new Date(),
        description: 'Test description 3'
    }]
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(5000);