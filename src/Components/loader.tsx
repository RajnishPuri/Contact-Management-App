import React from 'react';
import './loader.css';

const Loader: React.FC = () => {
    return (
        <div className='flex flex-col items-center gap-4'>
            <div className='triangle'></div>
            <div className='font-semibold text-2xl'>Taiyo is Loading!</div>
            <div className='bar'></div>
        </div>
    );
};

export default Loader;
