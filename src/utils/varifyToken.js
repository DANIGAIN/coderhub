export const varifyToken = (token)=>{
    try{
        if(!token) return false 
        const { sub, exp } = token;
        if (!sub || exp < Date.now() / 1000) {
            return false; 
        }
        return true
    }catch(error){
        console.log(" there was a token error " ,token)
        return false ;
    }
}