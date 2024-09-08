const SmsWhatsAppCli = require('./index');

const token = 'Ookdkuuf8867jJgdkPKDydKSr8ska';
const client = new SmsWhatsAppCli(token);

(async () => {
  // Probamos la función sendMessage
  const phone = '593969626740';
  const message = '¡Hola mundo!';

  const sendMessageResponse = await client.sendMessage(phone, message);

  if (sendMessageResponse) {
    console.log('Mensaje enviado:', sendMessageResponse);
  } else {
    console.log('Hubo un problema enviando el mensaje.');
  }

  // Probamos la función getChats
  const getChatsResponse = await client.getChats({ onlyUnread: true, limit: 50 });

  if (getChatsResponse) {
    getChatsResponse.forEach(chat => {
      console.log(`Chat con ${chat.name} (último contacto: ${chat.lastContact})`);
    });
  } else {
    console.log('Hubo un problema obteniendo los chats.');
  }

  // Probamos la función generateLLM
  const systemMessage = 'Actúa como un asistente de atención al cliente de Farmacias Unidas.';
  const llmResponse = await client.generateLLM(phone, systemMessage);

  if (llmResponse) {
    console.log(`Estado: ${llmResponse.status}`);
    console.log(`Mensaje generado por LLM: ${llmResponse.message}`);
  } else {
    console.log('Hubo un problema generando la respuesta LLM.');
  }

})();