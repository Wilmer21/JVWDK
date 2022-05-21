const server = require('express').Router();
const { response } = require('express');
const { Sequelize } = require('sequelize');
const { New, Category, Review, User} = require('../db.js');


server.get('/',  (req, res, next) => {  //mostrar todas las noticiar
	New.findAll({
		include: [{model: Category}]
	})
		.then(news => {
			res.send(news);
		})
		.catch(next);
});

///Start review routes


server.post('/:id/review/:userId', async (req, res) => { // crear una reseña mediante la noticia
	const { id, userId } = req.params;
	const olderReview = await Review.findAll({
		where: {
			newId: id,
			userId: userId
		}
	});
	console.log("REVIEW: ", olderReview);
	if (!olderReview.length) {
		Review.create({...req.body.form, newId: req.params.id, userId:  req.params.userId})
		.then(newr => {
				res.status(201).send(newr)
			})
		.catch(error => {
			res.status(400).send(error)
		})
	} else {
		res.send("Ya tenía una reseña de esta noticia");
	}

})

server.get('/:id/review', (req, res) => {
	Review.findAll({where: {newId: req.params.id}, include: [{model: User, attributes: ["email", 'id']}]})
	.then(newr => {
			res.status(201).send(newr)
		})
	.catch(error => {
		res.status(400).send(error)
	})
})

server.put('/:id/review/:idReview', async (req, res) => {
	const review = await Review.findByPk(req.params.idReview)
	Object.assign(review, req.body.form)
	review.save()
	 .then(response =>{
		 res.status(200).send(response)
	 })
	 .catch(error =>{
		 res.status(400).send(error)
	 })
})

server.delete('/:id/review/:idReview', async (req, res) => {
	const review = await Review.findByPk(req.params.idReview)
	if (review){
		review.destroy()
		.then(() => {
			res.status(200).send("has been removed successfully")
		})
		.catch(error =>{
			res.status(400).send(error)
		})
	}
	else return res.status(400).send("error el review no existe")
	
})

// //End review routes

server.get('/category/:name', async (req,res,next)=>{ //mostrar toda la categoria por el nombre
	const category = await Category.findOne({where: {name: req.params.name}})
	await category.getNews()
	.then(categories=>{
		res.json(categories);
	})
	.catch(err=>{
		res.send(err);
	})
});

server.delete('/:id', async (req, res) => {		  //borrar una noticia
    
	const newt = await New.findByPk(req.params.id)
	await newt.destroy()
	.then(() => {
		res.status(200).send("has been removed successfully")
	})
	.catch(error => {
		res.send(error)
	})    
});

server.post('/', async (req, res) =>{	 //crear la noticia
    console.log(req.body.form);
    New.create(req.body.form)
    .then(newt => {
        res.status(201).send(newt)
    })
    .catch(error =>{
        res.status(400).send(error)
	})
    
});



server.put('/:id', async (req, res) =>{  // actuliazar la noticia
	const newt = await New.findByPk(req.params.id)
	Object.assign(newt, req.body.form)
	newt.save()
	 .then(response =>{
		 res.status(200).send(response)
	 })
	 .catch(error =>{
		 res.status(400).send(error)
	 })
});

server.post('/:newId/category/:categoryId',  async (req, res) =>{ // buscar por categoria y noticia
    
	const category =  await Category.findByPk(req.params.categoryId)
	const newt = await New.findByPk(req.params.newId)

	if(!category){res.status(404).send("this category doesn't exist")}
	if(!newt){res.status(404).send("this product doesn't exist")}

	await category.addNew(newt)
	.then(response =>{
		res.send(response)
	})
	.catch(error =>{
		res.send(error)
	})
});

server.get('/der/', function(req, res){ //para hacer pruebas
    res.send('id: ' + req.query.id);
  });

server.get('/news-detail/:newId', async (req, res) => { // detalle de la noticia mediante la id
	const { newId } = req.params;
	const { userId } = req.query;
	const newt = await New.findOne({
		where: {
			id: newId
		},
		include: [
			{model: Category}
		]
	});
	let toEditReview;
	let noReviewed = false;
	let quantity = 1;
	if (JSON.parse(userId)) {				
		
		const user = await User.findOne({
			where: {
				id: userId
			},
			include: [
				{
					model: Review, 
					attributes: ['newId']
				},
			]
		});
		
		toEditReview = user.dataValues.reviews.filter(review => review.dataValues.newId === newt.dataValues.id).length === 1;		
		
	}

	const newNewForm = {
		id: newId,
		name: newt.dataValues.name,
		description: newt.dataValues.description,
		image: newt.dataValues.image,
		featured: newt.dataValues.featured,
		categories: newt.dataValues.categories.map(category => category.dataValues.name),
		quantity,
		toEditReview,
		noReviewed
	};
	res.send(newNewForm);
});

// url base http://localhost:3000/news/catalog/?page=1&pageSize=1
// es para mostrar todas las noticias en un catalogo
server.get('/catalog/', (req, res) => {
	console.log(req.query);
	let categories = req.query.categories && JSON.parse(req.query.categories);
	let { rating, page, pageSize} = req.query;
	var options = {where: {}, include: []};
	if (categories){
		console.log("primera entrada");
		options.include = {model: Category, where: {id: categories}}; 
	}
	
	if (page && pageSize){
		console.log("segunda entrada");
		var offSet;
		var totalNews = 0;
		(page === 1) ? offSet=0 : offSet = (page - 1) * pageSize;
		options.limit = pageSize;
		options.offset = offSet;
	}

	New.count(options)
	.then(count =>{
		totalNews = count; 
		console.log(totalNews);
		New.findAll(options)
		.then(newt => {
			!newt.length && res.send("No hay productos");
			newt.length && res.send({newt, totalNews})
		})
		.catch(err => console.log(err));
	})
	.catch(err => res.status(400).send(err));
});
	 

server.delete('/:productId/category/:categoryId',  async (req, res) =>{ // elimina una categoria
	const { newId, categoryId } = req.params;	
    
	const category =  await Category.findByPk(Number(categoryId))
	const newt = await Product.findByPk(Number(newId));

	if(!category){res.status(404).send("this category doesn't exist")}
	if(!newt){res.status(404).send("this product doesn't exist")}

	await newt.removeCategory(category)
	.then(response =>{
		return res.send("has been successfully removed")
	})
	.catch(error =>{
		res.send(error)
	})
});

server.get('/:id', (req, res) => { //consulta la noticia con la respectiva categoria o categorias
	const { params: { id }} = req;
	New.findOne({
		where: {
			id: id
		},
		include: [
			{ model: Category }
		]
	})
	.then(newr => {
		const newNew = {
			name: newr.dataValues.name,
			description: newr.dataValues.description,
			image: newr.dataValues.image,
			featured: newr.dataValues.featured,
			categories: newr.dataValues.categories
		};
		res.send(newNew);
	})
	.catch(err => console.log(err));
});

module.exports = server;
