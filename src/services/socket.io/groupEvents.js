let LocalUser=undefined
const groupSocketEvents=async(socket,user,setUser,setSender)=>{
    LocalUser=user
    socket.on('connect',()=>{
        console.log('hello world')
    })
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
        console.log('this is the end')
        console.log("hey ther whpre",sender)
        console.log(LocalUser)
        try{
            let LocalGroups=LocalUser.Groups.map(x=>x.GeneralId === sender.groupId?{...x,LastMessageSender:sender.name}:x )
            LocalUser={...LocalUser,Groups:LocalGroups}
            console.log(LocalGroups,LocalUser)
            setUser(LocalUser)
        }catch(e){
            console.log('error')
        }
    })
    socket.on("whoTypedMain",async()=>{
        console.log('chumma thala')
    })
}
const updateMessageListArray=(newArray)=>{
    LocalUser=newArray
}
const destroyGroupEvents=async(socket)=>{
    socket.off('connect');
    socket.off('sentMessage')
}
export {groupSocketEvents,destroyGroupEvents};