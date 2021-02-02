import React from "react";
import './Formulario.css';
import { Form, Button, Col, Container } from "react-bootstrap";
import axios from "axios";

class Formulario extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: "",
            TipoID: "",
            Email: "",
            Nombres: "",
            Apellidos: "",
            FechaIngreso: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.agregarPersona = this.agregarPersona.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    agregarPersona(event) {
        event.preventDefault();
        if (this.state.TipoID === "" || this.state.Id === "" || this.state.Nombres === "" ||
            this.state.Apellidos === "" || this.state.Email === "" || this.state.FechaIngreso === "") {
            console.log("Entra");
            alert('Por favor, llene todos los campos del formulario ');
        }
        else {
            axios.post("http://localhost:3020/personas/add/", {
                Id: this.state.Id,
                TipoID: this.state.TipoID,
                Email: this.state.Email,
                Nombres: this.state.Nombres,
                Apellidos: this.state.Apellidos,
                FechaIngreso: this.state.FechaIngreso,
            })
                .then((response) => {
                    // Respuesta del servidor
                })
                .catch((e) => {
                    console.log(e);
                });
            alert('Gracias por llenar el formulario');
            window.location.reload(true);
        }
    }

    render() {
        return (
            <Container className="cont">
                <h2 className="titulo" >Ingresa tu información</h2>
                <br></br><br></br>
                <Form onSubmit={this.agregarPersona}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="TipoID">
                            <Form.Label className="label">Tipo de documento</Form.Label>
                            <Form.Control required name="TipoID" as="select" defaultValue="Tipo de documento" onChange={this.handleChange}>
                                <option value="Tipo de documento" disabled hidden>Seleccione tipo de documento</option>
                                <option>Cédula de ciudadanía</option>
                                <option>Tarjeta de identidad</option>
                                <option>Pasaporte</option>
                                <option>Registro civil</option>
                                <option>Otro</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="Id">
                            <Form.Label className="label">Número de identificación</Form.Label>
                            <Form.Control name="Id" type="text" maxLength={15} placeholder="Número de identificación" onChange={this.handleChange} required />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="Nombres">
                            <Form.Label className="label">Nombre</Form.Label>
                            <Form.Control name="Nombres" type="text" maxLength={30} placeholder="Ingresa tu nombre" onChange={this.handleChange} required />
                        </Form.Group>
                        <Form.Group as={Col} controlId="Apellidos">
                            <Form.Label className="label">Apellidos</Form.Label>
                            <Form.Control name="Apellidos" type="text" maxLength={30} placeholder="Ingresa tus apellidos" onChange={this.handleChange} required />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="Email">
                            <Form.Label className="label">E-mail</Form.Label>
                            <Form.Control name="Email" type="email" maxLength={40} placeholder="Ingresa tu e-mail" onChange={this.handleChange} required />
                        </Form.Group>
                        <Form.Group as={Col} controlId="FechaIngreso">
                            <Form.Label className="label">Fecha de ingreso a la plataforma</Form.Label>
                            <Form.Control name="FechaIngreso" type="date" onChange={this.handleChange} required />

                        </Form.Group>
                    </Form.Row>
                    <Button type="submit" className="button">
                        Enviar
                </Button>
                </Form >
                <br></br>
            </Container>
        );
        /**En la base de datos la fecha tuvo que ser puesta en VARCHAR ya que react bootstrap no admite
         * un Form.Control de formato DD-MM-AAAA y agrega este formato TZ00:00:00:00
         */
    }
}

export default Formulario;