import React from 'react';
import { MenuItem, Icon, Menu, Sidebar } from 'semantic-ui-react';
import { useNavigate, NavLink } from 'react-router-dom';

const ExampleMenu = ({ setIsAuthenticated }) => {

    const navigate = useNavigate();

    const Logout = () => {
        setIsAuthenticated(false);
        navigate("/Loginservice"); // Yol düzeltilmiş
    }

    console.log("setIsAuthenticated:", setIsAuthenticated);

    return (
        <Sidebar
            color='violet'
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            vertical
            visible
            width='thin'
        >
            <div>
                <MenuItem as={NavLink} to="/Anasayfa">
                    <Icon name='home' />
                    Anasayfa
                </MenuItem>
                <MenuItem as={NavLink} to="/Ekle">
                    <Icon name='add' />
                    Ekle
                </MenuItem>
            </div>
            <MenuItem className='sabitle' onClick={Logout}>
                <Icon name='sign-out' />
                Çıkış
            </MenuItem>
        </Sidebar>
    );
};

export default ExampleMenu;
