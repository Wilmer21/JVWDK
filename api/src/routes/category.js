const server = require('express').Router();
const { Category, User } = require('../db.js');
const passport = require('passport')


server.post('/', async(req, res) =>{    
    
    Category.create(req.body.form)
    .then(category => {
        return res.status(200).send(category)
    })
    .catch(error =>{
        res.status(400).send(error)
    })
    
})


server.delete('/:id',  async(req, res) =>{       
    
    Category.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(category => {
        return res.send("deleted");
    })
    .catch(error =>{
       return res.status(409).json(error)
    })
    
})

server.put('/:id', async (req, res) =>{
 
    const categoryUpdate = await Category.findByPk(req.params.id)
    Object.assign(categoryUpdate, req.body.form);
    await categoryUpdate.save()
    .then(category => {
        res.send(category);
    })
    .catch(err => {
        res.status(409).send(err);
    })
})

server.get('/all', (req, res) => {
    Category.findAll()
    .then(categories => res.json(categories))
    .catch(error => res.status(500).send(error))
})

server.get('/:id', (req,res)=>{
    const id = req.params.id
    Category.findOne({
        where: {
            id: id
        }
    })
    .then(category => {
        const newCategory = {
            name: category.dataValues.name,
            description: category.dataValues.description,
            image: category.dataValues.image
        }
        res.send(newCategory)
    })
    .catch(err => {
        res.send(err)
    })
})

module.exports = server;
