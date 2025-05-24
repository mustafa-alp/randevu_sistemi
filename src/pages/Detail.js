import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Productservice from '../Service/Productservice';
import '../App.css';
import { GridColumn, Grid, RevealContent, Image, Reveal } from 'semantic-ui-react';

export default function Detail() {
    const { RaporId } = useParams();
    const [hasta, setHasta] = useState(null);
    
    // imageUrl hesaplamasını hasta değiştiğinde yapın
    const imageUrl = hasta ? `http://localhost:4000/image/${hasta.RaporId}` : '';

    useEffect(() => {
        let productService = new Productservice();
        productService.getProductById(RaporId).then(result => {
            setHasta(result.data);
            // console.log(hasta.Image)
        });
    }, [RaporId]);

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('tr-TR', options);
    }

    if (!hasta) {
        return <div>Yükleniyor...</div>;
    }

    return (
        <Grid>
            <GridColumn width={2}>
                <Reveal animated='move'>
                    <RevealContent visible>
                        <Image src='https://react.semantic-ui.com/images/avatar/large/chris.jpg' size='small' />
                    </RevealContent>
                    <RevealContent hidden>
                        <Image src={imageUrl} size='small' />
                    </RevealContent>
                </Reveal>
            </GridColumn>
            <GridColumn width={11}>
                <p>Hasta Numarası: {hasta.RaporId}</p>
                <p>{hasta.HastaAd} {hasta.HastaSoyad}</p>
                <p>TC: {hasta.HastaTC}</p>
            </GridColumn>
            <GridColumn width={3}>
                <p>Tarih: {formatDate(hasta.Tarih)}</p>
            </GridColumn>
            <GridColumn width={16}>
                <p>Tanı: {hasta.TaniBasligi}</p>
                <p>Tanı Detayı: {hasta.TaniDetaylari}</p>
            </GridColumn>
        </Grid>
    );
}
