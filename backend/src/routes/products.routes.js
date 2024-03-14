const { Router } = require('express');
const router = Router();
//----------------------------------------------
const express = require('express');

const multer = require('multer');
//--------------------------------------------

const {renderProducts, renderProdForm, createNewProd, renderEditForm, updateProd, actDesProd, borrarProd, getAcDes, renderEditStockForm, updateStockProd, renderEditImgForm, updateImgProd, renderPreviewProd, } = require('../controllers/produd.controller');
const { isAuthenticated } = require('../helpers/auth');

// Configurar multer para manejar la carga de archivos
const upload = multer({ dest: 'uploads/' });

// Todos los Productos
router.get('/products', renderProducts)

// Crear Producto
//router.get('/products/add',isAuthenticated, renderProdForm);
router.get('/products/add', renderProdForm);

router.post('/products/nuev-prod', upload.array('photos'), createNewProd);

// Editar Producto
router.get('/products/edit/:id', renderEditForm);
router.put('/products/edit/:id', updateProd);

// Editar Stock
router.get('/products/edit/stock/:id', renderEditStockForm);
router.put('/products/edit/stock/:id', updateStockProd);

// Editar imagenes
router.get('/products/edit/img/:id', renderEditImgForm);
router.put('/products/edit/img/:id', upload.array('photos'), updateImgProd);

// Desactivar Producto
router.get('/products/acDes/:id', getAcDes);
router.put('/products/acDes/:id', actDesProd);

// Borrar Producto
router.delete('/products/delete/:id', borrarProd);

// Preview del producto
router.get('/products/preview/:id', renderPreviewProd);





module.exports = router;