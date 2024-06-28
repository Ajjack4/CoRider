import './HeaderChat.css'
import trip from '../../assets/trip.jpg'
import back1 from '../../assets/back.png'
import edit from '../../assets/editing.png'
import { useEffect, useState } from 'react'
import dots from '../../assets/dots.png'

interface Header {
  from: string;
  to: string;
  name: string;
}

const HeaderChat = () => {
  const [TripHead, setTripHead] = useState<Header>();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    fetch(`https://qa.corider.in/assignment/chat?page=0`)
      .then((response) => response.json())
      .then((response) => setTripHead(response));
  }, []);

  const TripHeader = TripHead;

  const handleEditClick = () => {
    setIsEditing(true);
    setNewName(TripHeader?.name || '');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleFormSubmit = () => {
    setTripHead((prev) => prev ? { ...prev, name: newName } : undefined);
    setIsEditing(false);
  };

  return (
    <div className='Header'>
      <div className="title">
        <div className='ChatName'>
          <img src={back1} />
          {isEditing ? (
            <div className='editname'>
              <input 
                type="text" 
                value={newName} 
                onChange={handleInputChange} 
              />
              <button onClick={handleFormSubmit}>Save</button>
            </div>
          ) : (
            <>
              <h3>{TripHeader?.name}</h3>
              <img src={edit} className='edit' onClick={handleEditClick} />
            </>
          )}
        </div>
        <div className='TripName'>
         
          <img src={trip} className='tripimage'/>
          <div className='Locations'>
            <div className='from'>
              <p>From</p>{TripHeader?.from}
            </div>
            <div className='to'>
              <p>To</p>{TripHeader?.to}
            </div>
          </div>
          
          <img src={dots} className='dots' />
        </div>
      </div>
    </div>
  )
}

export default HeaderChat
