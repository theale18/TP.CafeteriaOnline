import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    fecha: '',
    hora: '',
    mensaje: '',
  });

  const [errors, setErrors] = useState({});
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    document.title = 'Luna & Granos Cafe: Reservas';
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validarFormulario = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio.';
    if (!formData.email.includes('@')) newErrors.email = 'Ingrese un email válido.';
    if (!formData.fecha) newErrors.fecha = 'Seleccione una fecha.';
    if (!formData.hora) newErrors.hora = 'Seleccione una hora.';
    if (formData.mensaje.trim().length < 5) newErrors.mensaje = 'El mensaje debe tener al menos 5 caracteres.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = validarFormulario();
    if (Object.keys(val).length > 0) {
      setErrors(val);
      setEnviado(false);
      return;
    }

    setEnviado(true);
    setFormData({ nombre: '', email: '', fecha: '', hora: '', mensaje: '' });
  };

  return (
    <main className="contact-main">
      <Container>
        <h2 className="text-center mb-4">Reservas y Contacto</h2>
        <p className="text-center mb-5">Completá el formulario para reservar o dejar un mensaje.</p>

        <Form onSubmit={handleSubmit} className="contact-form">
          <Form.Group className="mb-3">
            <Form.Label>Nombre completo</Form.Label>
            <Form.Control name="nombre" value={formData.nombre} onChange={handleChange} isInvalid={!!errors.nombre} placeholder="Tu nombre" />
            <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} isInvalid={!!errors.email} placeholder="tuemail@ejemplo.com" />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fecha de reserva</Form.Label>
            <Form.Control type="date" name="fecha" value={formData.fecha} onChange={handleChange} isInvalid={!!errors.fecha} />
            <Form.Control.Feedback type="invalid">{errors.fecha}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Hora de reserva</Form.Label>
            <Form.Control type="time" name="hora" value={formData.hora} onChange={handleChange} isInvalid={!!errors.hora} />
            <Form.Control.Feedback type="invalid">{errors.hora}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Mensaje o detalle de la reserva</Form.Label>
            <Form.Control as="textarea" rows={4} name="mensaje" value={formData.mensaje} onChange={handleChange} isInvalid={!!errors.mensaje} placeholder="Ej: Quiero reservar una mesa para 2 personas." />
            <Form.Control.Feedback type="invalid">{errors.mensaje}</Form.Control.Feedback>
          </Form.Group>

          <div className="text-center">
            <Button type="submit" variant="dark" size="lg">Enviar</Button>
          </div>
        </Form>

        {enviado && <Alert variant="success" className="mt-4 text-center">¡Gracias por tu mensaje! Te responderemos a la brevedad ☕</Alert>}
      </Container>
    </main>
  );
};

export default ContactPage;
