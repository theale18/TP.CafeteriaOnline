import React, { useContext, useState } from 'react';
import { Container, Table, Button, Modal } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';

const CartComponent = () => {
  const { cartItems, removeFromCart, clearCart, setCartItems } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);

  const total = cartItems.reduce((acc, item) => acc + (item.precio * (item.quantity || 1)), 0);

  const handleQuantityChange = (id, delta) => {
    setCartItems(prev =>
      prev.map(p =>
        p.id === id ? { ...p, quantity: Math.max(1, (p.quantity || 1) + delta) } : p
      )
    );
  };

  const handleConfirm = () => {
    setShowModal(false);
    clearCart();
  
    alert('¡Pedido confirmado! Gracias por elegir Luna & Granos Cafe');
  };

  return (
    <main className="cart-main">
      <Container className="cart-container">
        <h2 className="text-center mb-4">Tu Pedido</h2>

        {cartItems.length === 0 ? (
          <p className="text-center">No hay productos en tu pedido.</p>
        ) : (
          <>
            <Table responsive bordered hover className="cart-table align-middle">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <img src={item.imagen} alt={item.nombre} style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8 }} />
                        <div>
                          <div style={{ fontWeight: 600 }}>{item.nombre}</div>
                          <div style={{ fontSize: 12, color: '#666' }}>{item.categoria}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Button variant="outline-secondary" size="sm" onClick={() => handleQuantityChange(item.id, -1)}>-</Button>
                      <span className="mx-2">{item.quantity || 1}</span>
                      <Button variant="outline-secondary" size="sm" onClick={() => handleQuantityChange(item.id, 1)}>+</Button>
                    </td>
                    <td>${item.precio.toLocaleString()}</td>
                    <td>${((item.precio) * (item.quantity || 1)).toLocaleString()}</td>
                    <td>
                      <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>Eliminar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="cart-summary">
              <h5>Total: ${total.toLocaleString()}</h5>
              <div className="cart-buttons">
                <Button variant="secondary" onClick={clearCart}>Vaciar pedido</Button>
                <Button variant="dark" onClick={() => setShowModal(true)}>Confirmar pedido</Button>
              </div>
            </div>
          </>
        )}
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Deseas confirmar tu pedido por un total de <b>${total.toLocaleString()}</b>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="success" onClick={handleConfirm}>Confirmar</Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default CartComponent;
