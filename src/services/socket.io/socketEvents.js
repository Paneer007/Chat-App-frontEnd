let LocalMessageList=undefined
const socketEvents=async(socket,setMessageList,messageList,setSender)=>{
    LocalMessageList=messageList
    socket.on('connect',()=>{
        console.log('connected')
    })
    socket.on('sentMessage',(msg)=>{
        LocalMessageList=LocalMessageList.concat(msg)
        setMessageList(LocalMessageList)
    })
    socket.on('whoTyped',async(sender)=>{
        setSender(sender)
    })
    
}
const updateMessageListArray=(newArray)=>{
    LocalMessageList=newArray
}
const destroyEvents=async(socket)=>{
    socket.off('connect');
    socket.off('sentMessage')
}
export {socketEvents,destroyEvents,updateMessageListArray};