// Get arguments passed on command line
const userArgs = process.argv.slice(2);
console.log(userArgs);

const Game = require('./models/game');
const Genre = require('./models/genre');
const Platform = require('./models/platform');
const Publisher = require('./models/publisher');

const games = [];
const genres = [];
const platforms = [];
const publishers = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createPublishers();
  await createPlatforms();
  await createGenres();
  await createGames();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

async function gameCreate(
  index,
  name,
  platform,
  genre,
  publisher,
  quantity,
  price,
  description
) {
  const game = new Game({
    name,
    platform,
    genre,
    publisher,
    quantity,
    price,
    description,
  });

  await game.save();
  games[index] = game;
  console.log(`Added game: ${name}`);
}

async function genreCreate(index, name, description) {
  const genre = new Genre({ name, description });
  await genre.save();
  genres[index] = genre;
  console.log(`Added genre: ${name}`);
}

async function platformCreate(index, name, releaseYear, generation) {
  const platform = new Platform({ name, releaseYear, generation });

  await platform.save();

  platforms[index] = platform;

  console.log(`Added platform : ${platform}`);
}

async function publisherCreate(index, name, country, foundingYear, website) {
  const publisher = new Publisher({ name, country, foundingYear, website });

  await publisher.save();

  publishers[index] = publisher;

  console.log(`Added publisher : ${publisher}`);
}

async function createPlatforms() {
  console.log('Adding platforms');

  await Promise.all([
    platformCreate(0, 'PlayStation 4', new Date('2013'), '8th'),
    platformCreate(1, 'Xbox One', new Date('2013'), '8th'),
    platformCreate(2, 'Nintendo Switch', new Date('2017'), '8th'),
    platformCreate(3, 'Steam', new Date('2003'), 'PC'),
  ]);
}

async function createGenres() {
  console.log('Adding genres');
  await Promise.all([
    genreCreate(
      0,
      'Action',
      'Experience thrilling and intense gameplay with a focus on fast-paced combat and reaction-based challenges.'
    ),
    genreCreate(
      1,
      'Adventure',
      'Embark on a journey of exploration and discovery as you navigate through captivating narratives and immersive worlds.'
    ),
    genreCreate(
      2,
      'Rpg',
      'Immerse yourself in rich storytelling and character progression, where your choices influence the outcome of epic tales.'
    ),
    genreCreate(
      3,
      'Souls-like',
      'Test your skills in punishing battles and conquer challenging foes in games inspired by the demanding "Souls" series.'
    ),
    genreCreate(
      4,
      'Jrpg',
      'Engage in classic Japanese role-playing experiences, featuring turn-based combat, intricate plots, and colorful characters.'
    ),
    genreCreate(
      5,
      'Horror',
      'Face your deepest fears and unravel sinister mysteries in atmospheric and chilling horror settings.'
    ),
  ]);
}

async function createPublishers() {
  console.log('Adding publishers');
  await Promise.all([
    publisherCreate(
      0,
      'Rockstar Games',
      'United States',
      new Date('1998'),
      'https://www.rockstargames.com'
    ),
    publisherCreate(
      1,
      'Ubisoft',
      'France',
      new Date('1986'),
      'https://www.ubisoft.com'
    ),
    publisherCreate(
      2,
      'Electronic Arts',
      'United States',
      new Date('1982'),
      'https://www.ea.com'
    ),
    publisherCreate(
      3,
      'Square Enix',
      'Japan',
      new Date('1975'),
      'https://www.square-enix.com'
    ),
    publisherCreate(
      4,
      'CD Projekt Red',
      'Poland',
      new Date('1994'),
      'https://www.cdprojekt.com'
    ),
    publisherCreate(
      5,
      'FromSoftware',
      'Japan',
      new Date('1986'),
      'https://www.fromsoftware.jp'
    ),
  ]);
}

async function createGames() {
  console.log('Adding games');
  await Promise.all([
    gameCreate(
      0,
      'Dark Souls',
      [platforms[0], platforms[1]],
      [genres[3], genres[4]],
      publishers[5],
      20,
      60,
      'Venture into a dark and challenging world in this iconic action RPG, where your skills and strategy will determine your survival.'
    ),
    gameCreate(
      1,
      "Assassin's Creed Valhalla",
      [platforms[0], platforms[1], platforms[2], platforms[3]],
      [genres[0], genres[2]],
      publishers[1],
      40,
      100,
      "Embark on a Viking saga in this open-world adventure, where you'll forge alliances, lead raids, and build your settlement."
    ),
    gameCreate(
      2,
      'Final Fantasy VII Remake',
      [platforms[0], platforms[2]],
      [genres[2], genres[4]],
      publishers[3],
      30,
      80,
      'Experience the beloved JRPG with modern visuals and an enhanced combat system, retelling the story of Cloud and his companions.'
    ),
    gameCreate(
      3,
      'The Witcher 3: Wild Hunt',
      [platforms[0], platforms[1], platforms[3]],
      [genres[2], genres[0]],
      publishers[4],
      50,
      150,
      'Step into a vast open world as Geralt of Rivia, a monster hunter, in this award-winning RPG filled with rich storytelling and epic quests.'
    ),
    gameCreate(
      4,
      'Bloodborne',
      [platforms[0]],
      [genres[3], genres[5]],
      publishers[5],
      25,
      70,
      'Face nightmarish creatures and explore a Victorian-inspired city in this challenging action RPG from the creators of Dark Souls.'
    ),
  ]);
}
