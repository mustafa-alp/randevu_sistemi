// Footer.js
import React from 'react';
import { Container, Grid, List, Segment, Header, Icon } from 'semantic-ui-react';

const Footer = () => (
    <Segment inverted style={{ backgroundColor: '#f5f5f5'}}>
        <Container>
            <Grid divided stackable>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <Header as='h4' content='Hakkımızda' />
                        <List link >
                            <List.Item as='a'>Ekip</List.Item>
                            <List.Item as='a'>Hikayemiz</List.Item>
                            <List.Item as='a'>İletişim</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Header as='h4' content='Hizmetler' />
                        <List link >
                            <List.Item as='a'>Danışmanlık</List.Item>
                            <List.Item as='a'>Eğitim</List.Item>
                            <List.Item as='a'>Destek</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={7}>
                        <Header as='h4' >
                            Bize Ulaşın
                        </Header>
                        <Segment inverted style={{ backgroundColor: '#f5f5f5' }}>
                            <Container textAlign='center'>
                                <Grid columns={6} >
                                    <Grid.Column>
                                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                            <Icon name='facebook' size='big' />
                                        </a>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                            <Icon name='instagram' size='big'color='pink' />
                                        </a>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                            <Icon name='twitter' size='big' color='blue' />
                                        </a>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                                            <Icon name='github' size='big' color='black'/>
                                        </a>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                            <Icon name='linkedin' size='big' color='blue' />
                                        </a>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                                            <Icon  color='red' name='youtube' size='big' />
                                        </a>
                                    </Grid.Column>
                                </Grid>
                                <p style={{ color: 'black', marginTop: '1em' }}>© 2024 Hasta Rapor Kayıt Sistemi. Bütün Hakları Saklıdır.</p>
                            </Container>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    </Segment>
);

export default Footer;
