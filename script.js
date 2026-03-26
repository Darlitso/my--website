function toggleDropdown() {
  var content = document.getElementById('dropdownContent');
  content.classList.toggle('open');
}

// Toggle account/avatar dropdown
function toggleAccountMenu() {
  var dropdown = document.getElementById('accountDropdown');
  var btn = document.getElementById('avatarBtn');
  dropdown.classList.toggle('open');
  btn.classList.toggle('active');
}

// Close dropdowns when clicking outside
document.addEventListener('click', function (e) {
  var menu = document.getElementById('dropdownMenu');
  if (!menu.contains(e.target)) {
    document.getElementById('dropdownContent').classList.remove('open');
  }

  var accountMenu = document.getElementById('accountMenu');
  if (accountMenu && !accountMenu.contains(e.target)) {
    document.getElementById('accountDropdown').classList.remove('open');
    document.getElementById('avatarBtn').classList.remove('active');
  }
});

// Scroll category tabs — one page at a time, one arrow visible at a time
function scrollTabsRight() {
  var tabs = document.getElementById('categoryTabs');
  var scrollAmount = tabs.clientWidth;
  tabs.scrollBy({ left: scrollAmount, behavior: 'smooth' });

  // Wait for scroll to finish, then update arrows
  setTimeout(function () {
    updateScrollArrows();
  }, 400);
}

//scroll arrows
function scrollTabsLeft() {
  var tabs = document.getElementById('categoryTabs');
  var scrollAmount = tabs.clientWidth;
  tabs.scrollBy({ left: -scrollAmount, behavior: 'smooth' });

  setTimeout(function () {
    updateScrollArrows();
  }, 400);
}

function updateScrollArrows() {
  var tabs = document.getElementById('categoryTabs');
  var atStart = tabs.scrollLeft <= 0;
  var atEnd = tabs.scrollLeft + tabs.clientWidth >= tabs.scrollWidth - 1;

  document.getElementById('scrollLeft').style.display = atStart ? 'none' : '';
  document.getElementById('scrollRight').style.display = atEnd ? 'none' : '';
}

// Switch category — show matching car cards, highlight active tab
function switchCategory(btn) {
  var category = btn.getAttribute('data-category');

  // Update active tab
  var allTabs = document.querySelectorAll('.category-tab');
  allTabs.forEach(function (tab) {
    tab.classList.remove('active');
  });
  btn.classList.add('active');

  // Show matching card grid, hide all others
  var allGrids = document.querySelectorAll('.car-cards-grid');
  allGrids.forEach(function (grid) {
    if (grid.getAttribute('data-category') === category) {
      grid.style.display = '';
    } else {
      grid.style.display = 'none';
    }
  });
}

// ===== Car Detail Modal =====
var currentCarName = '';

function openCarModal(linkEl) {
  var card = linkEl.closest('.car-card');
  if (!card || !card.dataset.carName) return;

  currentCarName = card.dataset.carName;

  document.getElementById('modalCarImg').src = card.dataset.carImg;
  document.getElementById('modalCarName').textContent = card.dataset.carName;
  document.getElementById('modalCarPrice').textContent = card.dataset.carPrice;
  document.getElementById('modalCarDesc').textContent = card.dataset.carDesc;
  document.getElementById('modalCarRange').textContent = card.dataset.carRange;
  document.getElementById('modalCarSpeed').textContent = card.dataset.carSpeed;
  document.getElementById('modalCarHp').textContent = card.dataset.carHp;
  document.getElementById('modalCarDrive').textContent = card.dataset.carDrive;
  document.getElementById('modalCarSeats').textContent = card.dataset.carSeats;
  document.getElementById('modalCarYear').textContent = card.dataset.carYear;

  // Check if car is already saved
  updateSaveButton();

  document.getElementById('carModalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCarModal() {
  document.getElementById('carModalOverlay').classList.remove('open');
  document.body.style.overflow = '';
  currentCarName = '';
}

// Close modal with Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeCarModal();
  }
});

// ===== Save Car to Garage (localStorage) =====
function getSavedCars() {
  try {
    return JSON.parse(localStorage.getItem('savedCars')) || [];
  } catch (e) {
    return [];
  }
}

function isCarSaved(name) {
  return getSavedCars().indexOf(name) !== -1;
}

function toggleSaveCar() {
  if (!currentCarName) return;

  var saved = getSavedCars();
  var index = saved.indexOf(currentCarName);

  if (index === -1) {
    // Save the car
    saved.push(currentCarName);
    localStorage.setItem('savedCars', JSON.stringify(saved));
    showToast('❤️ ' + currentCarName + ' saved to your garage!');
  } else {
    // Unsave the car
    saved.splice(index, 1);
    localStorage.setItem('savedCars', JSON.stringify(saved));
    showToast(currentCarName + ' removed from your garage.');
  }

  updateSaveButton();
}

function updateSaveButton() {
  var btn = document.getElementById('modalSaveBtn');
  var icon = document.getElementById('modalSaveIcon');

  if (isCarSaved(currentCarName)) {
    btn.classList.add('saved');
    icon.className = 'fa fa-heart';
    btn.innerHTML = '<i class="fa fa-heart" id="modalSaveIcon"></i> Saved';
  } else {
    btn.classList.remove('saved');
    icon.className = 'fa fa-heart-o';
    btn.innerHTML = '<i class="fa fa-heart-o" id="modalSaveIcon"></i> Save to Garage';
  }
}

// ===== Toast Notification =====
function showToast(message) {
  var toast = document.getElementById('carToast');
  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(function () {
    toast.classList.remove('show');
  }, 2800);
}