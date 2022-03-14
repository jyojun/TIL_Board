const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
require('dotenv').config(); 
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,})
    .then(() => console.log("Database connected"))
    .catch(err => console.log(err));

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false })) // 중첩된 객체표현을 끈다
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        createdAt: "desc", // 최신 날짜 순으로 정렬
    }) 
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(5000);