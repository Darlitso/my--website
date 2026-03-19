function toggleDropdown() {
  var content = document.getElementById('dropdownContent');
  content.classList.toggle('open');
}

// Close dropdown when clicking outside of it
document.addEventListener('click', function (e) {
  var menu = document.getElementById('dropdownMenu');
  if (!menu.contains(e.target)) {
    document.getElementById('dropdownContent').classList.remove('open');
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