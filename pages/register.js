import React, { useContext, useState } from 'react';
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { registerUser } from "../lib/auth";
import AppContext from '../context/AppContext';

//useContextで受け取って、
const register = () => {
  const appContext = useContext(AppContext);
  const [data, setData] = useState({username: "", email:"", password:""});

  const handleRegister = () =>{
    registerUser(data.username, data.email, data.password).then((res)=>{
      appContext.setUser(res.data.user);
    }).catch((err) => console.log(err));
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="paper">
            <div className="header">
              <h2>ユーザー登録</h2>
            </div>
          </div>
          <section className="wrapper">
            <Form>
                <fieldset>
                  {/* ユーザー名を入力したらsetDataに反映される */}
                  <FormGroup>
                    <Label>ユーザー名：</Label>
                    <Input
                      type="text"
                      name="username"
                      style={{height:50, fontSize: "1.2rem" }}
                      onChange={(e)=>setData(e.target.value)}
                    />
                  </FormGroup>
                </fieldset>
            </Form>
            <Form>
                <fieldset>
                  {/* メールアドレスを入力したらsetDataに反映される */}
                  <FormGroup>
                    <Label>メールアドレス：</Label>
                    <Input type="email"
                      name="email"
                      style={{height:50, fontSize: "1.2rem" }}
                      onChange={(e)=>setData(e.target.value)}
                    />
                  </FormGroup>
                </fieldset>
            </Form>
            <Form>
                <fieldset>
                  {/* パスワードを入力したらsetDataに反映される */}
                  <FormGroup>
                    <Label>パスワード：</Label>
                    <Input type="password"
                      name="password"
                      style={{height:50, fontSize: "1.2rem" }}
                      onChange={(e)=>setData(e.target.value)}
                    />
                  </FormGroup>
                  <span>
                    <a href="">
                      <small>パスワードをお忘れですか？</small>
                    </a>
                  </span>
                  <Button
                    style={{ float: "right", width: 120}}
                    color="primary"
                    onClick={()=>{handleRegister();}}
                  >
                    登録
                  </Button>
                </fieldset>
            </Form>
          </section>
        </Col>
      </Row>
      <style jsx>
        {`
        .paper{
          text-align: center;
          margin-top: 50px;
        }
        .header{
          width: 100%;
          margin-bottom: 30px;
        }
        .wrapper{
          padding:10px 30px 20px 30px;
        }
        `}
      </style>
    </Container>
  )
}

export default register;