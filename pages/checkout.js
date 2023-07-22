import { Col, Row } from "reactstrap";
import Cart from "../components/Cart/index";
import CheckOutForm from "../components/CheckOut/CheckOutForm";

const checkout = () => {
  return (
    <Row>
      <Col>
        <h1>チェックアウト</h1>
        <Cart />
      </Col>
      <Col>
        <CheckOutForm />
      </Col>
    </Row>
  )
};

export default checkout