import feathers from 'feathers';
import socketio from 'feathers-socketio';
import hooks from 'feathers-hooks';
import errors from 'feathers-errors';
import auth from 'feathers-authentication-client';
import io from 'socket.io-client';

const socket = io('http://localhost:8081');

const client = feathers();

client.configure(socketio(socket));
client.configure(hooks());
client.configure(auth({ storage: window.localStorage }));

window.client = client;

export default client;
