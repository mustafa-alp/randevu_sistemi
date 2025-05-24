import React, { useState } from 'react';
import './App.css';
import Menubar from './pages/Menubar';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Ekle from './pages/Ekle';
import { Container, Header, Grid } from 'semantic-ui-react';
import Anasayfa from './pages/Anasayfa';
import Guncelle from './pages/Guncelle';
import Footer from './pages/Footer';
import Detail from './pages/Detail';
import Loginservice from './login/Loginservice';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App">
      <Router>
        {isAuthenticated ? (
          <Routes>
            <Route path="/*" element={<Loginservice setIsAuthenticated={setIsAuthenticated} />} />
          </Routes>
        ) : (
          <>
            <Grid>
              <Grid.Column width={2}>

                <Menubar setIsAuthenticated={setIsAuthenticated} />
              </Grid.Column>
              <Grid.Column width={13}>
                <Header className="Baslik" as="h1" color="violet">
                  Hasta Rapor Kayıt Sistemi
                </Header>
                <Routes>
                  <Route path="/Anasayfa" element={<Anasayfa />} />
                  <Route path="/Ekle" element={<Ekle />} />
                  <Route path="/guncelle/:RaporId" element={<Guncelle />} />
                  <Route path="/Detay/:RaporId" element={<Detail />} />
                </Routes>
              </Grid.Column>
            </Grid>
            <Container />
            <footer className="footer">
              <Footer />
            </footer>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
