import { eventsStore, filters } from './data.js';

const filtersContainer = document.getElementById('filters');
const eventsList = document.getElementById('events-near-list');

function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  }).format(date);
}

function renderFilters() {
  filters.forEach(({ type, options }) => {
    const select = document.createElement('select');
    select.name = type;
    select.dataset.filterType = type;
    select.className = 'filter-select';

    options.forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.value = option instanceof Date ? option.toISOString() : option;
      optionElement.textContent = option instanceof Date ? formatDate(option) : option;
      select.appendChild(optionElement);
    });

    filtersContainer.appendChild(select);
  });
}

function applyFilters() {
  const selected = {};
  filtersContainer.querySelectorAll('select').forEach((select) => {
    selected[select.dataset.filterType] = select.value;
  });

  const filtered = eventsStore.filter((event) => {
    // if (event.type === 'online' ) return false;

    const matchDate =
      selected.day === 'Any date' ||
      new Date(event.date).toDateString() === new Date(selected.day).toDateString();

    const matchType = selected.type === 'Any type' || event.type === selected.type;

    const matchDistance =
      selected.distance === 'Any distance' || event.distance <= Number(selected.distance);

    const matchCategory =
      selected.category === 'Any category' || event.category === selected.category;

    return matchDate && matchType && matchDistance && matchCategory;
  });

  renderEvents(filtered);
}

function renderEvents(events) {
  eventsList.innerHTML = '';
  events.forEach((event) => {
    const el = document.createElement('div');
    el.className = 'event';
    el.innerHTML = `
      <img src="${event.image}" alt="${event.title}">
      <div class="event-info">
        <h6>${event.title}</h6>
        <p class="font-medium text-sm text-muted my-2">
          ${event.category} (${event.distance} km)
        </p>
        <div class="time-date flex items-center gap-1">
          <span class="icon-calendar text-muted"></span>
          <time class="uppercase text-sm">${formatDate(event.date)}</time>
        </div>
        <div class="flex items-center gap-4">
          ${
            event.attendees
              ? `<div class="flex items-center gap-1">
                  <span class="icon-check text-muted"></span><span>${event.attendees} going</span>
                </div>`
              : ''
          }
          <div class="ticket flex items-center gap-1">
            <span class="icon-ticket text-muted"></span><span>Free</span>
          </div>
        </div>
        ${
          event.type === 'online'
            ? `<div class="badge">
               <span class="icon-cam text-muted"></span>
               <span class="text-muted text-xs font-medium">Online Event</span>
             </div>
            `
            : ''
        }
      </div>
    `;
    eventsList.appendChild(el);
  });
}

renderFilters();
filtersContainer.addEventListener('change', applyFilters);
applyFilters();
