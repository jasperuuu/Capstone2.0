import React from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { state, updateQuantity, removeFromCart, getCartTotal } = useCart();

  if (state.items.length === 0) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={6} className="text-center">
            <Card className="card-wood">
              <Card.Body className="p-5">
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
                <h2>Your Cart is Empty</h2>
                <p className="text-muted mb-4">
                  Start shopping to add items to your cart
                </p>
                <Button 
                  as={Link} 
                  to="/products" 
                  className="btn-wood-primary"
                  size="lg"
                >
                  Browse Products
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h1 className="display-4 fw-bold mb-4" style={{ color: 'var(--wood-primary)' }}>
            Shopping Cart
          </h1>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          <Card className="card-wood">
            <Card.Header>
              <h5 className="mb-0">Cart Items ({state.itemCount})</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive className="mb-0">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {state.items.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <div>
                          <h6 className="mb-1">{item.product.name}</h6>
                          <small className="text-muted">SKU: {item.product.sku}</small>
                          {item.customizations && (
                            <div>
                              <small className="text-info">
                                Custom: {item.customizations}
                              </small>
                            </div>
                          )}
                        </div>
                      </td>
                      <td>₱{item.product.price.toLocaleString()}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline-secondary"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span className="px-2">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline-secondary"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </td>
                      <td>₱{(item.product.price * item.quantity).toLocaleString()}</td>
                      <td>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="card-wood">
            <Card.Header>
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal:</span>
                <span>₱{getCartTotal().toLocaleString()}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Shipping:</span>
                <span>Calculated at checkout</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <strong>Total:</strong>
                <strong>₱{getCartTotal().toLocaleString()}</strong>
              </div>
              <div className="d-grid gap-2">
                <Button 
                  as={Link}
                  to="/checkout"
                  className="btn-wood-primary"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>
                <Button 
                  as={Link}
                  to="/products"
                  className="btn-wood-secondary"
                >
                  Continue Shopping
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;