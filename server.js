const express = require('express');
const sendEmail = require('./utils/sendmail');

const app = express();
const PORT = process.env.PORT || 9000;

//set engine
app.set('view engine', 'ejs');
//server static assests
app.use(express.static('public'));
//pass the data from form
app.use(express.urlencoded({extended:false}));

//route to rende email form
app.get('/',(req,res) => {
    res.render('email-form')
});

//route t send the email
app.post('/send-email', async(req,res) =>{
    const {email, message} = req.body;
    try{
        sendEmail(email, message);
        res.render('email-form', {
            status : 'success',
            message:'email send successfully'
        })
    }
    catch(error){
        res.render('email-form', {
            status : 'error',
            message:'error sending email',
        })

    }
})

//start server
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
