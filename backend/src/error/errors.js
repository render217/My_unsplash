class CustomApiError extends Error{
    constructor(message){
        super(message);
    }
}

class BadRequestError extends CustomApiError{
    constructor(message){
        super(message)
        this.statusCode = 400;
    }
}

class NotFoundError extends CustomApiError{
    constructor(message){
        super(message)
        this.statusCode = 404;
    }
}

module.exports = {
    CustomApiError,
    BadRequestError,
    NotFoundError
}