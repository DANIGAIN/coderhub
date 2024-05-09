const formatError = (err)=>{
    const error = {
        message: err.message ? err.message : err.toString(),
        success: false 
    } 
    return error 
}
class CustomError{
    static internalServerError(err){
        const error = formatError(err)
        return{
            ...error,
            status:500
        }
    }
    static unauthorizeError(err){
        const error = formatError(err)
        return{
            ...error,
            status:401
        }
    }
    static badRequestError(err){
        const error = formatError(err)
        return{
            ...error,
            status:400
        }
    }
    static forbiddenError(err){
        const error = formatError(err)
        return{
            ...error,
            status:403
        }
    }
    static notFoundError(err){
        const error = formatError(err)
        return{
            ...error,
            status:404
        }
    }
    static throwError(err){
        const error = new Error(err.message);
        error.status = err.status ;
        error.success =  false;
        throw error ;
    }

}
module.exports = CustomError ;
