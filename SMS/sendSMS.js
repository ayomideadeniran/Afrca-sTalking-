const AfricasTalking = require('africastalking');

// TODO: Initialize Africa's Talking

const africastalking = AfricasTalking({
  apiKey: 'atsk_135ba4674ab564291ac3004253ee55ce279cab21079d12c0d868692ff9f246d3094fe9a8', 
  username: 'sandbox'
});


module.exports = async function sendSMS() {
    
    // TODO: Send message
 try {
  const result=await africastalking.SMS.send({
    to: ['+2348118938941', '+2348024090961',], 
    message: 'Hey Ninja! Wassup...',
    from: '89098'
  });
  console.log(result);
   } catch(ex) {
  console.error(ex);
} 
};





