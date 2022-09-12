import Joi from 'joi';

const mime_type = Joi.string();
const tags = Joi.array().items(Joi.string());
const type = Joi.string();
const metadata = Joi.object();
const asset_id = Joi.string().uuid();

export const generate_signed_url = Joi.object({
  tags: tags.default([]),
  type: type.default('file'),
  metadata: metadata.default({}),
  mime_type: mime_type.required(),
});

export const update_asset = Joi.object({
    asset_id: asset_id.required(),
    tags: tags,
    type: type,
    metadata: metadata,
});