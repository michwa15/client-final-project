import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../../../api/admin';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getShoes } from '../../../api/products';
import { ProductSetting } from './product-setting/ProductSetting';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/joy/Button';
import Modal from '@mui/material/Modal';
import { deleteShoe } from '../../../api/admin';
import './AdminPage.css';
import { UserSetting } from './user-setting/UserSetting';

export const AdminPage = () => {
  const navigate = useNavigate();
  const [shoes, setShoes] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [usersBySearch, setUsersBySearch] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shoeToDelete, setShoeToDelete] = useState();
  const [searchValue, setSearchValue] = useState('');

  const onDelete = (shoe) => {
    setIsModalOpen(true);
    setShoeToDelete(shoe);
  }

  useEffect(() => {
    getProducts();
    getAllUsers();
  }, []);

  const getProducts = async () => {
    try {
      const response = await getShoes();
      const { shoes } = response.data;
      setShoes(shoes);
    } catch (err) {
      console.log('Error with getting items');
    }
  };

  const getAllUsers = async () => {
    try {
      const { data } = await getUsers();
      setAllUsers(data);
      setUsersBySearch(data);
    } catch (err) {
      console.log('can not get users');
    }
  }

  const handleDeleteItem = async () => {
    try {
      await deleteShoe(shoeToDelete);
      setIsModalOpen(false);
      getProducts();
    } catch (err) {
      console.log('Error with delete item');
    }
  }

  const handleSearch = async (newValue) => {
    const currUsers = allUsers.filter(user => user.fullname.toLowerCase().startsWith(newValue));
    setUsersBySearch(currUsers);
  }

  const handleChangeSearch = async (e) => {
    setSearchValue(e.target.value);
    handleSearch(e.target.value);
  }

  const renderSearch = () => (
    <div className='search-user-wrapper'>
      <input type="search" className="search-user-input" placeholder='Search user by name' value={searchValue} name="search" onChange={handleChangeSearch} />
      <i className="fa fa-search search-icon" onClick={handleSearch}></i>
    </div>
  )

  return (
    <div className='admin-page'>
      <h3 className='title'>Hi there! Get some insights about your store right here !</h3>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className='add-product-subheader'>
            <Typography color='#2196f3'>Products</Typography>
            <Tooltip title="Add a New Item" onClick={() => navigate('/admin/add')}>
              <IconButton>
                <AddIcon className='tooltip-icon' />
              </IconButton>
            </Tooltip>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className='products-wrapper'>
            {shoes.map(shoe => <ProductSetting key={shoe._id} shoe={shoe} onDelete={onDelete} />)}
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography color='#2196f3' padding='8px'>Users</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {renderSearch()}
          {usersBySearch.map(user => <UserSetting key={user.email} user={user} />)}
        </AccordionDetails>
      </Accordion>
      <Modal
        className='modal'
        open={isModalOpen}
      >
        <div className='modal-content-wrapper'>
          <h3 className='modal-title'>Are you sure you want to Delete this item ?</h3>
          <div className='actions-buttons'>
            <Button size="md" variant='solid' color="primary" onClick={() => { setIsModalOpen(false); setShoeToDelete(null) }}>
              Cancel
            </Button>
            <Button size="md" variant='solid' color="danger" onClick={() => handleDeleteItem()}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
