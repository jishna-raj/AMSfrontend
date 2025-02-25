import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import {
  Users,
  Apple,
  Activity,
  NotebookText,
  Bell,
  FileText,
  MessageSquare,
  User,

  SquareMousePointer
} from 'lucide-react';
import './Home.css';
import About from '../components/About';

function Home() {
  return (
    <div>
      <div className="main-wrapper">
        <div className="row w-100 home " style={{ marginLeft: "150px" }}>
          <div className="col-md-5 mt-5">

            <h1 style={{ color: "rgb(6, 59, 6)", fontWeight: "900" }} className='text-justify'>Efficient Management: Streamline <br /><span>Anganavadi Operations</span><br />at Your Fingertips!</h1>
            <h6 style={{ color: "rgb(6, 59, 6)", fontWeight: "600", fontSize: "15px" }}>
              We simplify the management of Anganavadi centers dedicated to nurturing children and supporting mothers. Easily register and manage student details, organize daily schedules, and send notifications for events. Track health and nutrition updates with ease. Our system empowers you to focus on what truly matters—providing care and education to the community. Your path to better management is just a few clicks away—start enhancing your Anganavadi operations today!
            </h6>

          </div>

          
          <div className="col-md-5">
            <img src="https://img.freepik.com/premium-vector/big-family-together-cute-people-mom-grandpa-grandmother-with-baby-flat-standing-group-cartoon-grandparents-kids-decent-vector-characters_53562-16917.jpg" alt="" style={{marginTop:'90px'}} />
          </div>
          <div className="col-md-1"></div>
        </div>


        <Container className="stats-section py-5">
          <Row className="text-center">
            <Col md={3} sm={6} className="mb-4">
              <div className="stat-item" style={{color:'rgb(6, 59, 6)'}}>
                <h2 className="display-6 fw-bold">500+</h2>
                <p>Children Enrolled</p>
              </div>
            </Col>
            <Col md={3} sm={6} className="mb-4">
              <div className="stat-item " style={{color:"rgb(6, 59, 6)"}}>
                <h2 className="display-6 fw-bold">50</h2>
                <p>Centers</p>
              </div>
            </Col>
            <Col md={3} sm={6} className="mb-4">
              <div className="stat-item " style={{color:"rgb(6, 59, 6)"}}>
                <h2 className="display-6 fw-bold">100+</h2>
                <p>Staff Members</p>
              </div>
            </Col>
            <Col md={3} sm={6} className="mb-4">
              <div className="stat-item " style={{color:"rgb(6, 59, 6)"}}>
                <h2 className="display-6 fw-bold">98%</h2>
                <p>Satisfaction Rate</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="features-section py-5">
        <h2 className="text-center mb-5">Key Features</h2>
        <Row>
          <Col lg={4} md={6} className="mb-4">
            <Card className="h-100 feature-card">
              <Card.Body>
                <Users className="feature-icon mb-3" />
                <Card.Title>Child Management</Card.Title>
                <Card.Text>
                  Complete child registration system with demographic details, family information, and development tracking.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={6} className="mb-4">
            <Card className="h-100 feature-card">
              <Card.Body>
                <Apple className="feature-icon mb-3" />
                <Card.Title>Nutrition Monitoring</Card.Title>
                <Card.Text>
                  Track daily meals, nutritional supplements, and dietary requirements for each child.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={6} className="mb-4">
            <Card className="h-100 feature-card">
              <Card.Body>
                <Activity className="feature-icon mb-3" />
                <Card.Title>Health Tracking</Card.Title>
                <Card.Text>
                  Monitor immunizations, health checkups, and growth metrics with detailed reporting.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6} className="mb-4">
            <Card className="h-100 feature-card">
              <Card.Body>
                <User Check className='feature-icon mb-3' />
                <Card.Title>User Management</Card.Title>
                <Card.Text>
                  Update and manage user profiles including personal information, contact details, and addresses.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6} className="mb-4">
            <Card className="h-100 feature-card">
              <Card.Body>
                <SquareMousePointer className='feature-icon mb-3' />
                <Card.Title>Inventory Management</Card.Title>
                <Card.Text>
                  Track inventory items including quantity, unit price, and supplier information.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6} className="mb-4">
            <Card className="h-100 feature-card">
              <Card.Body>
                <NotebookText className="feature-icon mb-3" />
                <Card.Title>Beneficiary Management</Card.Title>
                <Card.Text>
                  Monitor immunizations, health checkups, and growth metrics with detailed reporting.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <About />

      {/* Additional Features */}
      <div className="bg-light py-5">
        <Container>
          <h2 className="text-center mb-5">Additional Services</h2>
          <Row>
            <Col md={4} className="mb-4">
              <div className="d-flex align-items-start">
                <Bell className="text-primary me-3" />
                <div>
                  <h5>Notifications</h5>
                  <p>Instant alerts for important updates and reminders</p>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="d-flex align-items-start">
                <FileText className="text-primary me-3" />
                <div>
                  <h5>Document Management</h5>
                  <p>Digital storage for important documents and records</p>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="d-flex align-items-start">
                <MessageSquare className="text-primary me-3" />
                <div>
                  <h5>Communication Portal</h5>
                  <p>Integrated system for parent-teacher communication</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Home;