/**
 * Representa la respuesta de la API tras enviar un mensaje.
 */
class SendMessageResponse {
  /**
   * Crea una instancia de la respuesta de un mensaje enviado.
   * @param {string} status - Estado del envío del mensaje ('success', 'failure', etc.).
   * @param {string} message - Detalles del mensaje enviado.
   * @param {string} id - ID del mensaje enviado.
   * @param {string|null} id2 - Un segundo ID del mensaje, si está presente.
   */
    constructor(status, message, id, id2) {
      this.status = status;
      this.message = message;
      this.id = id;
      this.id2 = id2;
    }
  
    /**
   * Crea una instancia de SendMessageResponse a partir de un JSON.
   * @param {Object} json - El objeto JSON que contiene los datos de la respuesta.
   * @param {string} json.status - Estado del envío del mensaje.
   * @param {string} json.message - Detalles del mensaje enviado.
   * @param {string} json.id - ID del mensaje enviado.
   * @param {string|null} json.id2 - Un segundo ID del mensaje, si está presente.
   * @returns {SendMessageResponse} - Una nueva instancia de SendMessageResponse.
   */
    static fromJson(json) {
      return new SendMessageResponse(json.status, json.message, json.id, json.id2);
    }
  }
  
  module.exports = SendMessageResponse;
  