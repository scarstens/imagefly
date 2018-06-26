// IGNORE THIS FILE - JUST LEFTOVER FROM EXPRESS TUTORIAL
const express = require('express');
const router = express.Router();

// Assumed /products root from route registration.
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Hanlding GET requests to /products.'
    });
});

router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    }
    res.status(201).json({
        message: 'Hanlding POST requests to /products.',
        createdProduct: product
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if( 'special' === id ){
        res.status(200).json({
            message: 'You discovered special ID.',
            id: id
        });
    }
    res.status(200).json({
        message: 'You passed an ID'
    });
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Product updated.'
    });
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Product deleted.'
    });
});

module.exports = router;