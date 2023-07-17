import React from "react";
import App from "next/app";
import Head from "next/head";
import Layout from "../components/Layout";
import withData from "../lib/apollo";
import AppContext from "../context/AppContext";
import Cookies from "js-cookie";
class MyApp extends App{
  state = {
    user: null,
    cart: { items: [], total: 0 },
  };

  componentDidMount(){
    const token = Cookies.get("token");
    const cart = Cookies.get("cart");

    if(cart !== undefined){
      JSON.parse(cart).forEach((item) => {
        this.setState({
          cart: {
            items: cart,
            total: (this.state.cart.total += item.price * item.quantity),
          },
        });
      });
    }
    if(token){
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async(res)=>{
        if(!res.ok){
          Cookies.remove("token");
          this.setState({ user: null});
          return null;
        }
        const user = await res.json();
        this.setUser(user);
      });
    }
  }

  setUser = (user) =>{
    this.setState({ user })
  };

  addItem = (item) => {
    let { items } = this.state.cart;
    //item(追加したアイテム)が一致するものをnewItemとする。findメソッドで引数をiとする
    const newItem = items.find((i)=>( i.id === item.id ));
    // もし、newItemがなかったら、そのitemの個数を1とする
    if(!newItem){
      item.quantity = 1;
    //stateの状態を更新する。totalには、item.priceを更新
      this.setState({
        cart: {
          items: [...items, item],
          total: this.state.cart.total + item.price,
        },
      },
      () => Cookies.set("cart", this.state.cart.items)
      );
    }
    else {
      //すでに同じ商品が入っている時、
      //stateの状態を更新する。map関数でnewItem.idが一致したら
      //Object.assignを使ってクローン、 quantity: item.quantity + 1 そうでない場合はそのままitem
      //totalには、item.priceを更新
      this.setState({
        cart: {
          items: this.state.cart.items.map((item) =>
            item.id === newItem.id
              ? Object.assign({}, item, item.quantity + 1)
              : item
          ),
          total: this.state.cart.total + item.price,
        },
      },
      () => Cookies.set("cart", this.state.cart.items)
      );
    }
  };

  removeItem = (item) => {
    let { items } = this.state.cart;
    const newItem = item.find((i)=> i.id === item.id);
    if(newItem.quantity > 1){
      this.setState({
        cart: {
          items: this.state.cart.items.map((item)=>
            item.id === newItem.id
            ? Object.assign({},item,{quantity: item.quantity - 1})
            :item
          ),
          total: this.state.cart.total - item.price,
        },
      },
      () => Cookies.set("cart", this.state.cart.items)
      );
    }
    //商品が1つだけの場合
    else {
      const items = [...this.state.cart.items];
      const index = items.findIndex((i) => i.id === newItem.id);
      items.splice(index, 1);
      this.setState(
        {
          cart: {
            items: items,
            total: this.state.cart.total - item.price,
          },
        },
        () => Cookies.set("cart", this.state.cart.items)
      );
    }
  };

  //AppContextのvalueを渡す
  render(){
    const {Component, pageProps} = this.props;
    return (
      <AppContext.Provider
        value={{
          user: this.state.user,
          cart: this.state.cart,
          setUser: this.setUser,
          addItem: this.addItem,
          removeItem: this.removeItem,
        }}
      >
        <>
          <Head>
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
            />
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </>
      </AppContext.Provider>
    );
  }
}

export default withData(MyApp);