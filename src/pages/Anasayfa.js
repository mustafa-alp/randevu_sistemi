import React, { useState, useEffect } from 'react';
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Table,
  Button,
  Input,
  TableFooter,
  Pagination,
  Icon,
  Modal,
  Header as ModalHeader,
  Segment
} from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import Productservice from '../Service/Productservice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css'; // Custom CSS file for additional styles

export default function Anasayfa() {
  const [api, setApi] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [open, setOpen] = useState(false);
  const [selectedHastaID, setSelectedHastaID] = useState(null);
  const navigate = useNavigate();
  const itemsPerPage = 5; // Her sayfada gösterilecek öğe sayısı

  useEffect(() => {
    let productService = new Productservice();
    productService.getProduct().then(result => setApi(result.data)).catch(console.log("hatalı api"));
  }, []);

  const handlePaginationChange = (e, { activePage }) => setActivePage(activePage);

  const handleDelete = () => {
    let productService = new Productservice();
    productService.deleteProduct(selectedHastaID).then(() => {
      setApi(api.filter(item => item.RaporId !== selectedHastaID));
      toast.success('Hasta başarıyla silindi');
      setOpen(false); 
    }).catch(err => {
      toast.error('Hasta silinirken hata oluştu!',err);
    });
  };

  const handleOpenModal = (RaporId) => {
    setSelectedHastaID(RaporId);
    setOpen(true);
  };

  const handleUpdate = (RaporId) => {
    navigate(`/guncelle/${RaporId}`);
  };

  const handleDetail = (RaporId) => {
    navigate(`/detay/${RaporId}`);
  };

  

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    console.log('Arama düğmesine tıklandı, sorgu:', searchQuery);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    let sortableData = [...api];
    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [api, sortConfig]);

  const filteredData = sortedData.filter(item =>
    item.HastaAd.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.HastaSoyad.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (activePage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    if (sortConfig.direction === 'ascending') {
      return <Icon name='angle up' />;
    } else {
      return <Icon name='angle down' />;
    }
  };

  return (
    <div className='App'>
      <Input
        fluid
        icon={{ name: 'search', circular: true, link: true, onClick: handleSearchClick }}
        placeholder='İsim veya soyisim ile ara'
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px' }}
      />
      <Table color='violet' >
        <TableHeader colSpan="5">
          <TableRow>
            <TableHeaderCell className='sortable' onClick={() => handleSort('RaporId')} textAlign='center'>
              ID {renderSortIcon('RaporId')}
            </TableHeaderCell>
            <TableHeaderCell className='sortable' onClick={() => handleSort('HastaAd')} textAlign='center'>
              İsim {renderSortIcon('HastaAd')}
            </TableHeaderCell>
            <TableHeaderCell className='sortable' onClick={() => handleSort('HastaSoyad')} textAlign='center'>
              Soyisim {renderSortIcon('HastaSoyad')}
            </TableHeaderCell>
            <TableHeaderCell className='sortable' onClick={() => handleSort('HastaTC')} textAlign='center'>
              TC {renderSortIcon('HastaTC')}
            </TableHeaderCell>
            <TableHeaderCell className='sortable Scroll' onClick={() => handleSort('TaniBasligi')} textAlign='center'>
              Tanı {renderSortIcon('TaniBasligi')}
            </TableHeaderCell>


            <TableHeaderCell textAlign='center'>İşlemler</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody colSpan="5">
          {paginatedData.map((item, index) => (
            <TableRow key={index}>
              <TableCell textAlign='center'>{item.RaporId}</TableCell>
              <TableCell textAlign='center'>{item.HastaAd}</TableCell>
              <TableCell textAlign='center'>{item.HastaSoyad}</TableCell>
              <TableCell textAlign='center'>{item.HastaTC}</TableCell>
              <TableCell textAlign='center'>{item.TaniBasligi}</TableCell>
              <TableCell >
                <Button  aria-label="Güncelle" onClick={() => handleUpdate(item.RaporId)} size='tiny' color='violet'>Güncelle</Button>
                <Button  aria-label="Detay" onClick={() => handleDetail(item.RaporId)} color='blue' size='tiny'>Detay</Button>
                <Button  aria-label="Sil" onClick={() => handleOpenModal(item.RaporId)} size='tiny' color='red'>Sil</Button>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableHeaderCell colSpan="6" >
              <Pagination
                activePage={activePage}
                onPageChange={handlePaginationChange}
                totalPages={totalPages}
                className="centered-pagination"
              />
            </TableHeaderCell>
          </TableRow>
        </TableFooter>
      </Table>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Modal
        basic
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size='small'
      >
        <ModalHeader icon>
          <Icon name='archive' />
          Hasta Silme Onayı
        </ModalHeader>
        <Segment basic>
          <p>
            Bu hastayı silmek istediğinize emin misiniz?
          </p>
        </Segment>
        <Modal.Actions>
          <Button basic color='red' inverted onClick={() => setOpen(false)}>
            <Icon name='remove' /> Hayır
          </Button>
          <Button color='green' inverted onClick={handleDelete}>
            <Icon name='checkmark' /> Evet
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
