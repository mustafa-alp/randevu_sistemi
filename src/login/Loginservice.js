import React, { useState } from 'react';
import { FormInput, Button, Form, Message, Segment, Grid, GridColumn } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

export default function Loginservice({ setIsAuthenticated }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        // Kullanıcı adı ve şifre kontrolü
        if (username === 'Mustafa' && password === '123456') {
            // Başarıyla giriş yapıldığında ana sayfaya yönlendir
            setIsAuthenticated(true);
            navigate('/Anasayfa');
        } else {
            // Hatalı girişte hata mesajı göster
            setError(true);
        }
    };

    return (
        <div className='ortala'>
            <Segment placeholder>
                <Grid relaxed='very' stackable>
                    <GridColumn>
                        <Form>
                            <FormInput
                                icon='user'
                                iconPosition='left'
                                label='Kullanıcı Adı'
                                placeholder='Kullanıcı Adı'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <FormInput
                                icon='lock'
                                iconPosition='left'
                                label='Şifre'
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <Button content='Giriş Yap' primary onClick={handleLogin} />
                            {error && (
                                <Message
                                    error
                                    header='Giriş Başarısız'
                                    content='Kullanıcı adı veya şifre yanlış.'
                                />
                            )}
                        </Form>
                    </GridColumn>
                </Grid>
            </Segment>
        </div>
    );
}
