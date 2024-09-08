# SmsWhatsApp CLI

Librería para interactuar con la API de SmsWhatsApp.

## Instalación

```bash
npm install smswhatsapp-cli
```

## Uso
```javascript
const SmsWhatsAppCli = require('smswhatsapp-cli');

const token = 'TuTokenDeSmsWhatsApp';
const client = new SmsWhatsAppCli(token);

client.sendMessage('593969626740@c.us', '¡Hola mundo!');
```

## Funciones
* sendMessage(phone, message, media = null, mimeType = null, fileName = null)
* getChats(options)
* generateLLM(phone, systemMessage, force = null)