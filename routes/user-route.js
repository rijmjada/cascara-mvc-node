const { Router } = require('express');
const { 
    users_Get, 
    users_Post, 
    users_Put, 
    users_Delete } = require('../controllers/user-controller');

const router = Router();



router.get('/', users_Get);

router.post('/', users_Post);

router.put('/', users_Put);

router.delete('/', users_Delete);



// Exportar Modulo Router
module.exports = router;