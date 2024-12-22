import KikiSection from "./KikiSection"
import Chat from "./Chat"

const ChatPage = () => {
  return (
    <div className="overflow-hidden">
        <KikiSection animation={'salute'} className="left-[-7%] top-[12%]"/>
        <Chat/>
    </div>
  )
}

export default ChatPage
