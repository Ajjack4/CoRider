import React, { useEffect, useState, useRef } from 'react';
import './MessageFetch.css';

interface Sender {
  image: string;
  is_kyc_verified: boolean;
  self: boolean;
  user_id: string;
}

interface ChatItem {
  id: string;
  message: string;
  sender: Sender;
  time: string;
}

const Chat: React.FC = () => {
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const scrollableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchChats(page);
  }, [page]);

  const fetchChats = (pageNumber: number) => {
    setLoading(true);
    fetch(`https://qa.corider.in/assignment/chat?page=${pageNumber}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.chats.length === 0) {
          setHasMore(false);
        } else {
          setChats((prevChats) => [ ...prevChats,...data.chats]);
        }
        setLoading(false);

        if (pageNumber === 0 && scrollableRef.current) {
         
          scrollableRef.current.scrollTop =0;
        }
      })
      .catch((error) => {
        console.error('Error fetching chat data:', error);
        setLoading(false);
      });
  };

  const handleScroll = () => {
    
    if (scrollableRef.current && hasMore && !loading) {
      // console.log(scrollableRef.current.scrollHeight)
      // console.log(scrollableRef.current.scrollTop)
      if (scrollableRef.current.scrollTop+scrollableRef.current.scrollHeight<=1000) {
        setPage((prevPage) => prevPage + 1);
        // console.log("Updated page ")
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-scrollable" onScroll={handleScroll} ref={scrollableRef}>
        {loading && <div className="loading">Loading...</div>}
        {chats.map((chat) => (
          <div key={chat.id} className={`chat-bubble ${chat.sender.self ? 'self' : ''}`}>
            <img src={chat.sender.image} alt={chat.sender.user_id} className="chat-image" />
            <div className="chat-message-container">
              <p className="chat-message">{chat.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
