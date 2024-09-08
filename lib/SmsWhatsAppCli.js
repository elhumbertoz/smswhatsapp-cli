const axios = require('axios');
const SendMessageResponse = require('./models/SendMessageResponse');
const Chat = require('./models/Chat');
const LLMResponse = require('./models/LLMResponse');  

/**
 * Clase para interactuar con la API de SmsWhatsApp.
 */
class SmsWhatsAppCli {
    /**
     * Constructor para inicializar el cliente de SmsWhatsApp.
     * @param {string} token - El token de autenticación para la API de SmsWhatsApp.
     */
    constructor(token) {
        this.apiUrl = 'https://smswhatsapp.net:5433';
        this.token = token;
    }

    /**
     * Envía un mensaje a través de la API de SmsWhatsApp.
     * @param {string} phone - El número de teléfono al que se enviará el mensaje.
     * @param {string} message - El contenido del mensaje.
     * @param {string} [media=null] - URL del archivo multimedia que se enviará (opcional).
     * @param {string} [mimeType=null] - El tipo de archivo multimedia (opcional).
     * @param {string} [fileName=null] - El nombre del archivo multimedia (opcional).
     * @returns {Promise<Object>} - La respuesta de la API con información del mensaje enviado.
     * @fires Client#message_sent
     */
    async sendMessage(phone, message, media = null, mimeType = null, fileName = null) {
        const url = `${this.apiUrl}/chat/SendMessage/${phone}?number=${this.token}`;
        const isImage = mimeType && mimeType.includes('image');

        if (phone === null || phone === undefined) {
            console.error('Número de teléfono no válido');
            return null;
        }

        if (!phone.includes('@')) {
            phone += '@c.us';
        }

        const msgBody = {
            message: !isImage ? message : '',
            caption: isImage ? message : '',
            media: media,
            type: mimeType,
            title: fileName
        };

        try {
            const response = await axios.post(url, msgBody);

            // Convertir la respuesta en una instancia de SendMessageResponse y devolverla
            return SendMessageResponse.fromJson(response.data);
        } catch (error) {
            console.error(`Error enviando mensaje a ${phone}:`, error.message);
            return null; // Puedes manejar los errores de la forma que prefieras
        }
    }

    /**
   * Obtiene una lista de chats desde la API de SmsWhatsApp.
   * @param {Object} options - Opciones para filtrar los chats.
   * @param {boolean} [options.onlyUnread=false] - Si es verdadero, solo devuelve los chats no leídos.
   * @param {number} [options.limit=1000] - El número máximo de chats a devolver.
   * @param {boolean} [options.includePushname=false] - Si es verdadero, incluye el nombre push.
   * @param {boolean} [options.lite=false] - Si es verdadero, devuelve una versión ligera de los chats.
   * @returns {Promise<Array>} - Una lista de chats obtenidos desde la API.
   * @fires Client#chats_received
   */
    async getChats({ onlyUnread = false, limit = 1000, includePushname = false, lite = false }) {
        const url = `${this.apiUrl}/chat/GetChats?number=${this.token}&onlyunread=${onlyUnread}&limit=${limit}&includePushname=${includePushname}&lite=${lite}`;

        try {
            const response = await axios.get(url);
            const chats = response.data.message.map(chat => new Chat(
                chat.id,
                chat.name,
                chat.pushName,
                chat.isGroup,
                chat.isReadOnly,
                chat.archived,
                chat.pinned,
                chat.timestamp,
                chat.unreadCount
            ));

            return chats;
        } catch (error) {
            console.error('Error obteniendo los chats:', error.message);
            return null;
        }
    }

    /**
   * Genera una respuesta utilizando LLM para atención al cliente.
   * @param {string} phone - El número de teléfono del cliente.
   * @param {string} systemMessage - El mensaje del sistema que describe el comportamiento del asistente.
   * @param {string} [force=null] - Una petición específica que fuerza al LLM a analizar el chat desde afuera.
   * @returns {Promise<LLMResponse>} - La respuesta generada por el modelo LLM.
   */
    async generateLLM(phone, systemMessage, force = null) {
        if (phone === null || phone === undefined) {
            console.error('Número de teléfono no válido');
            return null;
        }

        if (!phone.includes('@')) {
            phone += '@c.us';
        }

        const url = `${this.apiUrl}/chat/LLMGenerate/${phone}?number=${this.token}`;
        const llmBody = {
            systemMessage: systemMessage,
            force: force  
        };

        try {
            const response = await axios.post(url, llmBody);
            return LLMResponse.fromJson(response.data);  
        } catch (error) {
            console.error(`Error al generar la respuesta LLM para ${phone}:`, error.message);
            return null;
        }
    }
}

module.exports = SmsWhatsAppCli;
