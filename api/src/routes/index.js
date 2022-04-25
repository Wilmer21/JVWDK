const { Router } = require('express');
// import all routers;
const authRouter = require('./auth.js')
const newsRouter = require('./news.js');
const categoryRouter = require('./category.js');
const userRouter = require('./user.js');

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/auth', authRouter);
router.use('/news', newsRouter);
router.use('/category', categoryRouter);
router.use('/users', userRouter);



module.exports = router;
