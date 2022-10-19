let LocalMessageList=[]
const socketEvents=async(socket,setMessageList,messageList,setSender)=>{
    LocalMessageList=messageList
    socket.on('connect',()=>{
        console.log('connected')
    })
    socket.on("sentMessage",(msg)=>{
        console.log("BRO BRO BRO THIS message is sent")
        LocalMessageList=LocalMessageList.concat(msg)
        setMessageList(LocalMessageList)
    })
    socket.on('whoTyped',async(sender)=>{
        console.log("SUUSUSUSUSUSUUSUUSUSUS")
        setSender(sender)
    })
    
}
const updateMessageListArray=(newArray)=>{
    LocalMessageList=newArray
}
const destroyEvents=async(socket)=>{
    //socket.off('connect');
    //socket.off('sentMessage')
}
export {socketEvents,destroyEvents,updateMessageListArray};