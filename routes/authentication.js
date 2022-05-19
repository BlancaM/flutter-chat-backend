/**
 * path /api/login
 */

const { Router } = require('express'); //* Permite crear las rutas en la aplicación
const { check } = require('express-validator');

const { createUser, login, renewToken } = require('../controllers/user_controller');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();


router.post('/createUser', [
    //* Validaciones
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').not().isEmpty(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    check('password','La contraseña debe tener mínimo 6 caracteres').isLength({ min: 6 }),
    validateFields
], createUser);

router.post('/', [
    //* Validaciones
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
], login);

//* validateJWT
router.get('/renew', validateJWT, renewToken);

module.exports = router;