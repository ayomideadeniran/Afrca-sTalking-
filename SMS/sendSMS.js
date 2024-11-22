const AfricasTalking = require('africastalking');

// Initialize Africa's Talking
const africastalking = AfricasTalking({
    apiKey: 'atsk_135ba4674ab564291ac3004253ee55ce279cab21079d12c0d868692ff9f246d3094fe9a8',
    username: 'sandbox',
});

module.exports = async function sendSMS(numbers, message) {
    if (!numbers || numbers.length === 0) {
        throw new Error("Recipients' numbers are required.");
    }
    if (!message) {
        throw new Error("Message content is required.");
    }

    try {
        const result = await africastalking.SMS.send({
            to: numbers,
            message: message,
            from: '89098', // Optional sender ID
        });
        console.log('SMS sent successfully:', result);
        return result;
    } catch (error) {
        console.error('Error sending SMS:', error);
        throw error;
    }
};
