const router = require('express').Router();

// autenticação
const Auth = require('../middlewares/auth.middleware');

// validação
const AuthValidator = require('../validators/auth.validator');
const UserValidator = require('../validators/user.validator');

// - controllers
const AuthController = require('../controllers/auth.controller');
const AdsController = require('../controllers/ads.controller');
const UserController = require('../controllers/user.controller');

// - routes auth
router.post('/user/signin', AuthValidator.signin, AuthController.signin);
router.post('/user/signup', AuthValidator.signup, AuthController.signup);

// - routes user
router.get('/user/states', UserController.getStates);
router.get('/user/me', Auth.privateRouter, UserController.info);
router.put('/user/me', UserValidator.editAction, Auth.privateRouter, UserController.editAction);

// - routes categories
router.get('/categories', AdsController.getCategories);

// - routes ads
router.post('/ad/add', Auth.privateRouter, AdsController.addAction);
router.get('/ad/list', AdsController.getList);
router.get('/ad/item', AdsController.getItem);
router.post('/ad/:id', Auth.privateRouter, AdsController.editActionAds);

module.exports = router;