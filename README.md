# SmsWhatsApp CLI

Librería para interactuar con la API de SmsWhatsApp.

## Instalación

```bash
npm install smswhatsapp-cli
```

## Uso
```javascript
const SmsWhatsAppCli = require('smswhatsapp-cli');

const token = 'Phone03';
const client = new SmsWhatsAppCli(token);

client.sendMessage('1234567890', '¡Hola mundo!');
```

## Funciones
* sendMessage(phone, message, media = null, mimeType = null, fileName = null)
* getChats(options)
* generateLLM(phone, systemMessage, force = null)
