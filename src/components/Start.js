import React, { useRef} from 'react'

function Start({setUserName}) {
    const inputRef = useRef();
    
    const handleClick = () => {
       inputRef.current.value && setUserName(inputRef.current.value);
    };
  return (
    <div className="start">
        <input 
        placeholder="Enter your name" 
        className="startInput"
        ref={inputRef}
        />
        <button 
        className="startButton"
        onClick={handleClick}
        >
            Start
        </button>
    </div>
  );
}
export default Start;