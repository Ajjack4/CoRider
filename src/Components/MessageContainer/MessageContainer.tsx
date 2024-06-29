import { useState } from 'react'
import './MessageContainer.css'
import send from '../../assets/send.png'
import HeaderChat from '../Header/HeaderChat';
import MessageFetch from '../FetchFromApi/MessageFetch'
import clip from '../../assets/clip.png'

const MessageContainer = () => {

const [input,setInput]=useState([]);

const handleInputChange = (e) => {
  setInput(e.target.value);
};

  return (
    <div className="MessageContainer">
      <div className='MessageBox'>
        <HeaderChat/>
        <MessageFetch/>
        <div className='MessageFooter'> 
         <div className='textInput'>
          <div className="contain">
            <input
            
            value={input}
            onChange={handleInputChange}
            id="1"
            placeholder="Type a message..." 
            
            ></input>
            <img src={clip} />
            <img src={send}/>
            </div>
            
          </div>
         
          
        </div>

        
        {/* <div className='MessageFooter'>
          <div className='MessageInput'>
            <input type='text' placeholder='Type your message here' />
          </div>
          <div className='MessageSend'>
            <button>Send</button>
          </div>
        </div> */}

      </div>
      
    </div>
  )
}

export default MessageContainer


