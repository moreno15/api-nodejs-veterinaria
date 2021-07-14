class errorResponse extends Error {
    constructor(mensaje, status) {
        super(mensaje);
        this.status = status;
    }
}

module.exports = errorResponse;