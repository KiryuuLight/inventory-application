const z = require('zod');

const gameShape = z.object({
  name: z.string().min(2).max(30),
  platform: z.string().array().nonempty(),
  genre: z.string().array().nonempty(),
  publisher: z.string(),
  quantity: z.coerce.number().int().positive().gte(0),
  price: z.coerce.number().positive().gte(0),
  description: z.string().min(10).max(200),
});

const genreShape = z.object({
  name: z.string().nonempty().max(20),
  description: z.string().min(10).max(200),
});

const platformShape = z.object({
  name: z.string().nonempty().max(20),
  releaseYear: z.coerce.date(),
  generation: z.enum(['6th', '7th', '8th', 'PC']),
});

const publisherShape = z.object({
  name: z.string().nonempty().max(20),
  country: z.string().nonempty().max(15),
  foundingYear: z.coerce.date(),
  website: z
    .string()
    .regex(
      /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/
    )
    .nonempty(),
});

module.exports = { gameShape, genreShape, platformShape, publisherShape };
