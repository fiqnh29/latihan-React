import React, { useState } from 'react';
import { Card, Button, CardTitle, CardText, Row, Col,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem

} from 'reactstrap';

const Kartu = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>
            Dropdown
            </DropdownToggle>
        <DropdownMenu>
            <DropdownItem header>Nama</DropdownItem>
            {props.contoh}
        </DropdownMenu>
        </Dropdown>
    )
};

export default Kartu;