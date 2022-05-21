const server = require('express').Router();
const {  User } = require('../db.js');
const jwt = require('jsonwebtoken');
const passport = require("passport");
const SENDGRID_API_KEY = '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'

// sgMail.setApiKey(SENDGRID_API_KEY)

const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
}

const verifyCode = Math.round(getRandomArbitrary(100000,999999))

genToken = user => {
  return jwt.sign({
    iss: 'Luri',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, 'joanlouji');
}


server.post('/', async (req, res) => {
    const { email, password, first_name, last_name, phone_number, user_role, address_line1,
         address_line2, city, state, postal_code, country, billing_addres } = req.body.form;
    let foundUser = await User.findOne({ where: {email: email }});
    if (foundUser) {
      return res.status(403).json({ msg: 'Correo electrónico ya registrado'});
    }else{
        const newUser = new User({ email, password, first_name, last_name, phone_number, user_role, address_line1,
            address_line2, city, state, postal_code, country, billing_addres })
        await newUser.save()
        // Generate JWT token
        const token = genToken(newUser)
        res.status(200).json({token})
    }
});

server.get('/',  async(req, res, next) => {
    console.log(req.user);
    const user = await User.findByPk(req.user)

    User.findAll()
    .then(response =>{
        res.send(response)
    })
    .catch(err => {
        res.send(err.message)
    })

    // if(user.user_role === 'admin') {
    // User.findAll()
    // .then(response =>{
    //     res.send(response)
    // })
    // .catch(next)
    // } else
    // {
    //     res.status(401).send({message: 'not authorized'})
    // }
});

server.delete('/:userId', async (req, res) => {
    const user = await User.findByPk(req.params.userId)
    user.active = "false";
    user.save()
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        res.send(err)
    })
})

server.put('/active/:userId', async (req, res) => {
    const user = await User.findByPk(req.params.userId)
    user.active = "true";
    user.save()
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        res.send(err)
    })
})





server.put('/:userId', passport.authenticate('jwt', { session: false }), async (req, res) => {

    const user = await User.findByPk(req.params.userId)
    if(req.body.email){
    let foundUser = await User.findOne({ where: {email: req.body?.email }});

    if(foundUser){
        return res.status(403).json({ msg: 'Correo electrónico ya registrado'});
    }
    user.save()
    .then(response =>{
        res.send({
            response,
            userForm:req.body
        })
    })
    .catch(err => {
        res.send(err.message)
    })
   }
    Object.assign(user, req.body)
    
    user.save()
    .then(response =>{
        res.send({
            response,
            userForm:req.body
        })
    })
    .catch(err => {
        res.send(err.message)
    })
});




module.exports = server;
