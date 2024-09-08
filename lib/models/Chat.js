/**
 * Representa un chat dentro de la API de SmsWhatsApp.
 */
class Chat {
  /**
   * Crea una instancia de un chat.
   * @param {string} id - ID del chat.
   * @param {string} name - Nombre del chat o contacto.
   * @param {string} pushName - Nombre push del contacto.
   * @param {boolean} isGroup - Indica si el chat es un grupo.
   * @param {boolean} isReadOnly - Indica si el chat es de solo lectura.
   * @param {boolean} archived - Indica si el chat está archivado.
   * @param {boolean} pinned - Indica si el chat está fijado.
   * @param {number} timestamp - Marca de tiempo del último contacto.
   * @param {number} unreadCount - Número de mensajes no leídos en el chat.
   */
  constructor(id, name, pushName, isGroup, isReadOnly, archived, pinned, timestamp, unreadCount) {
    this.id = id;
    this.name = name;
    this.pushName = pushName;
    this.isGroup = isGroup;
    this.isReadOnly = isReadOnly;
    this.archived = archived;
    this.pinned = pinned;
    this._timestamp = timestamp;  // Propiedad interna
    this.unreadCount = unreadCount;
  }

  /**
   * Devuelve la fecha y hora del último contacto en formato Date.
   * @returns {Date} - Fecha y hora del último contacto.
   */
  get lastContact() {
    return new Date(this._timestamp * 1000);  // Convertimos de segundos a milisegundos
  }
}

module.exports = Chat;