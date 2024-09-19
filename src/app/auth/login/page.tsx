import Login from '@/components/Login';
import React from 'react';

type pageProps = {
    
};

const page:React.FC<pageProps> = () => {
    
    return <div className='flex justify-center items-center align-middle mt-11 '>
        <Login/>
    </div>
}
export default page;