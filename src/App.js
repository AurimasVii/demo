import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

// In defaultCategories, use public path for icons
const defaultCategories = [
  {
    key: 'swimming',
    name: 'Vandens pramogos',
    icon: '/icons/swimming.png',
    games: [
      {
        name: 'Vandens futbolas',
        description: 'Smagus žaidimas vandenyje su kamuoliu.',
        image: '/icons/swimming.png',
        price: '40€ / val.',
        info: 'Susitinkame prie pagrindinio ežero liepto. Instruktorius suteiks įrangą ir paaiškins taisykles.'
      },
      {
        name: 'Baidarės',
        description: 'Plaukimas baidarėmis upėje ar ežere.',
        image: '/icons/tools.png',
        price: '30€ / val.',
        info: 'Startas nuo upės prieplaukos. Visi dalyviai gauna gelbėjimosi liemenes ir instruktažą.'
      },
      {
        name: 'Vandens mūšis',
        description: 'Vandens ginklų mūšis vaikams ir suaugusiems.',
        image: '/icons/confetti.png',
        price: '25€ / val.',
        info: 'Renkamės prie vaikų žaidimų aikštelės. Vandens ginklai suteikiami vietoje.'
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
        image: '/icons/tools.png',
        price: '50€ / diena',
        info: 'Įranga pristatoma į jūsų pasirinktą vietą ir sumontuojama mūsų komandos.'
      },
      {
        name: 'Šviesos efektai',
        description: 'Įvairūs šviesos efektai šventėms.',
        image: '/icons/confetti.png',
        price: '35€ / vakaras',
        info: 'Šviesos efektai įrengiami prieš renginį, konsultuojame dėl geriausio išdėstymo.'
      },
      {
        name: 'Scenos nuoma',
        description: 'Mobilios scenos nuoma renginiams.',
        image: '/icons/park.png',
        price: '100€ / diena',
        info: 'Scena pristatoma ir surenkama jūsų nurodytoje vietoje.'
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
        image: '/icons/confetti.png',
        price: '60€ / vakaras',
        info: 'Renginys vyksta mūsų salėje arba jūsų pasirinktoje vietoje. Visi gauna dainų sąrašus.'
      },
      {
        name: 'Teminiai žaidimai',
        description: 'Teminiai žaidimai pagal jūsų pageidavimą.',
        image: '/icons/cinema.png',
        price: '45€ / val.',
        info: 'Žaidimų vedėjas atvyksta į jūsų šventę ir pasirūpina visomis priemonėmis.'
      },
      {
        name: 'Protų mūšis',
        description: 'Komandinis žinių turnyras.',
        image: '/icons/tools.png',
        price: '55€ / vakaras',
        info: 'Renginys vyksta kavinėje arba nuotoliniu būdu. Komandos registruojamos iš anksto.'
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
        image: '/icons/park.png',
        price: '20€ / žaidimas',
        info: 'Žaidimas vyksta parke, įranga suteikiama vietoje.'
      },
      {
        name: 'Petankė',
        description: 'Prancūziškas kamuoliukų žaidimas.',
        image: '/icons/swimming.png',
        price: '15€ / žaidimas',
        info: 'Petankės aikštelė įrengiama jūsų pasirinktoje vietoje.'
      },
      {
        name: 'Frisbis',
        description: 'Disko metimo žaidimas lauke.',
        image: '/icons/tools.png',
        price: '10€ / val.',
        info: 'Frisbis žaidžiamas stadione arba parke, diskai suteikiami.'
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
        image: '/icons/cinema.png',
        price: '12€ / val.',
        info: 'Stalo futbolas žaidžiamas mūsų patalpose arba pristatomas į jūsų šventę.'
      },
      {
        name: 'Stalo tenisas',
        description: 'Stalo tenisas dviems arba keturiems.',
        image: '/icons/swimming.png',
        price: '10€ / val.',
        info: 'Stalo teniso stalą galime pristatyti į jūsų pasirinktą vietą.'
      },
      {
        name: 'Karaoke',
        description: 'Dainuokite mėgstamas dainas.',
        image: '/icons/confetti.png',
        price: '30€ / vakaras',
        info: 'Karaoke įranga ir dainų sąrašai suteikiami vietoje.'
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
        image: '/icons/shooting-range.png',
        price: '25€ / val.',
        info: 'Šaudymo aikštelė įrengiama lauke, instruktorius prižiūri saugumą.'
      },
      {
        name: 'Šratasvydis',
        description: 'Komandinis šaudymo žaidimas.',
        image: '/icons/park.png',
        price: '40€ / žaidimas',
        info: 'Žaidimas vyksta specialioje aikštelėje, visa įranga suteikiama.'
      },
      {
        name: 'Dažasvydis',
        description: 'Spalvingas šaudymo žaidimas lauke.',
        image: '/icons/swimming.png',
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

// Helper: map category key to icon filename
const categoryIconMap = {
  swimming: '/icons/swimming.png',
  vandenspramogos: '/icons/swimming.png',
  tools: '/icons/tools.png',
  renginiuirangosnuoma: '/icons/tools.png',
  entertainment: '/icons/confetti.png',
  pramoguvedimas: '/icons/confetti.png',
  outside: '/icons/park.png',
  laukozaidimai: '/icons/park.png',
  inside: '/icons/cinema.png',
  vidauspramogos: '/icons/cinema.png',
  shooting: '/icons/shooting-range.png',
  saudymopramogos: '/icons/shooting-range.png',
};

// Helper: get icon for category (custom from localStorage if set, else fallback)
function getCategoryIcon(cat) {
  return cat.icon || categoryIconMap[cat.key] || categoryIconMap[cat.key.replace(/\s/g, '').toLowerCase()] || '/icons/confetti.png';
}

function App() {
  const [categories, setCategories] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutGame, setCheckoutGame] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]); // <-- Add this line
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [infoPage, setInfoPage] = useState(null);
  const [reservedTimes, setReservedTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  // Fetch activities from backend or fallback to defaultCategories
  useEffect(() => {
    async function fetchActivities() {
      setLoading(true);
      try {
        const res = await fetch('/api/activities');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setActivities(data);
          // Group by category
          const grouped = {};
          data.forEach(act => {
            if (!grouped[act.category]) grouped[act.category] = [];
            grouped[act.category].push(act);
          });
          const cats = Object.keys(grouped).map(catName => ({
            key: catName.replace(/\s/g, '').toLowerCase(),
            name: catName,
            icon: `/icons/${catName.replace(/\s/g, '').toLowerCase()}.png`,
            games: grouped[catName]
          }));
          setCategories(cats);
        } else {
          // Fallback to defaultCategories
          setCategories(defaultCategories);
        }
      } catch {
        setCategories(defaultCategories);
      }
      setLoading(false);
    }
    fetchActivities();
  }, []);

  // When checkoutGame or selectedDate changes, fetch reservations for that activity/date
  useEffect(() => {
    if (!checkoutGame || !selectedDate) return;
    fetch(`/api/reservations?activityId=${checkoutGame._id}&date=${selectedDate}`)
      .then(res => res.json())
      .then(reservations => {
        setReservedTimes(reservations.map(r => r.time));
      });
    // For demo: assume available times are every hour 10:00-20:00
    setAvailableTimes(Array.from({length:11},(_,i)=>`${(10+i).toString().padStart(2,'0')}:00`));
  }, [checkoutGame, selectedDate]);

  function handleReservationSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const reservation = {
      activityId: checkoutGame && checkoutGame._id,
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      date: form.date.value,
      time: form.time.value
    };
    fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reservation)
    })
      .then(res => res.json())
      .then(resp => {
        if (resp.error) {
          alert(resp.error);
          // Refetch reserved times after error to update UI
          if (checkoutGame && reservation.date) {
            fetch(`/api/reservations?activityId=${checkoutGame._id}&date=${reservation.date}`)
              .then(res => res.json())
              .then(reservations => {
                setReservedTimes(reservations.map(r => r.time));
              });
          }
        } else {
          alert('Rezervacija sėkmingai pateikta!');
          setCheckoutGame(null);
          // Refetch reserved times after success to update UI
          if (checkoutGame && reservation.date) {
            fetch(`/api/reservations?activityId=${checkoutGame._id}&date=${reservation.date}`)
              .then(res => res.json())
              .then(reservations => {
                setReservedTimes(reservations.map(r => r.time));
              });
          }
        }
      });
  }

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
          <a href="#" onClick={() => { setInfoPage('apie'); setSideMenuOpen(false); }} style={{textDecoration:'none',color:'#23272f',fontWeight:500}}>Apie mus</a>
          <a href="#" onClick={() => { setInfoPage('paslaugos'); setSideMenuOpen(false); }} style={{textDecoration:'none',color:'#23272f',fontWeight:500}}>Paslaugos</a>
          <a href="#" onClick={() => { setInfoPage('uzsakymai'); setSideMenuOpen(false); }} style={{textDecoration:'none',color:'#23272f',fontWeight:500}}>Užsakymai</a>
        </nav>
        <div style={{display:'flex',gap:'0.7em',marginBottom:'2em'}}>
          <a href="https://instagram.com/aurimasvi" target="_blank" rel="noopener noreferrer">
            <img src="/icons/instagram.png" alt="Instagram" className="SocialIcon" />
          </a>
          <a href="https://facebook.com/aurimas.vizinis" target="_blank" rel="noopener noreferrer">
            <img src="/icons/facebook.png" alt="Facebook" className="SocialIcon" />
          </a>
          <a href="https://mail.google.com/mail/?view=cm&to=aurimav05@gmail.com" target="_blank" rel="noopener noreferrer">
            <img src="/icons/mail.png" alt="Gmail" className="SocialIcon" />
          </a>
        </div>
        <div style={{borderTop:'1px solid #f2f4f8',margin:'1em 0'}}></div>
        <div style={{fontWeight:600,marginBottom:'0.7em',color:'#23272f'}}>Kategorijos</div>
        <div style={{display:'flex',flexDirection:'column',gap:'0.5em'}}>
          {categories.map(cat => {
            const iconSrc = getCategoryIcon(cat);
            return (
              <a
                key={cat.key}
                href={`#${cat.key}`}
                style={{display:'flex',alignItems:'center',gap:'0.7em',textDecoration:'none',color:'#0077ff',fontWeight:500,padding:'0.4em 0',borderRadius:'8px'}}
                onClick={() => setSideMenuOpen(false)}
              >
                <img
                  src={iconSrc}
                  alt={cat.name}
                  style={{width:32,height:32,borderRadius:8,objectFit:'contain',background:'#f8fafc'}}
                  onError={e => { e.target.onerror = null; e.target.src = '/icons/confetti.png'; }}
                />
                <span>{cat.name}</span>
              </a>
            );
          })}
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
        {categories.map(cat => {
          const iconSrc = getCategoryIcon(cat);
          return (
            <a
              key={cat.key}
              href={`#${cat.key}`}
              className="ActivityLink"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div>
                <img
                  src={iconSrc}
                  alt={cat.name}
                  className='SwimIcon'
                  onError={e => { e.target.onerror = null; e.target.src = '/icons/confetti.png'; }}
                />
                <p>{cat.name}</p>
              </div>
            </a>
          );
        })}
      </section>

      <main className="MainContent">
        <h2>Pramogų Paslaugos</h2>
        <p>Pasirinkite iš įvairių pramogų paslaugų, kurias siūlome:</p>
        {categories.map(cat => (
          <section key={cat.key} id={cat.key}>
            <h3>{cat.name}</h3>
            <ul className="GamesList">
              {cat.games.map(game => {
                // Show main image if set and present in images, else first image from images array, else fallback to game.image
                let mainImg = (game.mainImage && Array.isArray(game.images) && game.images.includes(game.mainImage))
                  ? game.mainImage
                  : (Array.isArray(game.images) && game.images.length > 0 ? game.images[0] : game.image);
                return (
                  <li
                    key={game.name}
                    className="GameCard"
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1.5em', padding: '1em 0' }}
                    onClick={() => setCheckoutGame({ ...game, images: game.images, image: mainImg, category: cat.name })}
                  >
                    <img src={mainImg} alt={game.name} style={{ width: 96, height: 96, borderRadius: 14, objectFit: 'cover', boxShadow: '0 2px 12px #eaf3ff' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: '#23272f', fontSize: '1.15em', marginBottom: '0.3em' }}>{game.name}</div>
                      <div style={{ color: '#0077ff', fontWeight: 600 }}>{game.price}</div>
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
                          transition: 'background 0.18s, transform 0.18s',
                          margin: '0 auto',
                          display: 'block'
                        }}onClick={e => {
                          e.stopPropagation();
                          // Store both _id and name for robust lookup in game-info.html
                          if (game._id) localStorage.setItem('selectedGameId', game._id);
                          localStorage.setItem('selectedGameName', game.name);
                          window.location.href = `/game-info.html?id=${encodeURIComponent(game._id || '')}&name=${encodeURIComponent(game.name)}`;
                        }}
                      >Daugiau informacijos</button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
        <p>Susisiekite su mumis dėl daugiau informacijos ir užsakymų.</p>
      </main>

      {checkoutGame && (
        <div className="CheckoutModal" onClick={() => setCheckoutGame(null)}>
          <div className="CheckoutContent" onClick={e => e.stopPropagation()} style={{maxWidth:480, width:'95vw', maxHeight:'90vh', overflowY:'auto', padding:'2em 1.5em', borderRadius:18, background:'#fff', boxShadow:'0 4px 32px rgba(0,119,255,0.10)', position:'relative', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <h2 style={{marginTop:0, color:'#0077ff', fontSize:'1.3em'}}>Rezervuoti: {checkoutGame.name}</h2>
            {checkoutGame.mainImage && (
              <img src={checkoutGame.mainImage} alt={checkoutGame.name} style={{maxWidth:'90%',maxHeight:180,borderRadius:12,marginBottom:'1em',objectFit:'cover',boxShadow:'0 2px 12px rgba(0,119,255,0.07)'}} />
            )}
            <form id="reservationForm" className="CheckoutForm" autoComplete="off" onSubmit={handleReservationSubmit}>
              <input type="text" name="name" placeholder="Jūsų vardas" required />
              <input type="email" name="email" placeholder="El. paštas" required />
              <input type="tel" name="phone" placeholder="Telefonas" required />
              {checkoutGame.hasQuantity && checkoutGame.quantity === 0 ? (
                <div style={{color:'#d32f2f',margin:'1em 0',fontWeight:600}}>Šiuo metu šios veiklos rezervuoti negalima</div>
                ) : (
                <>
                  <input type="date" name="date" required value={selectedDate} onChange={e=>setSelectedDate(e.target.value)} />
                  {selectedDate && (
                    <select name="time" required style={{marginTop:'0.3em'}} disabled={checkoutGame.hasQuantity && checkoutGame.quantity === 0}>
                      <option value="">Pasirinkite laiką</option>
                      {availableTimes.map(time => {
                        const isBooked = reservedTimes.filter(t=>t===time).length >= (checkoutGame.hasQuantity ? checkoutGame.quantity : 1);
                        return <option key={time} value={time} disabled={isBooked || (checkoutGame.hasQuantity && checkoutGame.quantity === 0)}>{time}{isBooked || (checkoutGame.hasQuantity && checkoutGame.quantity === 0) ? ' (užimta)' : ''}</option>;
                      })}
                    </select>
                  )}
                  <button type="submit" style={{background:'#0077ff',color:'#fff',border:'none',borderRadius:'8px',padding:'0.7em 2em',fontSize:'1em',fontWeight:500,marginTop:'0.7em'}} disabled={checkoutGame.hasQuantity && checkoutGame.quantity === 0}>Rezervuoti</button>
                </>
              )}
            </form>
            <div style={{ marginTop: '1.5em', width:'100%', display:'flex', justifyContent:'center' }}>
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
                  transition: 'background 0.18s, transform 0.18s',
                  margin: '0 auto',
                  display: 'block'
                }}
                onClick={e => {
                  e.stopPropagation();
                  // Store both _id, name, and images for robust lookup in game-info.html
                  if (checkoutGame._id) localStorage.setItem('selectedGameId', checkoutGame._id);
                  localStorage.setItem('selectedGameName', checkoutGame.name);
                  if (checkoutGame.images && Array.isArray(checkoutGame.images)) {
                    localStorage.setItem('selectedGameImages', JSON.stringify(checkoutGame.images));
                  } else {
                    localStorage.removeItem('selectedGameImages');
                  }
                  window.location.href = `/game-info.html?id=${encodeURIComponent(checkoutGame._id || '')}&name=${encodeURIComponent(checkoutGame.name)}`;
                }}
              >Daugiau informacijos</button>
            </div>
          </div>
        </div>
      )}
      <footer className="Footer">
        <div className="FooterLinks">
          <a href="#" onClick={() => setInfoPage('kontaktai')}>Kontaktai</a>
          <a href="#" onClick={() => setInfoPage('privatumas')}>Privatumo politika</a>
          <a href="#" onClick={() => setInfoPage('taisykles')}>Naudojimosi taisyklės</a>
        </div>
        <p>&copy; Įmonės Pavadinimas</p>
      </footer>

      {/* Info pages modal */}
      {infoPage && (
        <div className="CheckoutModal" onClick={() => setInfoPage(null)}>
          <div className="CheckoutContent" onClick={e => e.stopPropagation()} style={{maxWidth:480, width:'95vw', maxHeight:'90vh', overflowY:'auto', padding:'2em 1.5em', borderRadius:18, background:'#fff', boxShadow:'0 4px 32px rgba(0,119,255,0.10)', position:'relative', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <button className="CloseBtn" onClick={() => setInfoPage(null)} style={{position:'absolute',top:18,right:18,fontSize:'2em',background:'none',border:'none',color:'#bbb',cursor:'pointer'}}>&times;</button>
            {infoPage === 'apie' && (
              <><h2>Apie mus</h2><p>Esame pramogų ir renginių organizavimo komanda, siekianti suteikti nepamirštamų įspūdžių visiems savo klientams. Mūsų tikslas – padėti žmonėms atrasti naujas veiklas, patirti nuotykių ir kurti bendrystės akimirkas.</p></>
            )}
            {infoPage === 'paslaugos' && (
              <><h2>Paslaugos</h2><p>Siūlome įvairias pramogas, renginių įrangos nuomą, žaidimų vedimą, lauko ir vidaus žaidimus, šaudymo pramogas bei kitas paslaugas tiek vaikams, tiek suaugusiems.</p></>
            )}
            {infoPage === 'uzsakymai' && (
              <><h2>Užsakymai</h2><p>Norėdami užsisakyti paslaugą ar rezervuoti veiklą, pasirinkite norimą žaidimą ir užpildykite rezervacijos formą. Gavę užklausą, su jumis susisieksime patvirtinti užsakymą.</p></>
            )}
            {infoPage === 'kontaktai' && (
              <><h2>Kontaktai</h2><p>El. paštas: <a href="mailto:aurimav05@gmail.com">aurimav05@gmail.com</a><br />Instagram: <a href="https://instagram.com/aurimasvi" target="_blank" rel="noopener noreferrer">@aurimasvi</a><br />Facebook: <a href="https://facebook.com/aurimas.vizinis" target="_blank" rel="noopener noreferrer">Aurimas Vižinis</a></p></>
            )}
            {infoPage === 'privatumas' && (
              <><h2>Privatumo politika</h2><p>Jūsų asmens duomenys yra saugūs ir naudojami tik užsakymų administravimui bei komunikacijai. Duomenys neperduodami trečiosioms šalims be jūsų sutikimo.</p></>
            )}
            {infoPage === 'taisykles' && (
              <><h2>Naudojimosi taisyklės</h2><p>Naudodamiesi svetaine, sutinkate su mūsų paslaugų teikimo sąlygomis. Prašome atsakingai pateikti savo duomenis ir laikytis nurodytų rezervacijos bei dalyvavimo taisyklių.</p></>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

