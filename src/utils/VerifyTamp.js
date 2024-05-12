import React from 'react'

export function VerifyTamp(name , url) {
    return (
        `<div>

            <p>Hello ${ name } </p> 
            <p> Is it you we're looking for? </p>
            <p> Please confirm your email address by clicking the button below: </p>
            <div >
                 <a
                    href="${url}"
                
                >
                    <span >Confirm email address &rarr;</span>
                
                </a>
            </div>
        </div>`
    )
}


