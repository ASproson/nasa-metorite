import { useState, useEffect } from 'react';

export default function Data (){

    return (
        <div>
            {displayData.map((metorite) => {
                return (
                    <p>{metorite.name}</p>
                    )
            })}
        </div>
    )
}