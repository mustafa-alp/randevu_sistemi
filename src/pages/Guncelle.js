import React, { useState, useEffect } from 'react';
import {
    FormGroup,
    FormField,
    FormTextArea,
    Button,
    Form,
    Input,
} from 'semantic-ui-react';
import { useParams, useNavigate } from 'react-router-dom';
import Productservice from '../Service/Productservice';
import '../App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Guncelle() {
    const { RaporId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        RaporId: '',
        HastaAd: '',
        HastaSoyad: '',
        HastaTC: '',
        TaniBasligi: '',
        TaniDetaylari: '',
        Tarih: '',

    });

    useEffect(() => {
        let productService = new Productservice();
        productService.getProductById(RaporId).then(result => {
            setFormData(result.data);
        }).catch(err => {
            toast.error('Hasta güncellenirken hata oluştu!');
        });
    }, [RaporId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === 'Tarih' ? value : value
        }));
    };
    const handleUpdate = () => {
        let productService = new Productservice();
        productService.updateProduct(RaporId, formData).then(() => {
            toast.success('Hasta başarıyla güncellendi!');
            setTimeout(() => {
                navigate('/Anasayfa');
            }, 1000);
        }).catch(err => {
            toast.error('Hasta güncellenirken hata oluştu!');
        });
    };

    return (
        <div className='App'>
            <Form>
                <FormGroup widths='equal'>

                    <FormField
                        control={Input}
                        label='İsim'
                        placeholder='İsim'
                        name='HastaAd'
                        value={formData.HastaAd}
                        onChange={handleChange}
                    />
                    <FormField
                        control={Input}
                        label='Soyisim'
                        placeholder='Soyisim'
                        name='HastaSoyad'
                        value={formData.HastaSoyad}
                        onChange={handleChange}
                    />
                    <FormField
                        control={Input}
                        label='TC'
                        placeholder='TC'
                        type='number'
                        name='HastaTC'
                        value={formData.HastaTC}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup widths='equal'>
                    <FormField
                        control={Input}
                        label='Tanı'
                        placeholder='Tanı'
                        name='TaniBasligi'
                        value={formData.TaniBasligi}
                        onChange={handleChange}
                    />
                    <FormTextArea
                        control={Input}
                        label='Tanı'
                        placeholder='Tanı'
                        name='TaniDetayları'
                        value={formData.TaniDetaylari}
                        onChange={handleChange}
                    />
                    <FormField
                        control={Input}
                        label='Tarih'
                        placeholder='Tarih'
                        type='date'
                        name='Tarih'
                        value={formData.Tarih ? formData.Tarih.split('T')[0] : ''} // Tarih formatını düzelt
                        onChange={handleChange}
                    />

                </FormGroup>
                <FormField onClick={handleUpdate} className='Button-container' control={Button} inverted color='blue'>Güncelle</FormField>
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
            </Form>
        </div>
    );
}
