import { ImSpinner8 } from 'react-icons/im';
import './Carregando.css'; 

const Loading = () => {
  return ( 
     <div className="loader">
      <div className="sk-chase">
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
      </div>
    </div>
    
   // <div className="loading-container">
    //   <div className="loading-icon">
    //     <ImSpinner8 className="loading-icon" />
    //   </div>
    // </div>
    
    
  );
};

export default Loading;