const packages = [
  {id:1, robux:500, price:15, icon:'💰'},
  {id:2, robux:1000, price:28, icon:'💎', popular:true},
  {id:3, robux:2500, price:69, icon:'🏆'},
  {id:4, robux:5000, price:135, icon:'👑'},
  {id:5, robux:10000, price:259, icon:'🌟', popular:true},
  {id:6, robux:25000, price:625, icon:'🔥'}
];

const packagesGrid = document.getElementById('packagesGrid');
const modal = document.getElementById('orderModal');
const closeModal = document.getElementById('closeModal');
const paymentDescriptions = {
  whatsapp:"Message our WhatsApp support to pay instantly via bank transfer or wallet. We'll confirm your payment within minutes.",
  discord:"Chat with @RuboxSupport on Discord to pay via gifts or manual transfer. We'll guide you every step."
};
let selectedPackage = null;

if(packagesGrid){
  packages.forEach(pkg => {
    const card = document.createElement('article');
    card.className = 'package-card';
    card.dataset.pkg = pkg.id;
    card.innerHTML = `
      ${pkg.popular ? '<div class="popular-badge">POPULAR</div>' : ''}
      <div class="package-icon">${pkg.icon}</div>
      <h3 class="package-title">${pkg.robux.toLocaleString()} Robux</h3>
      <div class="package-price">${pkg.price} SAR</div>
      <ul class="package-features">
        <li><span class="feature-check">✓</span> Instant delivery</li>
        <li><span class="feature-check">✓</span> 100% Safe</li>
        <li><span class="feature-check">✓</span> 24/7 Support</li>
      </ul>
      <button class="btn-order" type="button">Order Now</button>
    `;
    packagesGrid.appendChild(card);
  });

  packagesGrid.addEventListener('click', e => {
    const card = e.target.closest('.package-card');
    if(!card) return;
    const pkg = packages.find(item => item.id === Number(card.dataset.pkg));
    if(!pkg) return;
    selectedPackage = pkg;
    document.getElementById('selectedPackage').value = `${pkg.robux.toLocaleString()} Robux`;
    document.getElementById('packagePrice').value = `${pkg.price} SAR`;
    document.getElementById('robloxUsername').value = '';
    document.querySelectorAll('.payment-option').forEach(option => {
      const isWhatsApp = option.querySelector('input').value === 'whatsapp';
      option.classList.toggle('active', isWhatsApp);
      option.querySelector('input').checked = isWhatsApp;
    });
    document.getElementById('paymentDetails').textContent = paymentDescriptions.whatsapp;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
  });

  closeModal.addEventListener('click', () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
  });

  document.getElementById('paymentOptions').addEventListener('click', e => {
    const choice = e.target.closest('.payment-option');
    if(!choice) return;
    document.querySelectorAll('.payment-option').forEach(opt => opt.classList.remove('active'));
    choice.classList.add('active');
    const input = choice.querySelector('input');
    input.checked = true;
    document.getElementById('paymentDetails').textContent = paymentDescriptions[input.value];
  });

  document.getElementById('confirmOrder').addEventListener('click', () => {
    if(!selectedPackage){
      alert('Please choose a package first.');
      return;
    }
    const username = document.getElementById('robloxUsername').value.trim();
    if(!username){
      alert('Please enter your Roblox username.');
      return;
    }
    const method = document.querySelector('input[name="paymentOption"]:checked').value;
    const msg = encodeURIComponent(`Hello! I want to order ${selectedPackage.robux} Robux for ${selectedPackage.price} SAR.\nRoblox Username: ${username}`);
    if(method === 'whatsapp'){
      window.open(`https://wa.me/966500575117?text=${msg}`,'_blank');
    }else{
      window.open('https://discord.gg/rubox','_blank');
      alert('Send this info to the Discord banker:\n' + decodeURIComponent(msg));
    }
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
  });
}

