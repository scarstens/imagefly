// IGNORE THIS FILE - JUST LEFTOVER FROM EXPRESS TUTORIAL
const express = require('express');
const router = express.Router();

// Assumed /products root from route registration.
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Orders fetched.'
    });
});

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: 'Order was created.',
        order: order
    });
});

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order details',
        orderId: req.params.orderId
    });
});

router.patch('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order updated.'
    });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order deleted.'
    });
});

module.exports = router;