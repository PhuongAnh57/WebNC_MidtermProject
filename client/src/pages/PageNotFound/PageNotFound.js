import { PageNotFound as img_PageNotFound } from "assets/images"

import { Button } from "@mui/material"
import { Link } from "react-router-dom"

export default function PageNotFound() {
    return(
        <div style={{textAlign: 'center'}}>
            <img 
                src={img_PageNotFound} 
                alt='page not found' 
                style={{
                    width: '600px',
                    height: '600px'
                }}/>
            
            <div style={{fontWeight: '900', fontSize: '1.4rem', marginBottom: '16px'}}>PAGE NOT FOUND</div>

            <Link to='/home'>
                <Button variant="contained">
                    GO HOME
                </Button>
            </Link>
        </div>
    )
}