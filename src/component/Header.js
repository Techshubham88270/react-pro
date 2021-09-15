import React, {useState} from 'react';
import axios from 'axios';
import './Header.css';
import { Modal, Button } from "react-bootstrap";


function Header() {
    const [show, setShow] = useState(false);
    const [Displaywet, setDisplaywet] = useState({});

const handleClose = () => setShow(false);

const handleShow = async(cname) => {
    try {
      const getWeatherEndPoint = process.env.REACT_APP_GET_WEATHER;
      const res = await axios.get(`${getWeatherEndPoint}${cname}`);
      await setDisplaywet(res.data);
      setShow(true);
      console.log(Displaywet);

    }
    catch {}
}    
    const [searchtext , setsearchtext] = useState();
    // const [isValue, setIsValue] = useState(false);
    const [Countries, setCountries] = useState([]); 
    const fetchData = async(country) => {
        try {
          const getCoountryEndPoint = process.env.REACT_APP_GET_COUNTRY;
          const res = await axios.get(`${getCoountryEndPoint}/${country}`);
          await setCountries(res.data);
          console.log(Countries);

        }
        catch {}
    }    

    const useSignUpForm = (e) => {
        e.preventDefault();
        fetchData(searchtext);       
      }

    const inputsearch = (e) =>{
        // if(e.target.value) {
        //     setIsValue(true);
        // } else {
        //     setIsValue(false);            
        // }
        setsearchtext(e.target.value);

    }

    return (
        <div>
           <nav className="navbar navbar-expand-lg navbar-primary bg-primary">
           <h4 className="m-2 text-light">WEATHER</h4>


                <form className="d-flex ml-5 searchcountry" onSubmit={useSignUpForm} >
                <input className="form-control me-2" type="text" placeholder="Search" name="city"  onChange={inputsearch} value={searchtext} aria-label="Search"/>
                <button id="btn_sbmit" className="btn btn-info"  type="submit">Search</button>
                </form>

            </nav>
            <div className="container">

                {Countries.map((item, index) => (
                    
                    <div className="card m-3 p-3">
                        <div className="row">
                            <div className="col-4">
                            <img width="150" height="150" src={item.flag}/>
                            </div>
                            <div className="col-8">
                                <h4>{item.name}</h4>
                                <p><b>Capital:</b>{item.capital}</p>
                                <p><b>Population:</b>{item.population}</p>
                                    <Button variant="primary" onClick={() => handleShow(item.name)} >
                                    View Weather
                                    </Button>
                                
                            </div>


                        </div>
                        
                        
                    </div>
                    
                ))}
         

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>WEATHER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <div className="card m-3 p-3">
                <div className="row">
                            <div className="col-4">
                            <img className="img-fluid" width="150" height="150" src={Displaywet?.current?.weather_icons[0] || ''} alt="no-img"/>
                            </div>
                            <div className="col-8">
                                <p><b>Temperature:</b> {Displaywet?.current?.temperature || ''}°C</p>
                                <p><b>Precip:</b>{Displaywet?.current?.precip || '0'}</p>
                                <p><b>Wind speed:</b>{Displaywet?.current?.wind_speed || '0'} KMPH</p>
                                
                            </div>


                        </div>
                                            
                
                </div>
            
            



        </Modal.Body>
       
      </Modal>
            </div>
        </div>
    )
}

export default Header
