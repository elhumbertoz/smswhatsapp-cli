/**
 * Representa la respuesta generada por el modelo LLM en la API de SmsWhatsApp.
 */
class LLMResponse {
    /**
     * Crea una instancia de LLMResponse.
     * @param {string} status - El estado de la respuesta ('success', 'error', etc.).
     * @param {string} message - El mensaje generado por el modelo LLM.
     */
    constructor(status, message) {
      this.status = status;
      this.message = message;
    }
  
    /**
     * Crea una instancia de LLMResponse a partir de un objeto JSON.
     * @param {Object} json - El objeto JSON que contiene los datos de la respuesta.
     * @param {string} json.status - El estado de la respuesta.
     * @param {string} json.message - El mensaje generado por el modelo LLM.
     * @returns {LLMResponse} - Una nueva instancia de LLMResponse.
     */
    static fromJson(json) {
      return new LLMResponse(json.status, json.message);
    }
  }
  
  module.exports = LLMResponse;
  