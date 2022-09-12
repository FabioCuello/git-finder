import Joi from 'joi';

const subdomain_black_list = [
  'www',
  'api',
  'admin',
  'dashboard',
  'app',
  'assets',
  'app-staging',
  'automation',
  'backoffice',
  'em5222',
  'internal',
  'metabase',
  'preview[^]*',
  'prospectos',
  'proxy[^]*',
  'showroom[^]*',
  'site-builder',
  'sitebuilder',
  'sites-manager',
  'sockets'
];

const domain_regex = new RegExp(`^${subdomain_black_list.map((e) => `(?!${e}\.)`).join('')}([^\.]*)\.alohome\.io`);

const email = Joi.string().email().min(3).max(100).lowercase().trim().required();
const passwordLogin = Joi.string().required();
const password = Joi.string().min(8).max(100).required();
const mfaCode = Joi.string().min(6).max(6);
const mfaToken = Joi.string();
const name = Joi.string();
const repeat_password = Joi.string().valid(Joi.ref('password'));
const asset = Joi.string().uuid();
const assets = Joi.array().items(asset);

const project_name = Joi.string().lowercase().trim();
export const project_domain = Joi.string().domain().lowercase().trim().regex(domain_regex);

const theme = Joi.string();
const config = Joi.string();
const id = Joi.string().uuid();

const files = Joi.array().items(Joi.object({
  name: Joi.string().required(),
  content: Joi.string().required()
}));

export const loginSchemaValidation = Joi.object({
  email,
  password: passwordLogin,
  mfaCode,
  mfaToken
});

export const resetPasswordValidation = Joi.object({
  password: password
});

export const registerUser = Joi.object({
  email,
  password,
  repeat_password: repeat_password.required(),
  name: name.required(),
  project_name: project_name.required(),
  project_domain: project_domain.required(),
  assets: assets.required(),
  temporal_site_id: id.required()
});

export const createProject = Joi.object({
  project_name: project_name.required(),
  project_domain: project_domain.required(),
  assets: assets.required(),
  temporal_site_id: id.required(),
});

export const enterFromDesktop = Joi.object({
  email
});

export const createTemporarySite = Joi.object({
  theme: theme.required(),
  config: config.required(),
});

export const updateTemporarySite = Joi.object({
  id: id.required(),
  files: files.required()
});