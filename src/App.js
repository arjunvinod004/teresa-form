import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";
import $ from "jquery";
function App() {
  let [shipmentto, setShipmentto] = useState("");
  let [customertype, setCustomertype] = useState("");
  const [date, setDate] = useState(""); // used for update calculated date
  const [name, setName] = useState("");
  const [message, setmessage] = useState("");
  const [resultshow, setResultshow] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [phone1, setPhone1] = useState("");
  const [email, setEmail] = useState("");
  const [occupation, setOccupation] = useState(""); // occupation
  const [functiontype, setFunctionType] = useState("");
  const [dob, setDob] = useState("");
  const [materialType, setMaterialType] = useState("");
  let [courierType, setcourierType] = useState("");
  const [contacttime, setContacttime] = useState("");

  const [ischecked, setIsChecked] = useState(false);


  const [minDate, setMinDate] = useState(""); // used for calculate date
  const [others, setOthers] = useState(""); // function others in a dropdown
  const [othervalue, setOtherValue] = useState("");
  const [kyc, setKyc] = useState([]); // kyc state

  const [isCourier, setIsCourier] = useState(false); // courier
  const [isDirect, setIsDirect] = useState(false); // direct
  

  const [Function, setFunction] = useState([]); // function
 

  const [save, setSave] = useState([]);
  const [material, setMaterial] = useState([]); // material
  const [selectedmaterial, setSelectedMaterial] = useState(""); // material values from dropdown
  const [selectedfunction, setSelectedFunction] = useState({
    Id: "",
    Name: "",
  }); // function values dropdown

  const [customEvent, setCustomEvent] = useState("");


  const handlechange = (e) => {
    const handleinput = e.target.value;
    setEmail(handleinput);
    if (handleinput) {
      setmessage("");
    }
  };

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

  const checkvalidation = (e) => {
    e.preventDefault();
    const rgExp = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]{2,}$/;
    if (rgExp.test(email)) {
      setmessage("");
    } else if (email === "") {
      setmessage("please  Enter a Email ");
    } else if (!rgExp.test(email)) {
      setmessage("Email is not valid");
    } else {
      setmessage("");
    }
  };

  // contact time

  const handlecontacttime = (e) => {
    setContacttime(e.target.value);
  };

  // parameter
  const PrmCmpId = 1;
  const PrmBrId = 2;
  const PrmName = name;
  const PrmKycNo = kyc.Data;
  const PrmAddress = address;
  let PrmIsIndian = customertype;
  let PrmIsAbroad = shipmentto;
  const PrmDueDate = date;
  const PrmMobileNo = phone;
  const PrmEmail = email;
  const PrmOccupation = occupation;
  const PrmFunctionId = selectedfunction.Id;
  const PrmOtherFunction = othervalue;
  const PrmDressTypeId = selectedmaterial.Id;
  const PrmDob = dob;
  const PrmContactTime = contacttime;
  let PrmIsCourier = courierType;



  const [selectedDate, setSelectedDate] = useState("");
  const [today, setToday] = useState("");

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

  console.log(selectedDate);



  const handleUserTypeChange = (e) => {
    setSelectedDate('');
    const shipment = e.target.value;
    setShipmentto(shipment);
  };
  
  const handleindianChange = (e) => {
    const custtype = e.target.value;
    setCustomertype(custtype);
  };

  // courier or direct

  const handlecourierchange = (e) => {
    const value = e.target.value;
    setcourierType(value);
  };


  

  //button enable condition
  const handlebuttonchange = (e) => {
    setIsChecked(e.target.checked);
  };

  // kyc api call

  useEffect(() => {
    axios
      .get(`http://192.168.0.10/backend/Kyc`, {
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
      .get("http://192.168.0.10/backend/function")
      .then((responsee) => {
        setFunction(responsee.data);
        //console.log(responsee.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // material api call

  useEffect(() => {
    axios
      .get("http://192.168.0.10/backend/material", {
        params: { PrmCmpId: PrmCmpId, PrmBrId: PrmBrId },
      })
      .then((response) => {
        setMaterial(response.data);
        //console.log(response.data);
      });
  }, []);



  // console.log(shipmentto);

  const handlesubmit = () => {
    try {
      if (!name) {
        $(".validName").removeClass("d-none");
      } else {
        $(".validName").addClass("d-none");
        setName(name);
      }

      if (!phone) {
        $(".validMob").removeClass("d-none");
      } else {
        $(".validMob").addClass("d-none");
        setPhone(phone);
      }

      if(!selectedDate){
        $(".validduedate").removeClass('d-none');

      }else{
        $(".validduedate").addClass('d-none')
      }

      if (!phone1) {
        $(".validMob1").removeClass("d-none");
      } else {
        $(".validMob1").addClass("d-none");
        setPhone1(phone1);
      }

      if (!shipmentto) {
        $(".validShipmentto").removeClass("d-none");
      } else {
        $(".validShipmentto").addClass("d-none");
        if (shipmentto == "abroad") {
          setShipmentto('abroad');
        } else {
          setShipmentto('india');
          //setShipmentto(shipmentto);
        }
      }

      if (!customertype) {
        $(".validCustomertype").removeClass("d-none");
      } else {
        $(".validCustomertype").addClass("d-none");
        if (customertype == "india") {
          setCustomertype('india');
        } else {
          setCustomertype('nri');
          //setCustomertype(customertype);
        }
      }

      if (!address) {
        $(".validaddress").removeClass("d-none");
      } else {
        $(".validaddress").addClass("d-none");
        setAddress(address);
      }

      // if (!occupation) {
      //   $(".validoccupation").removeClass("d-none");
      // } else {
      //   $(".validoccupation").addClass("d-none");
      //   setOccupation(occupation);
      // }

      // if (!functiontype) {
      //   $(".validfunction").removeClass("d-none");
      // } else {
      //   $(".validfunction").addClass("d-none");
      //   setFunctionType(functiontype);
      // }

      if (!materialType) {
        $(".validmaterial").removeClass("d-none");
      } else {
        $(".validmaterial").addClass("d-none");
        setMaterialType(materialType);
      }
     
      if (!courierType) {
        $(".validcourier").removeClass("d-none");
      } else {
        $(".validcourier").addClass("d-none");
        if (courierType == "courier") {
          setcourierType('courier');
        } else {
          setcourierType('direct');
          // setcourierType(courierType)
        }
      }

      if (!contacttime) {
        $(".validcontact").removeClass("d-none");
      } else {
        $(".validcontact").addClass("d-none");
        setContacttime(contacttime);
      }


      if (
        name &&
        phone &&
        shipmentto &&
        customertype &&
        address &&
        occupation &&
        functiontype &&
        materialType &&
        dob &&
        courierType &&
        contacttime
      ) {

       
       console.log(shipmentto);console.log(customertype);console.log(courierType);
          if(shipmentto == 'abroad'){
            PrmIsAbroad = true;
          }
          if(shipmentto == 'india'){
            PrmIsAbroad = false;
          }
          if(customertype == 'nri'){
            PrmIsIndian = true;
          }
          if(customertype == 'india'){
            PrmIsIndian = false;
          }
          if(courierType == 'courier'){
            PrmIsCourier = true;
          }
          if(courierType == 'direct'){
            PrmIsCourier = false;
          }
          console.log(PrmIsAbroad);console.log(PrmIsIndian);console.log(PrmIsCourier);
            
            axios.get(`http://192.168.0.10/backend/save`,{ params:{PrmCmpId:PrmCmpId,PrmBrId:PrmBrId,PrmName:PrmName,PrmKycNo:PrmKycNo,PrmAddress:PrmAddress,PrmIsIndian:PrmIsIndian,PrmIsAbroad:PrmIsAbroad,PrmDueDate:PrmDueDate,PrmMobileNo:PrmMobileNo,PrmEmail:PrmEmail,PrmOccupation:PrmOccupation,PrmFunctionId:PrmFunctionId,PrmOtherFunction:PrmOtherFunction,PrmDressTypeId:PrmDressTypeId,PrmDob:PrmDob,PrmContactTime:PrmContactTime,PrmIsCourier:PrmIsCourier}})
            .then((response)=>{
              setSave(response.data)
              console.log(response.data);
              $(".resultshow").removeClass("d-none");
              setResultshow(response.data.Message);
            })
            
          
      }
    } catch (err) {
      console.log(err);
    }
  };
  // occupation
  const handleoccupchange = (e) => {
    setOccupation(e.target.value);
    // console.log("occupation", e.target.value);
  };
  // others value

  //material dropdown

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
          <form class="login-form" onSubmit={checkvalidation}>
            <div className="p-1">
              <img style={{ width: "110px" }} src={require("./teresa.png")} />
            </div>
            <div className="row">
              <h6 className="mb-4"><b>KYC NO : </b>{ kyc.Data }</h6>
              <div className="col-md-6 mb-4  col-tablet-6">
                <div class="form-floating">
                  {/* <label htmlFor="">Shipment To</label> */}
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

              <div className="col-md-6 mb-4  col-tablet-6">
                <div class="form-floating">
                  <select
                    class="form-select"
                    id="floatingSelect"
                    aria-label="Floating label select example"
                    onChange={handleindianChange}
                  >
                    <option value="" selected>
                      Customer Type
                    </option>
                    <option value="india">Indian</option>
                    <option value="nri">NRI</option>
                  </select>
                  <p className="validCustomertype invalid d-none">
                    Select any customer type
                  </p>
                </div>
              </div>
              <div className="col-md-6 mb-4 col-tablet-6">
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

              <div className="col-md-6 mb-2  col-tablet-6">
                <div class="form-floating ">
                  <input
                    type="text"
                    class="form-control"
                    id="email"
                    placeholder="Enter email"
                    name="email"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label for="email">Name</label>
                  <p className="validName invalid d-none">Name is required</p>
                </div>
              </div>
              <div className="col-md-12 mb-4  col-tablet-6">
                <div class="form-floating ">
                  <input
                    type="text"
                    class="form-control"
                    id="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                  />
                  <label for="email">Address</label>
                  <p className="validaddress invalid d-none">
                    address is required
                  </p>
                </div>
              </div>
              <div className="col-md-6 mb-4 col-tablet-6">
                <div class="form-floating ">
                  <input
                    type="number"
                    class="form-control"
                    id="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                  />
                  <label for="email">Mob No 1</label>
                  <p className="validMob invalid d-none">
                    Mobile number is required
                  </p>
                </div>
              </div>
              <div className="col-md-6 mb-4  col-tablet-6">
                <div class="form-floating ">
                  <input
                    type="number"
                    class="form-control"
                    id="email"
                    placeholder="Enter email"
                    name="email"
                  />
                  <label for="email">Mob No 2</label>
                </div>
              </div>
              <div className="col-md-6  col-tablet-6">
                <div class="form-floating ">
                  <input
                    type="email"
                    className={"form-control"}
                    id="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={handlechange}
                    value={email}
                  />
                  <label for="email">Email Id</label>
                  <p
                    className={
                      message === "Email is valid" ? "valid" : "invalid"
                    }
                  >
                    {message}
                  </p>
                </div>
              </div>

              <div className="col-md-6 mb-4 col-tablet-6">
                <div class="form-floating ">
                  <input
                    type="text"
                    class="form-control"
                    id="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleoccupchange}
                    value={occupation}
                  />
                  <label for="email">Occupation</label>
                  <p className="validoccupation invalid d-none">
                    occupation is required
                  </p>
                </div>
              </div>
              <div className="col-md-6 mb-4  col-tablet-6">
                <div class="form-floating ">
                  <select
                    class="form-select"
                    id="floatingSelect"
                    aria-label="Floating label select example"
                    onChange={handleothersdropdown}
                    value={selectedfunction.Name}
                  >
                    <option selected value="">
                      {" "}
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
              <div className="col-md-6 mb-4  col-tablet-6">
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
              <div className="col-md-6 mb-4  col-tablet-6">
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
                    <option> select a Material</option>
                    {material.map((item, index) => (
                      <option value={item.Id}>{item.Name}</option>
                    ))}
                  </select>
                  <p className="validmaterial invalid d-none">
                    Material is required
                  </p>
                </div>
              </div>
              <div className="col-md-6 mb-4 col-tablet-6">
                <div class="form-floating ">
                  <select
                    class="form-select"
                    id="floatingSelect"
                    aria-label="Floating label select example"
                    onChange={handlecourierchange}
                  >
                    <option value="">select a shipping method</option>
                    <option value="courier">Courier</option>
                    <option value="direct">Direct</option>
                  </select>
                </div>
                <p className="validcourier invalid d-none">
                  shipping method is required
                </p>
              </div>
              {/* <div className='col-md-4  col-tablet-6'>
              <div class="form-floating ">
                <input type="time" class="form-control" id="email" placeholder="Enter email" name="email" />
                <label for="email">TIME</label>
              </div>

            </div> */}
              <div className="col-md-6 mb-4  col-tablet-6 ">
                <div class="form-floating ">
                  <input
                    type="time"
                    class="form-control"
                    id="email"
                    placeholder="Enter email"
                    name="email"
                    value={contacttime}
                    onChange={(e) => setContacttime(e.target.value)}
                  />
                  <label for="email">Contact Time</label>
                  <p className="validcontact invalid d-none">
                    contact time is required
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-2">
              <h5 align="left">Terms and Conditions</h5>
              <br />
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

              <div class="tickbox">
                <input
                  id="checkbox"
                  type="checkbox"
                  checked={ischecked}
                  onChange={handlebuttonchange}
                />
                <label for="checkbox" className="p-2">
                  I agree to these Terms and Conditions.
                </label>
              </div>
            </div>
            {ischecked && (
              <button type="submit" className="mb-4" onClick={handlesubmit}>
                save
              </button>
            )}
          </form>
        </div>
        <div class="alert resultshow alert-success  d-none" role="alert">{ resultshow }</div>
      </div>
    </div>
  );
}

export default App;
