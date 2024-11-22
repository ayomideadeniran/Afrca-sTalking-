const express = require('express');
const sendSMS = require('./sendSMS');
const path = require('path');

const app = express();

module.exports = function smsServer() {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // Set up EJS as the templating engine
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));

    // Render form to send SMS
    app.get('/', (req, res) => {
        res.render('index', { message: null, error: null });
    });
    
    // Handle form submission and send SMS
    app.post('/send-sms', async (req, res) => {
        const { numbers, message } = req.body;

        // Validate inputs
        if (!numbers || !message) {
            return res.render('index', {
                message: null,
                error: 'Please provide both numbers and a message.',
            });
        }

        // Convert comma-separated numbers into an array
        const numbersArray = numbers.split(',').map((num) => num.trim());

        try {
            await sendSMS(numbersArray, message);
            res.render('index', {
                message: 'SMS sent successfully!',
                error: null,
            });
        } catch (err) {
            console.error(err);
            res.render('index', {
                message: null,
                error: 'Failed to send SMS. Please try again.',
            });
        }
    });

    // Start the server
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`App running on port: ${port}`);
    });
};
