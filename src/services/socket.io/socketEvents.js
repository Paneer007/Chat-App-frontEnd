const socketEvents=async(socket,setMessageList,messageList)=>{
    socket.on('connect',()=>{
        console.log('connected')
    })
    socket.on('sentMessage',(msg)=>{
        console.log("the message: ",msg, "\n the list",messageList)
        setMessageList(messageList.concat(msg))
    })
}
export default socketEvents