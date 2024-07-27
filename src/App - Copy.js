import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
function App() {
  const [email,setEmail]=useState('')
  const [message,setmessage]=useState('')
  const [ valid,setvalid]=useState('')
  const handlechange=(e)=>{
    const handleinput= e.target.value
setEmail(handleinput)
if(handleinput){
setmessage('')
}
  }

 
  const checkvalidation=(e)=>{
    e.preventDefault();
    const rgExp= /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]{2,}$/;
    if(rgExp.test(email)){
      setmessage('Email is valid')

    }else if(email===""){
      setmessage('please  Enter a Email ')
    } else if(!rgExp.test(email)){
      setmessage('Email is not valid')
    } else{
      setmessage("")
    }
  }
  return (
    <div className="App" >
      <div class="glass"></div>
      <div class="container ">

       <div className='px-4'>
       <form class="login-form" onSubmit={checkvalidation}>
          <div className='p-1'>
            <img style={{ width: '110px' }} src={require('./TERESA LOGO WHITE PNG.png')} />
          </div>
          <div className='row'>
            <div className='col-md-4 mb-4  col-tablet-6'>
              <div class="form-floating ">
                <input type="text" class="form-control" id="email" placeholder="Enter email" name="email" />
                <label for="email">NAME</label>
              </div>

            </div>

            <div className='col-md-4  col-tablet-6'>
              <div class="form-floating ">
                <input type="text" class="form-control" id="email" placeholder="Enter email" name="email" />
                <label for="email">NRI / INDIAN</label>
              </div>

            </div>
            <div className='col-md-4  col-tablet-6'>
              <div class="form-floating ">
                <input type="date" class="form-control" id="email" placeholder="Enter your DOB" name="email" />
                <label for="email">DOB</label>
              </div>
            </div>
            <div className='col-md-8 mb-4  col-tablet-6'>
              <div class="form-floating ">
                <input type="text" class="form-control" id="email" placeholder="Enter email" name="email" />
                <label for="email">ADDRESS</label>
              </div>

            </div>
            <div className='col-md-4 mb-4  col-tablet-6'>
              <div class="form-floating ">
                <input type="text" class="form-control" id="email" placeholder="Enter email" name="email" />
                <label for="email">PLACE</label>
              </div>

            </div>
            <div className='col-md-4  col-tablet-6'>
              <div class="form-floating ">
                <input type="number" class="form-control" id="email" placeholder="Enter email" name="email" />
                <label for="email">MOB NO 1</label>
              </div>

            </div>
            <div className='col-md-4 mb-4  col-tablet-6'>
              <div class="form-floating ">
                <input type="number" class="form-control" id="email" placeholder="Enter email" name="email" />
                <label for="email">MOB NO 2</label>
              </div>


            </div>
            <div className='col-md-4  col-tablet-6'>
              <div class="form-floating ">
                <input type="email" className={'form-control' } id="email" placeholder="Enter email" name="email" onChange={handlechange} value={email} />
                <label for="email">EMAIL ID</label>
                <p  className={message === 'Email is valid' ? 'valid' : 'invalid'}>{message}</p>
              </div>

            </div>

            <div className='col-md-4 col-tablet-6'>
              <div class="form-floating ">
                <input type="text" class="form-control" id="email" placeholder="Enter email" name="email" />
                <label for="email">OCCUPATION</label>
              </div>

            </div>
            <div className='col-md-4 mb-4  col-tablet-6'>
              <div class="form-floating ">
                <input type="text" class="form-control" id="email" placeholder="Enter email" name="email" />
                <label for="email">FUNCTION</label>
              </div>

            </div>
            <div className='col-md-4  col-tablet-6'>
              <div class="form-floating ">
                <input type="date" class="form-control" id="email" placeholder="Enter email" name="email" />
                <label for="email">DUE DATE</label>
              </div>

            </div>
            <div className='col-md-4 mb-4  col-tablet-6'>
              <div class="form-floating ">
                <select class="form-control">
                  <option>ITEMS</option>
                  <option>Option #2</option>
                  <option>Option #3</option>
                </select>
              </div>

            </div>
            <div className='col-md-4  col-tablet-6'>
              <div class="form-floating ">
                <input type="text" class="form-control" id="email" placeholder="Enter email" name="email" />
                <label for="email">COURIER / DIRECT</label>
              </div>

            </div>
            <div className='col-md-4  col-tablet-6'>
              <div class="form-floating ">
                <input type="time" class="form-control" id="email" placeholder="Enter email" name="email" />
                <label for="email">TIME</label>
              </div>

            </div>
            <div className='col-md-4  col-tablet-6 '>
              <div class="form-floating ">
                <input type="text" class="form-control" id="email" placeholder="Enter email" name="email" />
                <label for="email">CONTACT TIME</label>
              </div>

            </div>
            <div className='col-md-4  col-tablet-6'>

              <div class="form-floating ">
                <input type="text" class="form-control" id="email" placeholder="Enter email" name="email" />
                <input type="checkbox" name="" id="" className='mb-5' style={{position:'absolute',top:'50%',transform:'translateY(-50%)',right:'5px'}}/>
                <label for="email">GENERAL INFO</label>
              </div>

            </div>
            <div className='col-md-4 mb-4  col-tablet-6'>
              <div class="form-floating ">
            
                <input type="text" class="form-control" id="email" placeholder="Enter email" name="email"  />
                <input type="checkbox" name="" id="" className='mb-5' style={{position:'absolute',top:'50%',transform:'translateY(-50%)',right:'5px'}}  />
                <label for="email">TERMS & CONDITIONS</label>
              </div>

            </div>

          </div>
          <button type='submit' className='mb-4'>save</button>
        </form>
       </div>
      </div>
    </div>
  );
}

export default App;
