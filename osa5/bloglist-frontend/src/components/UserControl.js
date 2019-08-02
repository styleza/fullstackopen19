import React, { useState } from 'react'


const UserControl = ({user, logoutAction}) => {

    return(
        <div>
            {user.name} logged in
            <button onClick={logoutAction}>logout</button>
        </div>
    )
}

export default UserControl