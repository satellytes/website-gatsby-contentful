import {hideVisually, rgba} from 'polished';
import React from 'react'
import styled, { css } from 'styled-components';
import Button from '../button/button';

import PersonIcon from "./../../images/icon-person.png";
import MailIcon from "./../../images/icon-mail.png";
import { Formik, Form } from 'formik';

import * as Yup from "yup";
import SubmitButton from './submit-button';
import Formfield from './formfield';
import {Input, Textarea} from './input';
import { Persist } from 'formik-persist';

function delayPromise(duration) {
  return function(...args){
    return new Promise(function(resolve, reject){
      setTimeout(function(){
        resolve(...args);
      }, duration)
    });
  };
}
const encode = (data) => {
  return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
}

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .max(256, 'Das ist zu lang')
    .required('Wir würden dich gerne mit Namen ansprechen'),

    email: Yup.string()
    .email('Bei dieser Adresse scheint etwas nicht zu stimmen')
    .required('Wir brauchen deine E-Mail, um dich zu kontaktieren'),

    message: Yup.string()
    .min(10, 'Diese Nachricht ist ein bisschen zu kurz')
    .max(5000, 'Die Nachricht ist zu lang.')
    .required('Die Nachricht fehlt, du willst uns doch eine schicken oder?'),
});


const HoneyPot = styled.div`
  ${hideVisually()};
`

const FormGroup = styled.div`
  &:not(:first-child) {
    margin-top: 20px;
  }
`;

const FormLayout = styled.div`
  margin-top: 20px;
`


const ErrorMessage = styled.div`
  color: ${ ({theme}) => theme.colors.error };
`

export class ContactForm extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      message: '',
      completed: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit(values, { setSubmitting }){
    const data = JSON.stringify(values, null, 2);

    setSubmitting(true);

    this.setState({
      completed: false
    })
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "sy-contact-form",
        ...values
      })
    })
    .then((response) => {
      if (response.ok) {
        return response
      } else {
        throw Error(response.statusText)
      }
    })
    .then(() => this.onSubmitSuccess(setSubmitting))
    .catch(() => this.onSubmitError(setSubmitting, setSubmitting))
  }

  reset() {
    setTimeout(() => {
      this.setState({
        completed: false
      })
    }, 2000)
  }

  onSubmitSuccess = (setSubmitting) => {
    console.log('onSubmitSuccess')


    setSubmitting(false);
    this.setState({
      completed: true,
      success: true
    })

    window.localStorage.setItem('contact-form', null);

    // this.reset();
  }

  onSubmitError = (error, setSubmitting) => {
    setSubmitting(false);

    this.setState({
      completed: false,
      error: true
    })

  }

  handleChange = field => event => {
    console.log('field', field,  { [field]: event.target.value})
    this.setState({ [field]: event.target.value});
  }

  render() {

    return (
      <FormLayout>
        <Formik
          initialValues={{ name: '', email: '', message: '' }}
          validateOnBlur={true}
          validationSchema={SignupSchema}
          onSubmit={this.submit}
        >
          {({ errors, touched, isSubmitting }) => {
            const disabled = isSubmitting || this.state.completed;

            return (
            <Form data-netlify-honeypot="non-human-field" data-netlify="true" >
              <HoneyPot/>

              <FormGroup>
                <Formfield
                  id="name" icon={PersonIcon} label='Name'
                  hasError={errors.name && touched.name} errorMessage={errors.name}>
                  <Input id="name" name="name" disabled={disabled} />
                </Formfield>
              </FormGroup>

              <FormGroup >
                <Formfield
                  icon={MailIcon} id='email' label='E-Mail'
                  hasError={errors.email && touched.email} errorMessage={errors.email}>
                  <Input id='email' name="email" disabled={disabled} />
                </Formfield>
              </FormGroup>

              <FormGroup>
                <Formfield
                  id='message' label='Ihre Nachricht'
                  hasError={errors.message && touched.message} errorMessage={errors.message} >
                  <Textarea id='message' name="message" disabled={disabled} />
                </Formfield>
              </FormGroup>

              <FormGroup>
                {
                  this.state.error ? (
                    <ErrorMessage>Irgendwas ist schief gelaufen, versuchs nochmal oder sende uns stattdessen eine E-Mail.</ErrorMessage>
                  ) : null
                }
                <SubmitButton
                  disabled={disabled}
                  progressLabel='Sende...'
                  completeLabel='Gesendet'
                  completed={this.state.completed && this.state.error !== false}
                  sending={isSubmitting}>Senden {isSubmitting}</SubmitButton>
              </FormGroup>
              {
                this.state.completed ? null : (<Persist name="contact-form" />)
              }

            </Form>
          )}}
        </Formik>
    </FormLayout>
    )
  }
}
