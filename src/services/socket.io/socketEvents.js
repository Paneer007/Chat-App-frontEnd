let LocalMessageList=undefined
const socketEvents=async(socket,setMessageList,messageList,setSender)=>{
    let LocalMessageList=messageList
    socket.on('connect',()=>{
        console.log('connected')
    })
    socket.on('sentMessage',(msg)=>{
        console.log("the message: ",msg, "\n the list",messageList)
        LocalMessageList=LocalMessageList.concat(msg)
        setMessageList(LocalMessageList)
    })
    socket.on('whoTyped',async(sender)=>{
        console.log(sender)
        console.log('duh',sender)
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