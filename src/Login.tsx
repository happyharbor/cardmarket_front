import * as React from 'react';
import {FormEvent, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Login.css';

interface Props {
    username: string,
    password: string,
}

export const Login: React.FC<Props> = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const validateForm = () => username.length > 0 && password.length > 0;

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
    };

    return (
        <div className='Login'>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='email'>
                    <Form.Label>Username: </Form.Label>
                    <Form.Control
                        autoFocus
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password: </Form.Label>
                    <Form.Control
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button block size='lg' type='submit' disabled={!validateForm()}>
                    Login
                </Button>
            </Form>
        </div>
    );
};