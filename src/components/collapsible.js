import { useState } from 'react';

const Collapsible = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <h3
        onClick={toggleOpen} 
        style={{ cursor: 'pointer'}}
      >
        {title} <span className='
        '>{isOpen ? '▴' : '▾'}</span>
      </h3>
      {isOpen && <div style={{ padding: '0 1em' }}>{children}</div>}
    </div>
  );
};

export default Collapsible;
