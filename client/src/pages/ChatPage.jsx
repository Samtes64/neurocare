import { PrettyChatWindow } from "react-chat-engine-pretty";
import { useSelector } from "react-redux";

const ChatsPage = () => {
    const{currentUser} = useSelector((state)=>state.user)
    
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <PrettyChatWindow
        projectId="041a7342-4a91-40c0-ada4-6aa6ac8a1177"
        username={currentUser.email} // adam
        secret={currentUser.email} // pass1234
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default ChatsPage;