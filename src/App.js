import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";
import $ from "jquery";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function App() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  let [shipmentto, setShipmentto] = useState("");
  let [customertype, setCustomertype] = useState("");
  const [phone1, setPhone1] = useState(""); 
  const [phone2, setPhone2] = useState("");
  const [phone1ErrorMessage,setPhone1ErrorMessage]=useState('')
  const [phone2ErrorMessage,setPhone2ErrorMessage]=useState('')
  const [validPhone1, setValidPhone1] = useState(false); 
  const [validPhone2, setValidPhone2] = useState(false); 
  const [keralaaddress, setkeralaAddress] = useState("");
  const [Country,setCountry]=useState([])
  const [countrytype,setCountryType]=useState("")
  const [selectedcountry,setselectedCountry]=useState("")
  const [presentaddress,setPresentAddress]=useState('');
  const [dob, setDob] = useState("");
  const [emailErrorMessage,setEmailErrorMessage]=useState('')
  const [email, setEmail] = useState("");
  const [resultshow, setResultshow] = useState("");
  const [today, setToday] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [Function, setFunction] = useState([]); // function
  const [functiontype, setFunctionType] = useState("");
  const [selectedfunction, setSelectedFunction] = useState({
    Id: "",
    Name: "",
  }); // function values dropdown
  const [customEvent, setCustomEvent] = useState("");
  const [material, setMaterial] = useState([]); // material
  const [materialType, setMaterialType] = useState("");
  const [selectedmaterial, setSelectedMaterial] = useState(""); // material values from dropdown
  const [occupation, setOccupation] = useState(""); // occupation
  const [reference,SetReference]=useState([])
  const [selectedreference,setSelectedReference]=useState("")
  const [deliveryoption,setDeliveryOption]=useState([])
  const [selecteddeliveryoption,setSelectedDeliveryOption]=useState('')
  let [courierType, setcourierType] = useState("");
  const [contacttime, setContacttime] = useState("");
  const [ischecked, setIsChecked] = useState(false);
  const [others, setOthers] = useState(""); // function others in a dropdown
  const [othervalue, setOtherValue] = useState("");
  const [kyc, setKyc] = useState([]); // kyc state
  const [save, setSave] = useState([]);
const navigate=useNavigate();
const baseUrl = `${window.location.protocol}//${window.location.host}`;
console.log(baseUrl);

console.log(save);
// const data = { ErrorCode: 0, Data: '110235', Message: '110235' };
// console.log(data);
// console.log('save data',save);
// const params = new URLSearchParams(data).toString();


// const url=`${baseUrl}/teresa?/${params}`;
// console.log(url);


  // const handlechange = (e) => {
  //   const handleinput = e.target.value;
  //   setEmail(handleinput);
  //   if (handleinput) {
  //     setmessage("");
  //   }
  // };
 const onPhone1KeyUp=(e)=>{
  if((phone1.length > 16) || (phone1.length == 0)){
       setValidPhone1(false);
       setPhone1ErrorMessage('Minimum 16 numbers');
  }else{
        setValidPhone1(true);
       setPhone1ErrorMessage(''); 
  } 
 }

 const onPhone2KeyUp=()=>{
  if((phone2.length>16)|| (phone2.length == 0)){
setValidPhone2(false);
setPhone2ErrorMessage('Minimum 16 numbers')

  }else{
    setValidPhone2(true);
    setPhone2ErrorMessage('');
  }
 }



 const onemailKeyUp=()=>{
  if(email.length == 0){
    setEmailErrorMessage('Enter your Email');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailRegex.test(email)){
      setEmailErrorMessage('');
      setEmail(email);
    }else{
      setEmailErrorMessage('Please enter valid email');
    }
  }
 }

console.log(ischecked);
  const handleothersdropdown = (e) => {
    const selectedName = e.target.value;
    setFunctionType(selectedName);
    const materialvalues = Function.find(
      (option) => option.Name.toString() === selectedName
    );
    setSelectedFunction({ Id: materialvalues.Id, Name: materialvalues.Name });

    setOthers(e.target.value);
    if (e.target.value !== "OTHERS") {
      setCustomEvent(""); // Reset custom event if not 'OTHERS'
    }
  };



  // contact time

  const handlecontacttime = (e) => {
    setContacttime(e.target.value);
  };

  // parameter
  const PrmCmpId = 1;
  const PrmBrId = 2;
  const PrmName = firstname;
  const PrmKycNo = kyc.Data;
  const PrmAddress = keralaaddress;
  let PrmIsIndian = selectedcountry;
 const PrmSecondName=lastname
  console.log(PrmIsIndian);
  let PrmIsAbroad = shipmentto;
  const PrmDueDate = selectedDate;
  const PrmMobileNo =phone1;
  const PrmCAddress = presentaddress
  const PrmPhoneNo=phone2
  const PrmEmail = email;
  const PrmOccupation = occupation;
  const PrmFunctionId = selectedfunction.Id;
  const PrmOtherFunction = othervalue;
  const PrmDressTypeId = selectedmaterial.Id;
  const PrmDob = dob;
  const PrmContactTime = contacttime;
  const PrmCountryId=selectedcountry
  const PrmRefferenceId= selectedreference
  const PrmShippingId=selecteddeliveryoption

console.log(PrmFunctionId);


  useEffect(() => {
    if (shipmentto === 'india') {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 20 );
      setToday(currentDate.toISOString().split("T")[0]);
    } else {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 30 );
      setToday(currentDate.toISOString().split("T")[0]);
    }
  }, [shipmentto]);


  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleUserTypeChange = (e) => {
    setSelectedDate('');
    const shipment = e.target.value;
    setShipmentto(shipment);
  };

  //button enable condition
  const handlebuttonchange = (e) => {
    setIsChecked(e.target.checked);
  };

  // kyc api call

  useEffect(() => {
    axios
      .get(`http://localhost:8000/Kyc`, {
        params: { PrmCmpId: PrmCmpId, PrmBrId: PrmBrId },
      })
      .then((response) => {
        setKyc(response.data);
        // console.log(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // function api call

  useEffect(() => {
    axios
      .get("http://localhost:8000/function")
      .then((responsee) => {
        setFunction(responsee.data);
        //console.log(responsee.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // material api call

  useEffect(() => {
    axios
      .get("http://localhost:8000/material", {
        params: { PrmCmpId: PrmCmpId, PrmBrId: PrmBrId },
      })
      .then((response) => {
        setMaterial(response.data);
        //console.log(response.data);
      });
  }, []);


  // country api call
useEffect(()=>{
  axios.get('http://localhost:8000/country')
  
  .then((response)=>{
    setCountry(response.data)
  })
  .catch((err=>console.log(err)))
  

},[])


// refernce api call

useEffect(()=>{
axios.get('http://localhost:8000/reference')
.then((respponse)=>{
  SetReference(respponse.data)
})
.catch((err)=>console.log(err))
},[])


// shipping api call

useEffect(()=>{
  axios.get('http://localhost:8000/shipping')
  .then((response)=>{
    setDeliveryOption(response.data)
  })
  .catch((err)=>console.log(err))
},[])
console.log(deliveryoption);
  // console.log(shipmentto);

console.log(firstname);
console.log(lastname);
console.log(shipmentto);

console.log(keralaaddress);
console.log(presentaddress);
console.log(email);
console.log(occupation);
console.log(functiontype);
console.log(materialType);
console.log(dob);
console.log(selectedDate);
console.log(phone1);
console.log(phone2);
console.log(contacttime);
console.log(ischecked);
console.log(validPhone1);
console.log(validPhone2);
console.log(selectedreference);
console.log(selectedcountry);
console.log(selecteddeliveryoption);

  useEffect(()=>{
    if (firstname && lastname && shipmentto && keralaaddress && presentaddress && email && occupation && functiontype && materialType && dob  && contacttime && ischecked && validPhone1 && validPhone2 && selectedreference && selectedcountry){
      $('#SaveButton').prop('disabled', false); 
    }
    else{
    $('#SaveButton').prop('disabled', true); 
    }
  })

//   const handlesubmit = async () => {
//     alert('hii');
    
   

//     try {
//         if (shipmentto === 'abroad') {
//             PrmIsAbroad = true;
//         } else if (shipmentto === 'india') {
//             PrmIsAbroad = false;
//         }
        
//         if (selectedcountry === '2') {
//             PrmIsIndian = true;
//         } else {
//             PrmIsIndian = false;
//         }

//         alert('api call');
//         // alert(PrmKycNo)
//        alert(`thank you for register your kyc no is ${PrmKycNo}`)

      

//         const response = await axios.get('http://localhost:8000/save', {
//             params: {
//                 PrmCmpId,
//                 PrmBrId,
//                 PrmName,
//                 PrmKycNo,
//                 PrmAddress,
//                 PrmCAddress,
//                 PrmCountryId,
//                 PrmIsIndian,
//                 PrmIsAbroad,
//                 PrmDueDate,
//                 PrmMobileNo,
//                 PrmPhoneNo,
//                 PrmEmail,
//                 PrmOccupation,
//                 PrmFunctionId,
//                 PrmOtherFunction,
//                 PrmDressTypeId,
//                 PrmDob,
//                 PrmContactTime,
//                 PrmSecondName,
//                 PrmRefferenceId,
//                 PrmShippingId
//             }
           

//         });
//       alert('api called sucess')
//         setSave(response.data);
//         alert(response.data.Data);
//         const baseUrl = `${window.location.protocol}//${window.location.host}`;
//         const queryParams = new URLSearchParams(response.data).toString();
//         const url = `${baseUrl}/teresa?${queryParams}`; // Note the '?' before queryParams
  
//         // Redirect to the new URL
//         window.location.href = url;
//         // const baseUrl = `${window.location.protocol}//${window.location.host}`;
//         // const data = response.data;
//         // const params = new URLSearchParams(data).toString();
//         // const url = `${baseUrl}/teresa?/${params}`;
 
//         // window.location.href = url;
      

       
//     } catch (error) {
//         alert(error);
//     }
// }


  const handlesubmit=()=>{
    alert('hii')
    try {

      if(shipmentto == 'abroad'){
                    PrmIsAbroad = true;
                  }
                  if(shipmentto == 'india'){
                    PrmIsAbroad = false;
                  }
                  // if(customertype == 'nri'){
                  //   PrmIsIndian = false;
                  // }
                  // if(customertype == 'india'){
                  //   PrmIsIndian = true;
                  // }
                
                  if(selectedcountry == '2'){
                    PrmIsIndian = true
                  }else{
PrmIsIndian= false
                  }
                  alert('api call'); 
                  alert(PrmKycNo)
      axios.get('http://localhost:8000/save',{params:{PrmCmpId:PrmCmpId,PrmBrId:PrmBrId,PrmName:PrmName,PrmKycNo:PrmKycNo,PrmAddress:PrmAddress,PrmCAddress:PrmCAddress, PrmCountryId:PrmCountryId,  PrmIsIndian:PrmIsIndian,PrmIsAbroad:PrmIsAbroad,PrmDueDate:PrmDueDate,PrmMobileNo:PrmMobileNo,PrmPhoneNo:PrmPhoneNo, PrmEmail:PrmEmail,PrmOccupation:PrmOccupation,PrmFunctionId:PrmFunctionId,PrmOtherFunction:PrmOtherFunction,PrmDressTypeId:PrmDressTypeId,PrmDob:PrmDob,PrmContactTime:PrmContactTime,
       PrmSecondName:PrmSecondName,PrmRefferenceId:PrmRefferenceId,PrmShippingId:PrmShippingId }})
      .then((res)=>{
        setSave(res.data)
        alert(res.data.Data)
        const baseUrl = `${window.location.protocol}//${window.location.host}`;
        console.log(baseUrl);
        console.log(save);
       
        
        console.log('save data',save);
        const params = new URLSearchParams(res.data).toString();
        
        
        const url=`${baseUrl}/teresa?/${params}`;
        console.log(url);
        
                  window.location.href=url
      })
      .catch((err)=>{
        alert(err)
      })
        
      

    } 
    catch (error) {
      alert(error)
    }
  }


//   const handlesubmit = async () => {
// alert('hi')
//     try {
//       if (!name) {
//         $(".validName").removeClass("d-none");
//       } else {
//         $(".validName").addClass("d-none");
//         setName(name);
//       }
     



//       if(!selectedDate){
//         $(".validduedate").removeClass('d-none');

//       }else{
//         $(".validduedate").addClass('d-none')
//       }



//       if (!shipmentto) {
//         $(".validShipmentto").removeClass("d-none");
//       } else {
//         $(".validShipmentto").addClass("d-none");
//         if (shipmentto == "abroad") {
//           setShipmentto('abroad');
//         } else {
//           setShipmentto('india');
//           //setShipmentto(shipmentto);
//         }
//       }

//       if (!customertype) {
//         $(".validCustomertype").removeClass("d-none");
//       } else {
//         $(".validCustomertype").addClass("d-none");
//         if (customertype == "india") {
//           setCustomertype('india');
//         } else {
//           setCustomertype('nri');
//           //setCustomertype(customertype);
//         }
//       }

//       if (!address) {
//         $(".validaddress").removeClass("d-none");
//       } else {
//         $(".validaddress").addClass("d-none");
//         setAddress(address);
//       }


//       if (!materialType) {
//         $(".validmaterial").removeClass("d-none");
//       } else {
//         $(".validmaterial").addClass("d-none");
//         setMaterialType(materialType);
//       }
     
//       if (!courierType) {
//         $(".validcourier").removeClass("d-none");
//       } else {
//         $(".validcourier").addClass("d-none");
//         if (courierType == "courier") {
//           setcourierType('courier');
//         } else {
//           setcourierType('direct');
//           // setcourierType(courierType)
//         }
//       }

//       if (!contacttime) {
//         $(".validcontact").removeClass("d-none");
//       } else {
//         $(".validcontact").addClass("d-none");
//         setContacttime(contacttime);
//       }


//       // alert(name);alert(email);alert(phone1);alert(shipmentto);alert(customertype);alert(address);alert(occupation);alert(functiontype);alert(materialType);alert(dob);alert(courierType);alert(contacttime)

//       if (
//         name &&
//         email &&
//         phone1 &&
//         shipmentto &&
//         customertype &&
//         address &&
//         occupation &&
//         functiontype &&
//         materialType &&
//         dob &&
//         courierType &&
//         contacttime  
//       ) {

//           if(shipmentto == 'abroad'){
//             PrmIsAbroad = true;
//           }
//           if(shipmentto == 'india'){
//             PrmIsAbroad = false;
//           }
//           if(customertype == 'nri'){
//             PrmIsIndian = false;
//           }
//           if(customertype == 'india'){
//             PrmIsIndian = true;
//           }
//           if(courierType == 'courier'){
//             PrmIsCourier = true;
//           }
//           if(courierType == 'direct'){
//             PrmIsCourier = false;
//           }


//           alert('api call'); 
// //           const response= await  axios.get(`http://localhost:8000/save`,{params:{PrmCmpId:PrmCmpId,PrmBrId:PrmBrId,PrmName:PrmName,PrmKycNo:PrmKycNo,PrmAddress:PrmAddress,PrmIsIndian:PrmIsIndian,PrmIsAbroad:PrmIsAbroad,PrmDueDate:PrmDueDate,PrmMobileNo:PrmMobileNo,PrmEmail:PrmEmail,PrmOccupation:PrmOccupation,PrmFunctionId:PrmFunctionId,PrmOtherFunction:PrmOtherFunction,PrmDressTypeId:PrmDressTypeId,PrmDob:PrmDob,PrmContactTime:PrmContactTime,PrmIsCourier:PrmIsCourier}})

// //           const result= response.data
// //           alert(response.data.Data)
// //           console.log(result);
// //           const baseUrl = `${window.location.protocol}//${window.location.host}`;
// // console.log(baseUrl);

// // console.log(save);
// // const data = result;
// // console.log(data);
// // console.log('save data',save);
// // const params = new URLSearchParams(data).toString();


// // const url=`${baseUrl}/teresa?/${params}`;
// // console.log(url);

// //           window.location.href=url
//             axios.get(`http://localhost:8000/save`,{params:{PrmCmpId:PrmCmpId,PrmBrId:PrmBrId,PrmName:PrmName,PrmKycNo:PrmKycNo,PrmAddress:PrmAddress,PrmIsIndian:PrmIsIndian,PrmIsAbroad:PrmIsAbroad,PrmDueDate:PrmDueDate,PrmMobileNo:PrmMobileNo,PrmEmail:PrmEmail,PrmOccupation:PrmOccupation,PrmFunctionId:PrmFunctionId,PrmOtherFunction:PrmOtherFunction,PrmDressTypeId:PrmDressTypeId,PrmDob:PrmDob,PrmContactTime:PrmContactTime,PrmIsCourier:PrmIsCourier}})

//             .then((response) => {
//               setSave(response.data);
//               alert(response.data.Data); // Second alert to indicate the response
//               const data = response.data
// console.log(data);
// console.log('save data',save);
// const params = new URLSearchParams(data).toString();


// const url=`${baseUrl}/teresa?/${params}`;
// console.log(url);

              
//               console.log(response.data);
//               window.location.href=url
             
              
//             })
//             .catch((error) => {
//               console.error(error);
//               alert('Error occurred: ' + error.message); // Alert in case of error
//             });
            
//       }
//     } catch (err) {
//       console.error('There was an error', err);
//     }
//   };
  // occupation
  const handleoccupchange = (e) => {
    setOccupation(e.target.value);
    // console.log("occupation", e.target.value);
  };
 
  console.log(selectedcountry);

  const handlematerialdropdown = (e) => {
    setMaterialType(e.target.value);
    const materialvalues = material.find(
      (option) => option.Id.toString() === e.target.value
    ).Name;
    setSelectedMaterial({ Id: e.target.value, Name: e.target.value });
    // console.log("material ", { Id: e.target.value, Name: materialvalues });
  };



  return (
    <div className="App">
      <div class="glass"></div>
      <div class="container ">
        <div className="px-4">
          <form class="login-form" >
            <div className="p-1">
              <img style={{ width: "110px", position:'relative' }} src={require("./TERESA LOGO WHITE PNG.png")} />
            </div>
            <div className="row">
              <h6 className="mb-4" style={{color:'#fff',zIndex:'1'}}><b>KYC NO : </b>{ kyc.Data }</h6>


             
              <div className="col-md-6 mb-2  col-tablet-6">
                <div class="form-floating ">
                  <input
                    type="text"
                    class="form-control"
                    
                    placeholder="Enter email"
                    name="first name"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <label for="email"> First Name</label>
                  <p className="validName invalid d-none">Name is required</p>
                </div>
              </div>
              
              <div className="col-md-6 mb-2  col-tablet-6">
                <div class="form-floating ">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Last Name"
                    name="last name"
                    value={lastname}
                    onChange={(e)=>setLastName(e.target.value)}

                   
                  />
                  <label for="email"> Last  Name</label>
                  <p className="validName invalid d-none">Name is required</p>
                </div>
              </div>

              <div className="col-md-6 mb-1 col-tablet-6">
                <div class="form-floating ">
                  <input
                    type="number"
                    class="form-control"
                    
                    placeholder="Enter email"
                    name="Phone1 no"
                    onChange={(e) => setPhone1(e.target.value)}
                   value={phone1}
                    onKeyUp={onPhone1KeyUp}
                  />
               
                  <label for="email">WhatsApp No</label>
                  
                  <p className="validMob1 invalid">{ phone1ErrorMessage }</p>
                </div>
              </div>

              <div className="col-md-6 mb-1  col-tablet-6">
                <div class="form-floating ">
                  <input
                    type="number"
                    class="form-control"
                   
                  value={phone2}
                  onChange={(e)=>setPhone2(e.target.value)}
                  onKeyUp={onPhone2KeyUp}
                    placeholder="Enter email"
                    name="phone2 no"
                  />
                
                  <label for="email">Mobile No</label>
                  <p className="validMob2 invalid">{phone2ErrorMessage }</p>
                </div>
              </div>


              <div className="col-md-6 mb-2  col-tablet-6">
                <div class="form-floating ">
                  <input
                    type="text"
                    class="form-control"
                   
                    placeholder="Enter email"
                    name="kerala address"
                    onChange={(e) => setkeralaAddress(e.target.value)}
                    value={keralaaddress}
                  />
                  <label for="email">Kerala Address</label>
                  <p className="validaddress invalid d-none">
                    address is required
                  </p>
                </div>
              </div>


              <div className="col-md-6 mb-2  col-tablet-6">
                <div class="form-floating">
                  {/* <label htmlFor="">Shipment To</label> */}
                  <select
                    class="form-select"
                    id="floatingSelect"
                    aria-label="Floating label select example"
                   onChange={(e)=>setselectedCountry(e.target.value)}
                   value={selectedcountry}
                  >
                    <option value="" selected>
                      Select Country
                    </option>
                    { Country.map((item, index) => (
          <option value={item.Id} key={index}>{item.Name}</option>
        ))}
                   
                  </select>
                 
                </div>
              </div>


              <div className="col-md-6 mb-2  col-tablet-6">
                <div class="form-floating ">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter email"
                    name="presentaddress"
                    onChange={(e) => setPresentAddress(e.target.value)}
                    value={presentaddress}
                  />
                  <label for="email"> Present Address</label>
                  <p className="validaddress invalid d-none">
                    address is required
                  </p>
                </div>
              </div>

              <div className="col-md-6 mb-2  col-tablet-6">
                <div class="form-floating ">
                  <input
                    type="date"
                    class="form-control"
                    id="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={(e) => setDob(e.target.value)}
                    value={dob}
                  />
                  <label for="email">Dob</label>
                </div>
                <p className="validdate invalid d-none">Dob is required</p>
              </div>



              <div className="col-md-6 mb-2  col-tablet-6">
                <div class="form-floating">
                
                  <select
                    class="form-select"
                    id="floatingSelect"
                    aria-label="Floating label select example"
                    onChange={handleUserTypeChange}
                  >
                    <option value="" selected>
                      Shipment To
                    </option>
                    <option value="india">India</option>
                    <option value="abroad">Abroad</option>
                  </select>
                  <p className="validShipmentto invalid d-none">
                    Select any shipment to
                  </p>
                </div>
              </div>

              <div className="col-md-6 mb-2 col-tablet-6">
                <div class="form-floating ">
                  <input
                    type="date"
                    class="form-control"
                    id="email"
                    placeholder="Enter your due Date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    min={today}
                  />
                  <label for="email">Due Date</label>
                  <p className="validduedate invalid d-none">
                    Select duedate
                  </p>
                </div>
              </div>

              <div className="col-md-6 mb-1 col-tablet-6">
                <div class="form-floating ">
                  <input
                    type="email"
                    className={"form-control"}
                    id="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                    onKeyUp={onemailKeyUp}
                  />
                  <label for="email">Email Id</label>
                  <p className="valid1 invalid">{ emailErrorMessage }</p>
                </div>
              </div>

              <div className="col-md-6 mb-2  col-tablet-6">
                <div class="form-floating ">
                  <select
                    class="form-select"
                    id="floatingSelect"
                    aria-label="Floating label select example"
                    onChange={handleothersdropdown}
                    value={selectedfunction.Name}
                  >
                    <option selected value="">
                     
                      Select a Function
                    </option>

                    {Function.map((item, index) => (
                      <option key={item.Id} value={item.Name}>
                        {item.Name}
                      </option>
                    ))}
                  </select>
                  <p className="validfunction invalid d-none">
                    Function is required
                  </p>
                  {selectedfunction.Name === "OTHERS" && (
                    <div>
                      <div className="col-md-12 mt-4  col-tablet-6">
                      <div class="form-floating ">
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setOtherValue(e.target.value)}
                        value={othervalue}
                        placeholder="Enter your event here"
                      />
                      </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              

              <div className="col-md-6 mb-2  col-tablet-6">
                <div class="form-floating ">
                  {/* <Select
    data={myData}
    selectMultiple={true}
    touchUi={false}
/> */}

                  <select
                    class="form-select"
                    id="floatingSelect"
                    aria-label="Floating label select example"
                    onChange={handlematerialdropdown}
                    value={selectedmaterial.Name}
                  >
                    <option> Select Item</option>
                    {material.map((item, index) => (
                      <option value={item.Id}>{item.Name}</option>
                    ))}
                  </select>
                  <p className="validmaterial invalid d-none">
                    Material is required
                  </p>
                </div>
              </div>

              <div className="col-md-6 mb-2 col-tablet-6">
                <div class="form-floating ">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter email"
                    name="occupation"
                    onChange={handleoccupchange}
                    value={occupation}
                  />
                  <label for="email">Occupation</label>
                  <p className="validoccupation invalid d-none">
                    occupation is required
                  </p>
                </div>
              </div>

              <div className="col-md-6 mb-2  col-tablet-6">
                <div class="form-floating">
                  {/* <label htmlFor="">Shipment To</label> */}
                  <select
                    class="form-select"
                    id="floatingSelect"
                    aria-label="Floating label select example" 
                    onChange={(e)=>setSelectedReference(e.target.value)}
                    value={selectedreference}
                  >
                    <option value="" selected>
                      Reference
                    </option>
                   {reference.map((item,index)=>(
                    <option value={item.Id} key={index}>{item.Name}</option>
                   ))}
                  </select>
                </div>
              </div>

              <div className="col-md-6 mb-2  col-tablet-6">
                <div class="form-floating">
                  {/* <label htmlFor="">Shipment To</label> */}
                  <select
                    class="form-select"
                    id="floatingSelect"
                    aria-label="Floating label select example"
                    onChange={(e)=>setSelectedDeliveryOption(e.target.value)}
                    value={selecteddeliveryoption}
                  >
                    <option value="" selected>
                    Delivery  Option
                    </option>
                   {deliveryoption.map((item,index)=>(
                    <option value={item.Id} key={index}>{item.Name}</option>
                   ))}
                  </select>
                </div>
              </div>
              {/* <div className="col-md-6 mb-2 col-tablet-6">
                <div class="form-floating ">
                  <select
                    class="form-select"
                    id="floatingSelect"
                    aria-label="Floating label select example"
                    onChange={handlecourierchange}
                  >
                    <option value="">Select Shipping Method</option>
                    <option value="courier">Courier</option>
                    <option value="direct">Direct</option>
                  </select>
                </div>
                <p className="validcourier invalid d-none">
                  shipping method is required
                </p>
              </div> */}

              <div className="col-md-6 mb-4  col-tablet-6 ">
                <div class="form-floating ">
                  <input
                    type="time"
                    class="form-control"
                  
                    placeholder="Enter email"
                    name="contact time"
                    value={contacttime}
                    onChange={(e) => setContacttime(e.target.value)}
                  />
                  <label for="email">Contact Time</label>
                  <p className="validcontact invalid d-none">
                    contact time is required
                  </p>
                </div>
              </div>

              {/* <div className="col-md-6  col-tablet-6">
                <div className="form-floating form-control "   >
                  <p >please select </p>
                <div class="form-check form-check-inline" >

  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" onChange={(e)=>setRadio(e.target.value)}  checked={radio=='option1'} />
  <label  class="form-check-label" for="exampleRadios1">
    radio 1
  </label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" onChange={(e)=>setRadio(e.target.value)} checked={radio=='option2'}/>
  <label class="form-check-label" for="exampleRadios2">
   radio 2
  </label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" onChange={(e)=>setRadio(e.target.value)}  checked={radio=='option3'}/>
  <label  class="form-check-label" for="exampleRadios3">
    radio 3
  </label>

  
</div>
     </div>

              </div> */}
            </div>
            <div className="mb-2" style={{color:'#fff',zIndex:'1'}}>
              <h5 align="left">Terms and Conditions</h5>
            
              <li>
                {" "}
                Online orders will be accepted within a time gap of 20-30 days
              </li>
              <li>
                Any changes in the order processing time depend on the item,
                quantity, and design.
              </li>
              <li>
                The cost of customization cannot be provided without finalizing
                the fabric and design
              </li>
              <li>The amount shared is only an approximate amount.</li>
              <li>
                We do not guarantee a 100% replica of the reference picture
                shared
              </li>
              <li>
                In case we don’t have the exact fabric shown in the reference
                picture, we will use a similar fabric.
              </li>
              <li>
                If you have any budget limitations for customization, please
                share them with the designer
              </li>
              <li>
                Based on customer preference, budget, occasion, and available
                fabric in our store, we can proceed
              </li>
              <li>
                Please note that there may be slight variations in color,
                texture, and measurements in the item you receive, due to
                clarity varies from mobile to mobile
              </li>
              <li>
                {" "}
                We strive to achieve the best possible fittings, color accuracy,
                workmanship, and texture from our end.
              </li>
              <br />

              <div class="tickbox"  style={{float:'left'}}>
                <input
                  id="checkbox"
                  style={{marginTop:'-25px'}}
                  type="checkbox"
                  checked={ischecked}
                  onChange={handlebuttonchange}
                />
                <label for="checkbox" className="p-2">
                  I agree to these Terms and Conditions.
                </label>
               
              
              </div>
              <div>
              <Button type="submit" style={{display:'block'}}  className="mb-4" id="SaveButton" onClick={handlesubmit}>
                Save
              </Button>
              </div>
            
              {/* {ischecked && ( */}

            {/* )} */}
            </div>
           
          </form>
        </div>
        <div class="alert resultshow alert-success  d-none" role="alert">{ resultshow }</div>
      </div>
    </div>
  );
}

export default App;
