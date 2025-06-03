import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import swimming from './icons/swimming.png';
import tools from './icons/tools.png';
import entertainment from './icons/confetti.png';
import outside from './icons/park.png';
import inside from './icons/cinema.png';
import shooting from './icons/shooting-range.png';
import insta from './icons/instagram.png';
import facebook from './icons/facebook.png';
import gmail from './icons/mail.png';

// Example images for games 
import game1 from './icons/swimming.png';
import game2 from './icons/tools.png';
import game3 from './icons/confetti.png';

const defaultCategories = [
  {
    key: 'swimming',
    name: 'Vandens pramogos',
    icon: swimming,
    games: [
      {
        name: 'Vandens futbolas',
        description: 'Smagus žaidimas vandenyje su kamuoliu.',
        image: game1,
        price: '40€ / val.',
        info: 'Susitinkame prie pagrindinio ežero liepto. Instruktorius suteiks įrangą ir paaiškins taisykles.'
      },
      {
        name: 'Baidarės',
        description: 'Plaukimas baidarėmis upėje ar ežere.',
        image: game2,
        price: '30€ / val.',
        info: 'Startas nuo upės prieplaukos. Visi dalyviai gauna gelbėjimosi liemenes ir instruktažą.'
      },
      {
        name: 'Vandens mūšis',
        description: 'Vandens ginklų mūšis vaikams ir suaugusiems.',
        image: game3,
        price: '25€ / val.',
        info: 'Renkamės prie vaikų žaidimų aikštelės. Vandens ginklai suteikiami vietoje.'
      }
    ]
  },
  {
    key: 'tools',
    name: 'Renginių įrangos nuoma',
    icon: tools,
    games: [
      {
        name: 'Garso aparatūra',
        description: 'Profesionali garso įranga jūsų renginiui.',
        image: tools,
        price: '50€ / diena',
        info: 'Įranga pristatoma į jūsų pasirinktą vietą ir sumontuojama mūsų komandos.'
      },
      {
        name: 'Šviesos efektai',
        description: 'Įvairūs šviesos efektai šventėms.',
        image: entertainment,
        price: '35€ / vakaras',
        info: 'Šviesos efektai įrengiami prieš renginį, konsultuojame dėl geriausio išdėstymo.'
      },
      {
        name: 'Scenos nuoma',
        description: 'Mobilios scenos nuoma renginiams.',
        image: outside,
        price: '100€ / diena',
        info: 'Scena pristatoma ir surenkama jūsų nurodytoje vietoje.'
      }
    ]
  },
  {
    key: 'entertainment',
    name: 'Pramogų vedimas',
    icon: entertainment,
    games: [
      {
        name: 'Karaoke vakaras',
        description: 'Linksmas karaoke vakaras su draugais.',
        image: entertainment,
        price: '60€ / vakaras',
        info: 'Renginys vyksta mūsų salėje arba jūsų pasirinktoje vietoje. Visi gauna dainų sąrašus.'
      },
      {
        name: 'Teminiai žaidimai',
        description: 'Teminiai žaidimai pagal jūsų pageidavimą.',
        image: inside,
        price: '45€ / val.',
        info: 'Žaidimų vedėjas atvyksta į jūsų šventę ir pasirūpina visomis priemonėmis.'
      },
      {
        name: 'Protų mūšis',
        description: 'Komandinis žinių turnyras.',
        image: tools,
        price: '55€ / vakaras',
        info: 'Renginys vyksta kavinėje arba nuotoliniu būdu. Komandos registruojamos iš anksto.'
      }
    ]
  },
  {
    key: 'outside',
    name: 'Lauko žaidimai',
    icon: outside,
    games: [
      {
        name: 'Kubb',
        description: 'Skandinaviškas lauko žaidimas visai šeimai.',
        image: outside,
        price: '20€ / žaidimas',
        info: 'Žaidimas vyksta parke, įranga suteikiama vietoje.'
      },
      {
        name: 'Petankė',
        description: 'Prancūziškas kamuoliukų žaidimas.',
        image: swimming,
        price: '15€ / žaidimas',
        info: 'Petankės aikštelė įrengiama jūsų pasirinktoje vietoje.'
      },
      {
        name: 'Frisbis',
        description: 'Disko metimo žaidimas lauke.',
        image: tools,
        price: '10€ / val.',
        info: 'Frisbis žaidžiamas stadione arba parke, diskai suteikiami.'
      }
    ]
  },
  {
    key: 'inside',
    name: 'Vidaus pramogos',
    icon: inside,
    games: [
      {
        name: 'Stalo futbolas',
        description: 'Klasikinis stalo futbolo žaidimas.',
        image: inside,
        price: '12€ / val.',
        info: 'Stalo futbolas žaidžiamas mūsų patalpose arba pristatomas į jūsų šventę.'
      },
      {
        name: 'Stalo tenisas',
        description: 'Stalo tenisas dviems arba keturiems.',
        image: swimming,
        price: '10€ / val.',
        info: 'Stalo teniso stalą galime pristatyti į jūsų pasirinktą vietą.'
      },
      {
        name: 'Karaoke',
        description: 'Dainuokite mėgstamas dainas.',
        image: entertainment,
        price: '30€ / vakaras',
        info: 'Karaoke įranga ir dainų sąrašai suteikiami vietoje.'
      }
    ]
  },
  {
    key: 'shooting',
    name: 'Šaudymo pramogos',
    icon: shooting,
    games: [
      {
        name: 'Lankų šaudymas',
        description: 'Išbandykite taiklumą su lanku.',
        image: shooting,
        price: '25€ / val.',
        info: 'Šaudymo aikštelė įrengiama lauke, instruktorius prižiūri saugumą.'
      },
      {
        name: 'Šratasvydis',
        description: 'Komandinis šaudymo žaidimas.',
        image: outside,
        price: '40€ / žaidimas',
        info: 'Žaidimas vyksta specialioje aikštelėje, visa įranga suteikiama.'
      },
      {
        name: 'Dažasvydis',
        description: 'Spalvingas šaudymo žaidimas lauke.',
        image: swimming,
        price: '50€ / žaidimas',
        info: 'Dažasvydžio rungtynės organizuojamos miške arba aikštelėje, apranga ir kamuoliukai įskaičiuoti.'
      }
    ]
  }
];

function getCategories() {
  const stored = localStorage.getItem('categories');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultCategories;
    }
  }
  return defaultCategories;
}

function setCategories(newCategories) {
  localStorage.setItem('categories', JSON.stringify(newCategories));
}

function App() {
  const [categories, setCategoriesState] = useState(getCategories());
  const [checkoutGame, setCheckoutGame] = useState(null);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  // Keep localStorage in sync if categories change
  React.useEffect(() => {
    setCategories(categories);
  }, [categories]);

  return (
    <div className="App">
      {/* Side Menu Toggle Button */}
      <button
        className="SideMenuToggle"
        onClick={() => setSideMenuOpen(true)}
        style={{position:'fixed',top:20,left:20,zIndex:1100,background:'#0077ff',color:'#fff',border:'none',borderRadius:'50%',width:44,height:44,fontSize:'1.7em',cursor:'pointer',boxShadow:'0 2px 8px rgba(0,119,255,0.10)'}}
        aria-label="Atidaryti meniu"
      >&#9776;</button>

      {/* Side Menu Drawer */}
      <div className={`SideMenuDrawer${sideMenuOpen ? ' open' : ''}`} style={{position:'fixed',top:0,left:0,height:'100vh',width:270,background:'#fff',boxShadow:'2px 0 16px rgba(0,0,0,0.08)',zIndex:1200,transform:sideMenuOpen?'translateX(0)':'translateX(-110%)',transition:'transform 0.25s',display:'flex',flexDirection:'column',padding:'2em 1.2em 1em 1.2em'}}>
        <button
          onClick={() => setSideMenuOpen(false)}
          style={{position:'absolute',top:18,right:18,background:'none',border:'none',fontSize:'2em',color:'#bbb',cursor:'pointer'}}
          aria-label="Uždaryti meniu"
        >&times;</button>
        <div style={{display:'flex',alignItems:'center',gap:'1em',marginBottom:'1.5em'}}>
          <img src={logo} alt="Logo" style={{width:44,height:44,borderRadius:12}} />
          <span style={{fontWeight:600,fontSize:'1.2em',color:'#0077ff'}}>Įmonės Pavadinimas</span>
        </div>
        <nav style={{display:'flex',flexDirection:'column',gap:'0.7em',marginBottom:'2em'}}>
          <a href="#" style={{textDecoration:'none',color:'#23272f',fontWeight:500}}>Apie mus</a>
          <a href="#" style={{textDecoration:'none',color:'#23272f',fontWeight:500}}>Paslaugos</a>
          <a href="#" style={{textDecoration:'none',color:'#23272f',fontWeight:500}}>Užsakymai</a>
        </nav>
        <div style={{display:'flex',gap:'0.7em',marginBottom:'2em'}}>
          <img src={insta} alt="Instagram" className="SocialIcon" />
          <img src={facebook} alt="Facebook" className="SocialIcon" />
          <img src={gmail} alt="Gmail" className="SocialIcon" />
        </div>
        <div style={{borderTop:'1px solid #f2f4f8',margin:'1em 0'}}></div>
        <div style={{fontWeight:600,marginBottom:'0.7em',color:'#23272f'}}>Kategorijos</div>
        <div style={{display:'flex',flexDirection:'column',gap:'0.5em'}}>
          {categories.map(cat => (
            <a
              key={cat.key}
              href={`#${cat.key}`}
              style={{display:'flex',alignItems:'center',gap:'0.7em',textDecoration:'none',color:'#0077ff',fontWeight:500,padding:'0.4em 0',borderRadius:'8px'}}
              onClick={() => setSideMenuOpen(false)}
            >
              <img src={cat.icon} alt={cat.name} style={{width:32,height:32,borderRadius:8,objectFit:'contain',background:'#f8fafc'}} />
              <span>{cat.name}</span>
            </a>
          ))}
        </div>
      </div>
      {/* Overlay for side menu */}
      {sideMenuOpen && <div className="SideMenuOverlay" onClick={() => setSideMenuOpen(false)} style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(30,40,60,0.10)',zIndex:1199}}></div>}

      {/* Inspo section: what motivated us to create this page */}
      <section className="InspoSection" style={{maxWidth:700,margin:'2.5em auto 2em auto',padding:'1.5em',background:'#f7faff',borderRadius:'18px',boxShadow:'0 2px 12px rgba(0,119,255,0.04)',display:'flex',alignItems:'center',gap:'2em',flexWrap:'wrap'}}>
        <img src={logo} alt="Inspiration" style={{width:90,height:90,borderRadius:'16px',objectFit:'cover',background:'#eaf3ff',flexShrink:0}} />
        <div>
          <h2 style={{margin:'0 0 0.5em 0',color:'#0077ff',fontWeight:700,fontSize:'1.3em'}}>Kas mus įkvėpė?</h2>
          <p style={{margin:0,color:'#23272f',fontSize:'1.08em',lineHeight:1.6}}>
            Šią svetainę sukūrėme, nes norime dalintis džiaugsmu, pramogomis ir bendrystės akimirkomis su visais. Mūsų tikslas – padėti žmonėms atrasti naujas veiklas, patirti nuotykių ir kurti nepamirštamus prisiminimus kartu. Tikime, kad kiekvienas gali rasti sau tinkamą pramogą ir smagiai praleisti laiką!
          </p>
        </div>
      </section>

      {/* Category links at the top of the main screen */}
      <section className="Activities">
        {categories.map(cat => (
          <a
            key={cat.key}
            href={`#${cat.key}`}
            className="ActivityLink"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div>
              <img src={cat.icon} alt={cat.name} className='SwimIcon'/>
              <p>{cat.name}</p>
            </div>
          </a>
        ))}
      </section>

      <main className="MainContent">
        <h2>Pramogų Paslaugos</h2>
        <p>Pasirinkite iš įvairių pramogų paslaugų, kurias siūlome:</p>
        {categories.map(cat => (
          <section key={cat.key} id={cat.key}>
            <h3>{cat.name}</h3>
            <ul className="GamesList">
              {cat.games.map(game => (
                <li
                  key={game.name}
                  className="GameCard"
                  style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1em' }}
                  onClick={() => setCheckoutGame({ ...game, category: cat.name })}
                >
                  <img src={game.image} alt={game.name} style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontWeight: 600, color: '#23272f' }}>{game.name}</div>
                    <div style={{ fontSize: '0.97em', color: '#555' }}>{game.description}</div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <p>Susisiekite su mumis dėl daugiau informacijos ir užsakymų.</p>
      </main>

      {checkoutGame && (
        <div className="CheckoutModal" onClick={() => setCheckoutGame(null)}>
          <div className="CheckoutContent" onClick={e => e.stopPropagation()}>
            <button className="CloseBtn" onClick={() => setCheckoutGame(null)}>&times;</button>
            <h2>Užsakymas: {checkoutGame.name}</h2>
            <div style={{ marginBottom: '1em', color: '#888', fontSize: '1em' }}>{checkoutGame.category}</div>
            <img src={checkoutGame.image} alt={checkoutGame.name} style={{ width: 80, height: 80, borderRadius: 12, objectFit: 'cover', margin: '1em auto' }} />
            <div style={{ marginBottom: '0.5em', color: '#444' }}>{checkoutGame.description}</div>
            <div style={{ marginBottom: '0.5em', color: '#0077ff', fontWeight: 600 }}>Kaina: {checkoutGame.price}</div>
            <div style={{ marginBottom: '1.5em', color: '#555', fontSize: '0.98em' }}>{checkoutGame.info}</div>
            <div style={{ marginBottom: '2.0em'}}>
              <button
                type="button"
                className="CheckoutInfoBtn"
                style={{
                  background: '#0077ff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.7em 2em',
                  fontSize: '1em',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'background 0.18s, transform 0.18s'
                }}
                onClick={() => {
                  localStorage.setItem('selectedGame', JSON.stringify(checkoutGame));
                  window.open('/game-info.html', '_blank');
                }}
              >Daugiau informacijos</button>
            </div>
            <form className="CheckoutForm">
              <input type="text" placeholder="Jūsų vardas" required />
              <input type="email" placeholder="El. paštas" required />
              <input type="tel" placeholder="Telefonas" required />
              <button type="submit">Patvirtinti užsakymą</button>
            </form>
          </div>
        </div>
      )}
      <footer className="Footer">
        <div className="FooterLinks">
          <a href="#">Kontaktai</a>
          <a href="#">Privatumo politika</a>
          <a href="#">Naudojimosi taisyklės</a>
        </div>
        <p>&copy; Įmonės Pavadinimas</p>
      </footer>
    </div>
  );
}

export default App;