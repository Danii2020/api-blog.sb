import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import { config } from '../config/config';

chai.use(chaiHttp)

const URL = 'http://localhost:3000';
const profileRoute = '/api/v1/profile';
const adminTestToken = <string> config.adminTestToken;
const userTestToken = <string> config.userTestToken;
