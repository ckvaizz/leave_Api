
const leaveRequest = {
    body:{
        type:"object",
        properties:{
            userId:{type:'string'},
            reason:{type:'string'},
            leaveDate:{type:'string'},
            
        },
        required:['userId','reason','leaveDate']
    }

}
const leaveUpdate = {
    body:{
        type:"object",
        properties:{
           
            status:{type:'string'} ,
            id:{type:'string'}  
        },
        required:['userId','status','id']
    }

}
module.exports = {leaveRequest,leaveUpdate}

