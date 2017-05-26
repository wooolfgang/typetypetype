import path from 'path';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import { MongoClient } from 'mongodb';

import feathers from 'feathers';
import rest from 'feathers-rest';
import socketio from 'feathers-socketio';
import hooks from 'feathers-hooks';
import configuration from 'feathers-configuration';

import services from './services';
import middleware from './middleware';

const app = feathers();

// Load app configuration
app.configure(configuration(path.join(process.cwd())));

app.use(feathers.static(path.join(process.cwd(), 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Plugins and Providers
app.configure(rest());
app.configure(hooks());
app.configure(socketio());

// Connect to db and setup services;
const setupApp = async () => {
  const db = await MongoClient.connect(app.get('mongoURI'));
  console.log('Connected to db');

  app.configure(services(db));
  app.configure(middleware());
  return app;
}

export default setupApp;