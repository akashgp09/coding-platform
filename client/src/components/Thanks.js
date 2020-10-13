import React from "react";
import { useParams, useHistory } from "react-router-dom";

const Thanks = () => {

    const history = useHistory();
    const { name } = useParams();

 


    return(
        <React.Fragment>
           <div className="thanks">
             <p>Thanks <strong>{name}!!</strong></p>
             <p>You joined <strong>{history.location.state}</strong></p>
           
            <hr/>
            <p><strong>You made a great decision!</strong><br />You will be getting notifications about all the latest webinars and worshops and hackathon events done by DSC!!!!</p>
           
           </div>
        </React.Fragment>
    )

}


export default Thanks;