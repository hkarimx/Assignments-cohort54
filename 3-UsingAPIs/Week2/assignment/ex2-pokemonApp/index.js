/* Exercise 2 – simple & functional */



async function fetchData(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } catch (err) {
    console.error('Fetch error:', err);
    throw err;
  }
}

async function fetchAndPopulatePokemons(select, listUrl) {
  select.disabled = true;
  select.innerHTML = '';
  const loadingOpt = document.createElement('option');
  loadingOpt.value = '';
  loadingOpt.textContent = 'Loading…';
  select.appendChild(loadingOpt);

  const { results } = await fetchData(listUrl);

  select.innerHTML = '';
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = 'Choose a Pokémon…';
  select.appendChild(placeholder);

  results.forEach((p) => {
    const opt = document.createElement('option');
    opt.value = p.url;
    opt.textContent = p.name;
    select.appendChild(opt);
  });

  select.disabled = false;
}

async function fetchImage(img, detailsUrl) {
  if (!detailsUrl) return;

  img.alt = 'Loading…';
  img.src = '';

  const d = await fetchData(detailsUrl);
  const src =
    d.sprites?.other?.['official-artwork']?.front_default ||
    d.sprites?.front_default;

  if (src) {
    img.src = src;
    img.alt = d.name;
  } else {
    img.alt = 'No image available';
  }
}

async function main() {

  const LIST_URL = 'https://pokeapi.co/api/v2/pokemon?limit=151';

  const btn = document.createElement('button');
  btn.textContent = 'Get Pokémon!';
  const select = document.createElement('select');
  select.disabled = true;
  const img = document.createElement('img');
  img.style.maxWidth = '280px';

  document.body.append(btn, select, img);

  btn.addEventListener('click', async () => {
    btn.disabled = true;
    try {
      await fetchAndPopulatePokemons(select, LIST_URL);
    } catch {
      alert('Could not load list (see console).');
    } finally {
      btn.disabled = false;
    }
  });

  select.addEventListener('change', (e) => fetchImage(img, e.target.value));
}

window.addEventListener('load', main);
