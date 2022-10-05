let LocalUser=undefined
const groupSocketEvents=async(socket,user,setUser,setSender)=>{
    LocalUser=user
    // socket.on('sentMessage',(msg)=>{
    //     console.log("the message: ",msg, "\n the list",messageList)
    //     LocalMessageList=LocalMessageList.concat(msg)
    //     setUser(LocalMessageList)
    // })
    // socket.on('whoTyped',async(sender)=>{
    //     console.log(sender)
    //     console.log('duh',sender)
    //     setSender(sender)
    // })
    // socket.on("whoTypedMain",async(sender)=>{
    //     console.log(sender)
    // })
    socket.on("whoTypingMain",async(sender)=>{
        console.log(sender)
        let user = 'hi'
    })
}
const updateMessageListArray=(newArray)=>{
    LocalUser=newArray
}
const destroyEvents=async(socket)=>{
    socket.off('connect');
    socket.off('sentMessage')
}
export {groupSocketEvents,destroyEvents,updateMessageListArray};