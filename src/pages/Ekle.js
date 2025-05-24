import React, { useState } from 'react';
import {
    FormGroup,
    FormField,
    FormTextArea,
    Button,
    Form,
    Input,
    Label,
    Grid,
    GridRow,
    GridColumn,
} from 'semantic-ui-react';
import '../App.css';

import Productservice from '../Service/Productservice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Ekle() {
    const [secilendosya, setSecilendosya] = useState(null);
    const [formData, setFormData] = useState({
        HastaAd: '',
        HastaSoyad: '',
        HastaTC: '',
        TaniBasligi: '',
        TaniDetaylari: '',
        Tarih: '',
        Image: ''
    });

    const [errors, setErrors] = useState({});  // Hataları saklamak için

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors({ ...errors, [name]: '' }); // Alan değiştiğinde hata mesajını temizle
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSecilendosya(file);
        setFormData({
            ...formData,
            Image: file.name 
        });
        setErrors({ ...errors, Image: '' }); // Dosya yüklendiğinde hata mesajını temizle
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.HastaAd) newErrors.HastaAd = 'Bu alan boş bırakılamaz';
        if (!formData.HastaSoyad) newErrors.HastaSoyad = 'Bu alan boş bırakılamaz';
        if (!formData.HastaTC) newErrors.HastaTC = 'Bu alan boş bırakılamaz';
        if (!formData.TaniBasligi) newErrors.TaniBasligi = 'Bu alan boş bırakılamaz';
        if (!formData.TaniDetaylari) newErrors.TaniDetaylari = 'Bu alan boş bırakılamaz';
        if (!formData.Tarih) newErrors.Tarih = 'Bu alan boş bırakılamaz';
        if (!secilendosya) newErrors.Image = 'Bir dosya yüklemelisiniz';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Hatalar yoksa true döner
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Lütfen tüm alanları doldurun');
            return;
        }

        const productService = new Productservice();
        const formDataToSubmit = new FormData();

        for (const key in formData) {
            formDataToSubmit.append(key, formData[key]);
        }

        if (secilendosya) {
            formDataToSubmit.append('file', secilendosya);
        }

        try {
            await productService.addProduct(formDataToSubmit);
            toast.success('Hasta başarıyla eklendi');
        } catch (err) {
            console.error('Hasta eklenirken bir problem oluştu:', err);
            toast.error('Hasta eklenirken bir problem oluştu');
        }
    };

    return (
        <div className='App'>
            <Form onSubmit={handleSubmit}>
                <Grid>
                    <GridRow columns={2}>
                        <GridColumn>
                            <Label color='violet' ribbon>İsim</Label>
                        </GridColumn>
                        <GridColumn>
                            <Label color='violet' ribbon='right'>Soyisim</Label>
                        </GridColumn>
                    </GridRow>
                </Grid>

                <FormGroup widths='equal'>
                    <FormField
                        control={Input}
                        placeholder='İsim'
                        name='HastaAd'
                        value={formData.HastaAd}
                        onChange={handleChange}
                        error={errors.HastaAd ? { content: errors.HastaAd, pointing: 'below' } : null}
                    />
                    <FormField
                        control={Input}
                        placeholder='Soyisim'
                        name='HastaSoyad'
                        value={formData.HastaSoyad}
                        onChange={handleChange}
                        error={errors.HastaSoyad ? { content: errors.HastaSoyad, pointing: 'below' } : null}
                    />
                </FormGroup>
                <Grid>
                    <GridRow columns={2}>
                        <GridColumn>
                            <Label color='violet' ribbon>TC</Label>
                        </GridColumn>
                        <GridColumn>
                            <Label color='violet' ribbon='right'>Hasta Tanısı</Label>
                        </GridColumn>
                    </GridRow>
                </Grid>
                <FormGroup widths='equal'>
                    <FormField
                        control={Input}
                        placeholder='TC'
                        type='number'
                        name='HastaTC'
                        value={formData.HastaTC}
                        onChange={handleChange}
                        error={errors.HastaTC ? { content: errors.HastaTC, pointing: 'below' } : null}
                    />
                    <FormField
                        control={Input}
                        placeholder='Hasta Tanısı'
                        name='TaniBasligi'
                        value={formData.TaniBasligi}
                        onChange={handleChange}
                        error={errors.TaniBasligi ? { content: errors.TaniBasligi, pointing: 'below' } : null}
                    />
                </FormGroup>
                <Grid>
                    <GridRow columns={1}>
                        <GridColumn>
                            <Label color='violet' ribbon>Tanı Detayları</Label>
                        </GridColumn>
                    </GridRow>
                </Grid>
                <FormGroup widths='equal'>
                    <FormField
                        control={FormTextArea}
                        placeholder='Tanı Detayları'
                        name='TaniDetaylari'
                        value={formData.TaniDetaylari}
                        onChange={handleChange}
                        error={errors.TaniDetaylari ? { content: errors.TaniDetaylari, pointing: 'below' } : null}
                    />
                </FormGroup>
                <Grid>
                    <GridRow columns={2}>
                        <GridColumn>
                            <Label color='violet' ribbon>Tarih</Label>
                        </GridColumn>
                        <GridColumn>
                            <Label color='violet' ribbon='right'>Resim Yükle</Label>
                        </GridColumn>
                    </GridRow>
                </Grid>

                <FormGroup widths='equal'>
                    <FormField
                        control={Input}
                        placeholder='Tarih'
                        type='date'
                        name='Tarih'
                        value={formData.Tarih}
                        onChange={handleChange}
                        error={errors.Tarih ? { content: errors.Tarih, pointing: 'below' } : null}
                    />

                    <FormField
                        control={Input}
                        type='file'
                        name='file'
                        onChange={handleFileChange}
                        error={errors.Image ? { content: errors.Image, pointing: 'below' } : null}
                    />
                </FormGroup>

                <FormField
                    className='Button-container'
                    control={Button}
                    type='submit'
                    inverted
                    color='green'
                >
                    Ekle
                </FormField>
            </Form>

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
        </div >
    );
}
