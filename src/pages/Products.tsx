import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Product, useCart } from '../context/CartContext';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart } = useCart();

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'chairs', label: 'Chairs' },
    { value: 'tables', label: 'Tables' },
    { value: 'cabinets', label: 'Cabinets' },
    { value: 'shelves', label: 'Shelves' },
    { value: 'custom', label: 'Custom' }
  ];

  useEffect(() => {
    // Mock products data
    // In a real app, this would fetch from the API
    const mockProducts: Product[] = [
      {
        id: 1,
        name: "Handcrafted Oak Dining Table",
        price: 1299.99,
        sku: "OAK-TABLE-001",
        category: "tables",
        images: []
      },
      {
        id: 2,
        name: "Mahogany Executive Chair",
        price: 899.99,
        sku: "MAH-CHAIR-001",
        category: "chairs",
        images: []
      },
      {
        id: 3,
        name: "Pine Storage Cabinet",
        price: 649.99,
        sku: "PINE-CAB-001",
        category: "cabinets",
        images: []
      },
      {
        id: 4,
        name: "Teak Coffee Table",
        price: 899.99,
        sku: "TEAK-TABLE-001",
        category: "tables",
        images: []
      },
      {
        id: 5,
        name: "Bamboo Bookshelf",
        price: 449.99,
        sku: "BAMBOO-SHELF-001",
        category: "shelves",
        images: []
      },
      {
        id: 6,
        name: "Walnut Office Chair",
        price: 1199.99,
        sku: "WALNUT-CHAIR-001",
        category: "chairs",
        images: []
      },
      {
        id: 7,
        name: "Custom Kitchen Cabinet Set",
        price: 2999.99,
        sku: "CUSTOM-KITCHEN-001",
        category: "custom",
        images: []
      },
      {
        id: 8,
        name: "Cedar Display Shelf",
        price: 329.99,
        sku: "CEDAR-SHELF-001",
        category: "shelves",
        images: []
      }
    ];

    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm]);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    // You could add a toast notification here
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      chairs: '🪑',
      tables: '🪞',
      cabinets: '🗄️',
      shelves: '📚',
      custom: '🎨'
    };
    return icons[category] || '🪵';
  };

  return (
    <Container className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <h1 className="display-4 fw-bold mb-3" style={{ color: 'var(--wood-primary)' }}>
            Our Products
          </h1>
          <p className="lead text-muted">
            Discover our collection of handcrafted furniture and custom woodwork
          </p>
        </Col>
      </Row>

      {/* Filters */}
      <Row className="mb-4">
        <Col lg={6} className="mb-3">
          <InputGroup>
            <InputGroup.Text>🔍</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control-wood"
            />
          </InputGroup>
        </Col>
        <Col lg={6} className="mb-3">
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-control-wood"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* Results Info */}
      <Row className="mb-3">
        <Col>
          <p className="text-muted">
            Showing {filteredProducts.length} of {products.length} products
            {selectedCategory !== 'all' && (
              <Badge bg="secondary" className="ms-2">
                {categories.find(c => c.value === selectedCategory)?.label}
              </Badge>
            )}
            {searchTerm && (
              <Badge bg="info" className="ms-2">
                Search: "{searchTerm}"
              </Badge>
            )}
          </p>
        </Col>
      </Row>

      {/* Products Grid */}
      {loading ? (
        <Row className="justify-content-center py-5">
          <Col xs="auto">
            <div className="spinner-wood"></div>
          </Col>
        </Row>
      ) : filteredProducts.length === 0 ? (
        <Row className="text-center py-5">
          <Col>
            <h3>No products found</h3>
            <p className="text-muted">Try adjusting your search or filter criteria</p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="btn-wood-primary"
            >
              Clear Filters
            </Button>
          </Col>
        </Row>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="product-card border-0">
              <div 
                className="product-image d-flex align-items-center justify-content-center"
                style={{ backgroundColor: 'var(--wood-light)' }}
              >
                <span style={{ fontSize: '4rem', opacity: 0.5 }}>
                  {getCategoryIcon(product.category)}
                </span>
              </div>
              <Card.Body className="product-info">
                <span className="product-category text-capitalize">
                  {product.category}
                </span>
                <Card.Title className="product-title">
                  {product.name}
                </Card.Title>
                <Card.Text className="text-muted small mb-2">
                  SKU: {product.sku}
                </Card.Text>
                <div className="product-price">
                  ₱{product.price.toLocaleString()}
                </div>
                <div className="d-grid gap-2">
                  <Button 
                    as={Link}
                    to={`/products/${product.id}`}
                    className="btn-wood-secondary"
                  >
                    View Details
                  </Button>
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    className="btn-wood-primary"
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}

      {/* Call to Action */}
      {!loading && filteredProducts.length > 0 && (
        <Row className="text-center mt-5 py-5" style={{ backgroundColor: 'var(--wood-light)', borderRadius: '1rem' }}>
          <Col>
            <h3 className="mb-3" style={{ color: 'var(--wood-primary)' }}>
              Don't see what you're looking for?
            </h3>
            <p className="lead mb-4">
              We specialize in custom woodwork. Let us create something unique for you!
            </p>
            <Button 
              as={Link} 
              to="/contact" 
              className="btn-wood-primary"
              size="lg"
            >
              Request Custom Quote
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Products;