
import React from 'react';
import styled from 'styled-components';

const NavbarWrapper = styled.div`
    .temp-navbar {
        position: sticky;
        background-color: #f1f1f1;
        color: black;
        width: 100%;
        height: 5vh;
        border: 2px dotted #9b9b9b;
    }
`;
    
const NavbarHeader = () => {
    return (
        <NavbarWrapper>
            <div className='temp-navbar'>yo</div>
        </NavbarWrapper>
    )
};

export default NavbarHeader;