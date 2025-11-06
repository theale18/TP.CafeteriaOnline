import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Card, Button, InputGroup, FormControl } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import productsData from '../data/products.json';

const MenuPage = () => {
  const [productos, setProductos] = useState([]);
  const [query, setQuery] = useState('');
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    document.title = 'Luna & Granos Cafe: Carta';
    setProductos(productsData);
  }, []);

  const filtered = productos.filter(p =>
    p.nombre.toLowerCase().includes(query.toLowerCase()) ||
    p.categoria.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="menu-main">
      <Container>
        <h2 className="text-center mb-4">Nuestra Carta</h2>

        <InputGroup className="mb-4">
          <FormControl
            placeholder="Buscar por nombre o categoría (ej: café, té, pastelería)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </InputGroup>

        <div className="menu-grid">
          {filtered.map(producto => (
            <Card className="product-card" key={producto.id}>
              <Card.Img variant="top" src={producto.imagen} className="product-image" alt={producto.nombre} />
              <Card.Body>
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text>${producto.precio.toLocaleString()}</Card.Text>
                <Button variant="dark" onClick={() => addToCart(producto)} className="btn-add-cart">Agregar al pedido</Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </main>
  );
};

export default MenuPage;
