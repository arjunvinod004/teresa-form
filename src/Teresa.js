import React from 'react'
import { useLocation } from 'react-router-dom';
function Teresa() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const errorCode = queryParams.get('ErrorCode');
  const data = queryParams.get('Data');
  const message = queryParams.get('Message');
  console.log(errorCode);
  console.log(data);
  console.log(message);


  return (
    <div style={{position:'relative',color:'#fff'}}>
    <h1>Thank you for Register </h1>
   

          {errorCode? <p>ErrorCode: {errorCode}</p>:<p>no error code</p>}  
            <p>Data: {data}</p>
            <p>Message: {message}</p>
    {/* {data ? <p>{data}</p> : <p>No data received</p>} */}
</div>
  )
}

export default Teresa