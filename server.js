const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/science_discussions', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Veritabanı bağlantısı başarılı!');
}).catch(err => {
    console.log('Veritabanı bağlantı hatası:', err);
});

const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now }
});
const Article = mongoose.model('Article', articleSchema);

const commentSchema = new mongoose.Schema({
    author: String,
    content: String,
    date: { type: Date, default: Date.now }
});
const Comment = mongoose.model('Comment', commentSchema);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your_email@gmail.com',
        pass: 'your_email_password'
    }
});

app.post('/sendEmail', (req, res) => {
    const mailOptions = {
        from: 'your_email@gmail.com',
        to: req.body.email,
        subject: 'E-posta Onayı',
        text: 'Lütfen e-posta adresinizi doğrulamak için bu linki tıklayın: [Doğrulama Linki]'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('E-posta başarıyla gönderildi: ' + info.response);
    });
});

app.post('/submitArticle', (req, res) => {
    const { title, content } = req.body;
    const article = new Article({ title, content });
    article.save()
        .then(() => res.status(200).send('Makale başarıyla gönderildi!'))
        .catch(err => res.status(500).send('Makale gönderilirken bir hata oluştu.'));
});

app.post('/submitComment', (req, res) => {
    const { author, content } = req.body;
    const comment = new Comment({ author, content });
    comment.save()
        .then(() => res.status(200).send('Yorum başarıyla gönderildi!'))
        .catch(err => res.status(500).send('Yorum gönderilirken bir hata oluştu.'));
});

app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});

