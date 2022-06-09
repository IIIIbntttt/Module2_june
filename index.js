const HashRouter = window.ReactRouterDOM.HashRouter;
const Route = window.ReactRouterDOM.Route;
const withRouter = window.ReactRouterDOM.withRouter;

class Page extends React.Component {
    render() {
        return (<div>
            <h1>{this.props.name}</h1>
            <button onClick={() => {
                setTimeout(() => {
                    if (this.props.onAuth) {
                        this.props.onAuth({name: 'fio', email: 'sadfsdf'});
                    }
                }, 500);
            }}>AUTH
            </button>
        </div>);

    }
}


class RegistrationClass extends React.Component {
    state = { formErrors: {} };

    async onSubmit(ev) {
        ev.preventDefault();
        this.props.history.push('/')
        console.log(ev.target.elements.email.value);
        let response = null;
        try {
            response = await fetch('http://shop.api.deadzeta.ru/api-shop/signup', {
                method: 'POST', body: JSON.stringify({
                    email: ev.target.elements.email.value,
                    password: ev.target.elements.password.value,
                    fio: ev.target.elements.fio.value,
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            });
        } catch (error) {
            console.log('error: ', error);
            return;
        }

        const result = await response.json();
        console.log('result: ', result);
        if (result.error) {
            if (result.error.errors) {
                this.setState({ formErrors: result.error.errors });
            }
            return;
        }
        console.log(result.data.token);
        this.setState({ formErrors: {} });
    }


    render() {
        return (<div className="row row-cols-1 row-cols-md-3 mb-3 text-center justify-content-center">
            <div className="col">
                <div className="row">
                    <form onSubmit={(ev) => this.onSubmit(ev)}>
                        <h1 className="h3 mb-3 fw-normal">Пожалуйста заполните все поля</h1>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" style={this.state.formErrors.fio ? {borderColor: 'red'} : {}} id="floatingFio" placeholder="ФИО" name="fio"/>
                            { this.state.formErrors.fio &&
                                <p className="form-control-error">{this.state.formErrors.fio[0]}</p>
                            }
                            <label htmlFor="floatingFio">ФИО</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" style={this.state.formErrors.email ? {borderColor: 'red'} : {}} id="floatingInput" name="email"
                                   placeholder="name@example.com"/>
                            { this.state.formErrors.email &&
                                <p className="form-control-error">{this.state.formErrors.email[0]}</p>
                            }
                            <label htmlFor="floatingInput">Email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" style={this.state.formErrors.password ? {borderColor: 'red'} : {}} id="floatingPassword" name="password"
                                   placeholder="Password"/>
                            { this.state.formErrors.password &&
                                <p className="form-control-error">{this.state.formErrors.password[0]}</p>
                            }
                            <label htmlFor="floatingPassword">Password</label>
                        </div>

                        <button className="w-100 btn btn-lg btn-primary mb-3" type="submit">Зарегистрироваться
                        </button>
                        <button className="w-100 btn btn-lg btn-outline-info" type="button" onClick={() => {
                            this.props.history.push('/');
                        }}>Назад</button>
                    </form>
                </div>
            </div>
        </div>);
    }
}

const Registration = withRouter(RegistrationClass);

class Main extends React.Component {
    state = {user: null};

    render() {
        return (
            <HashRouter>
                <header>
                    <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                        <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
                            <span className="fs-4">«Just buy»</span>
                        </a>

                        <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                            {!this.state.user &&
                                <LinkWithAnimation to="/registration"
                                                   className="me-3 py-2 text-dark text-decoration-none">Регистрация</LinkWithAnimation>
                            }
                            <LinkWithAnimation to="/"
                                               className="me-3 py-2 text-dark text-decoration-none">Авторизация</LinkWithAnimation>
                            <LinkWithAnimation to="/products" className="me-3 py-2 text-dark text-decoration-none">Мои
                                заказы</LinkWithAnimation>
                            <LinkWithAnimation to="/order"
                                               className="me-3 py-2 text-dark text-decoration-none">Корзина</LinkWithAnimation>
                            {this.state.user &&
                                <LinkWithAnimation to={`/logout/${this.state.user.email}`}
                                                   className="me-3 py-2 text-dark text-decoration-none">ВЫХОД
                                    ({this.state.user.email})</LinkWithAnimation>
                            }
                        </nav>
                    </div>

                    <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
                        <h1 className="display-4 fw-normal">Каталог товаров</h1>
                    </div>
                </header>

                <main id="main">
                    <Route exact path="/">
                        <Page name="ROOT" onAuth={(user) => {
                            this.setState({user: user})
                        }}/>
                    </Route>
                    <Route path="/registration">
                        <Registration/>
                    </Route>
                    <Route path="/products">
                        <Page name="It`s another page 2"/>
                    </Route>
                    <Route path="/order">
                        <Page name="You super!!!"/>
                    </Route>
                </main>

                <footer className="pt-4 my-md-5 pt-md-5 border-top">
                    <div className="row">
                        <div className="col-12 col-md">
                            <small className="d-block mb-3 text-muted">&copy; 2017–2021</small>
                        </div>
                    </div>
                </footer>
            </HashRouter>
        )
    }
}

ReactDOM.render(
    <Main/>,
    document.getElementById('root')
);
