import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const HomePage = () => {
  useEffect(() => {
    document.title = 'Luna & Granos Cafe: Inicio';
  }, []);

  return (
    <main className="home-main">
      <section className="home-hero container-page">
        <Row className="align-items-center">
          <Col xs={12} md={6} className="home-content">
            <h1 className="home-title">Luna & Granos Café</h1>
            <p className="home-description">
              Un lugar para disfrutar cafes de especialidad, tés seleccionados y
              pastelería casera. Relajate, trabajá o encontrate con amigos.
            </p>
            <div>
              <Button href="/menu" className="btn-custom">Ir a la carta</Button>
            </div>
          </Col>
          <Col xs={12} md={6} className="text-center">
            <img src="/images/hero.jpg" alt="Café y pastelería" style={{ width: '100%', maxWidth: 520, borderRadius: 12 }} />
          </Col>
        </Row>
      </section>

      <section className="container-page" style={{ paddingTop: 30 }}>
        <Row>
          <Col xs={12} md={4} className="intro-card">
            <h3>Nuestra filosofía</h3>
            <p>Calidad, comunidad y sostenibilidad. Cafe de origen directo y trato justo al productor.</p>
          </Col>
          <Col xs={12} md={4} className="intro-card">
            <h3>Especialidades</h3>
            <p>Cold brew, cappuccino de autor, blends de estacion y opciones sin lactosa.</p>
          </Col>
          <Col xs={12} md={4} className="intro-card">
            <h3>Ambiente</h3>
            <p>Espacio acogedor con wifi y enchufes para trabajar. Musica cuidada y plantas.</p>
          </Col>
        </Row>
      </section>
    </main>
  );
};

export default HomePage;
