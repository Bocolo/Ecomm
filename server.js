const express = require('express');
const path = require('path');
// const bodyparser =require('body-parser');
const compression = require('compression');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);



const app = express();
const port = process.env.PORT || 5000;

// app.use(bodyParserr.json());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
    app.use(express.static(path.join(__dirname, 'client/build')));


    // how we tell our app what the REST params for each URL will be 
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}
app.listen(port, error => {
    if (error) throw error;
    console.log('Server running on port ' + port);
});

app.post('/payment', (req, res) => {

    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: "eur"
    };
    stripe.charges.create(body, (stripeERR, stripeRes) => {
        if (stripeERR) {
            res.status(500).send({ error: stripeERR });

        } else {
            res.status(200).send({ success: stripeRes });
        }
    });
});

