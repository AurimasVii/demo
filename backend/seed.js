// Script to seed the database with activities from defaultCategories
const mongoose = require('mongoose');
require('dotenv').config();

const Activity = mongoose.model('Activity', new mongoose.Schema({
  name: String,
  description: String,
  images: [String],
  price: String,
  info: String,
  category: String,
  mainImage: String,
  hasQuantity: { type: Boolean, default: false },
  quantity: { type: Number, default: 1 }
}));

const defaultCategories = [
  {
    key: 'swimming',
    name: 'Vandens pramogos',
    icon: '/icons/swimming.png',
    games: [
      {
        name: 'Vandens futbolas',
        description: 'Smagus žaidimas vandenyje su kamuoliu.',
        images: ['/icons/swimming.png'],
        price: '40€ / val.',
        info: 'Susitinkame prie pagrindinio ežero liepto. Instruktorius suteiks įrangą ir paaiškins taisykles.',
        category: 'Vandens pramogos'
      },
      {
        name: 'Baidarės',
        description: 'Plaukimas baidarėmis upėje ar ežere.',
        images: ['/icons/tools.png'],
        price: '30€ / val.',
        info: 'Startas nuo upės prieplaukos. Visi dalyviai gauna gelbėjimosi liemenes ir instruktažą.',
        category: 'Vandens pramogos'
      },
      {
        name: 'Vandens mūšis',
        description: 'Vandens ginklų mūšis vaikams ir suaugusiems.',
        images: ['/icons/confetti.png'],
        price: '25€ / val.',
        info: 'Renkamės prie vaikų žaidimų aikštelės. Vandens ginklai suteikiami vietoje.',
        category: 'Vandens pramogos'
      }
    ]
  },
  {
    key: 'tools',
    name: 'Renginių įrangos nuoma',
    icon: '/icons/tools.png',
    games: [
      {
        name: 'Garso aparatūra',
        description: 'Profesionali garso įranga jūsų renginiui.',
        images: ['/icons/tools.png'],
        price: '50€ / diena',
        info: 'Įranga pristatoma į jūsų pasirinktą vietą ir sumontuojama mūsų komandos.',
        category: 'Renginių įrangos nuoma'
      },
      {
        name: 'Šviesos efektai',
        description: 'Įvairūs šviesos efektai šventėms.',
        images: ['/icons/confetti.png'],
        price: '35€ / vakaras',
        info: 'Šviesos efektai įrengiami prieš renginį, konsultuojame dėl geriausio išdėstymo.',
        category: 'Renginių įrangos nuoma'
      },
      {
        name: 'Scenos nuoma',
        description: 'Mobilios scenos nuoma renginiams.',
        images: ['/icons/park.png'],
        price: '100€ / diena',
        info: 'Scena pristatoma ir surenkama jūsų nurodytoje vietoje.',
        category: 'Renginių įrangos nuoma'
      }
    ]
  },
  {
    key: 'entertainment',
    name: 'Pramogų vedimas',
    icon: '/icons/confetti.png',
    games: [
      {
        name: 'Karaoke vakaras',
        description: 'Linksmas karaoke vakaras su draugais.',
        images: ['/icons/confetti.png'],
        price: '60€ / vakaras',
        info: 'Renginys vyksta mūsų salėje arba jūsų pasirinktoje vietoje. Visi gauna dainų sąrašus.',
        category: 'Pramogų vedimas'
      },
      {
        name: 'Teminiai žaidimai',
        description: 'Teminiai žaidimai pagal jūsų pageidavimą.',
        images: ['/icons/cinema.png'],
        price: '45€ / val.',
        info: 'Žaidimų vedėjas atvyksta į jūsų šventę ir pasirūpina visomis priemonėmis.',
        category: 'Pramogų vedimas'
      },
      {
        name: 'Protų mūšis',
        description: 'Komandinis žinių turnyras.',
        images: ['/icons/tools.png'],
        price: '55€ / vakaras',
        info: 'Renginys vyksta kavinėje arba nuotoliniu būdu. Komandos registruojamos iš anksto.',
        category: 'Pramogų vedimas'
      }
    ]
  },
  {
    key: 'outside',
    name: 'Lauko žaidimai',
    icon: '/icons/park.png',
    games: [
      {
        name: 'Kubb',
        description: 'Skandinaviškas lauko žaidimas visai šeimai.',
        images: ['/icons/park.png'],
        price: '20€ / žaidimas',
        info: 'Žaidimas vyksta parke, įranga suteikiama vietoje.',
        category: 'Lauko žaidimai'
      },
      {
        name: 'Petankė',
        description: 'Prancūziškas kamuoliukų žaidimas.',
        images: ['/icons/swimming.png'],
        price: '15€ / žaidimas',
        info: 'Petankės aikštelė įrengiama jūsų pasirinktoje vietoje.',
        category: 'Lauko žaidimai'
      },
      {
        name: 'Frisbis',
        description: 'Disko metimo žaidimas lauke.',
        images: ['/icons/tools.png'],
        price: '10€ / val.',
        info: 'Frisbis žaidžiamas stadione arba parke, diskai suteikiami.',
        category: 'Lauko žaidimai'
      }
    ]
  },
  {
    key: 'inside',
    name: 'Vidaus pramogos',
    icon: '/icons/cinema.png',
    games: [
      {
        name: 'Stalo futbolas',
        description: 'Klasikinis stalo futbolo žaidimas.',
        images: ['/icons/cinema.png'],
        price: '12€ / val.',
        info: 'Stalo futbolas žaidžiamas mūsų patalpose arba pristatomas į jūsų šventę.',
        category: 'Vidaus pramogos'
      },
      {
        name: 'Stalo tenisas',
        description: 'Stalo tenisas dviems arba keturiems.',
        images: ['/icons/swimming.png'],
        price: '10€ / val.',
        info: 'Stalo teniso stalą galime pristatyti į jūsų pasirinktą vietą.',
        category: 'Vidaus pramogos'
      },
      {
        name: 'Karaoke',
        description: 'Dainuokite mėgstamas dainas.',
        images: ['/icons/confetti.png'],
        price: '30€ / vakaras',
        info: 'Karaoke įranga ir dainų sąrašai suteikiami vietoje.',
        category: 'Vidaus pramogos'
      }
    ]
  },
  {
    key: 'shooting',
    name: 'Šaudymo pramogos',
    icon: '/icons/shooting-range.png',
    games: [
      {
        name: 'Lankų šaudymas',
        description: 'Išbandykite taiklumą su lanku.',
        images: ['/icons/shooting-range.png'],
        price: '25€ / val.',
        info: 'Šaudymo aikštelė įrengiama lauke, instruktorius prižiūri saugumą.',
        category: 'Šaudymo pramogos'
      },
      {
        name: 'Šratasvydis',
        description: 'Komandinis šaudymo žaidimas.',
        images: ['/icons/park.png'],
        price: '40€ / žaidimas',
        info: 'Žaidimas vyksta specialioje aikštelėje, visa įranga suteikiama.',
        category: 'Šaudymo pramogos'
      },
      {
        name: 'Dažasvydis',
        description: 'Spalvingas šaudymo žaidimas lauke.',
        images: ['/icons/swimming.png'],
        price: '50€ / žaidimas',
        info: 'Dažasvydžio rungtynės organizuojamos miške arba aikštelėje, apranga ir kamuoliukai įskaičiuoti.',
        category: 'Šaudymo pramogos'
      }
    ]
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Activity.deleteMany({});
  let all = [];
  for (const cat of defaultCategories) {
    for (const game of cat.games) {
      all.push({ ...game, category: cat.name, mainImage: game.images && game.images.length > 0 ? game.images[0] : '' });
    }
  }
  await Activity.insertMany(all);
  console.log('Seeded activities!');
  process.exit();
}

seed();
