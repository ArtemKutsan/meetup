import { eventsStore, categoriesStore, citiesStore, friendshipsStore } from './data.js';

const eventsNearContainer = document.querySelector('#events-near .events');
const onlineEventsContainer = document.querySelector('#online-events .events');

function formatEventDate(date) {
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

function createEventElement(event) {
  const { title, description, date, image, type, attendees, category, distance } = event;

  const el = document.createElement('div');
  el.className = 'event';

  el.innerHTML = `
    <img src="${image}" alt="${title}">
    
    <div class="event-info">
      <h4>${title}</h4>
      <p class="font-medium text-sm text-muted my-2">
        ${category} ${type !== 'online' ? `(${distance} km)` : ''}
      </p>
      <div class="time-date flex items-center gap-1">
        <span class="icon-calendar text-muted"></span>
        <time class="uppercase text-sm">${formatEventDate(date)}</time>
      </div>
      <div class="flex items-center gap-4">
        ${
          attendees !== undefined
            ? `<div class="flex items-center gap-1">
                <span class="icon-check text-muted"></span><span>${attendees} going</span>
              </div>`
            : ''
        }
        <div class="ticket flex items-center gap-1">
          <span class="icon-ticket text-muted"></span><span>Free</span>
        </div>
      </div>
      ${
        type === 'online'
          ? `<div class="badge">
               <span class="icon-cam text-muted"></span>
               <span class="text-muted text-xs font-medium">Online Event</span>
             </div>
            `
          : ''
      }
    </div>
  `;

  return el;
}

function renderEvents(events) {
  eventsNearContainer.innerHTML = '';
  onlineEventsContainer.innerHTML = '';

  events.forEach((event) => {
    eventsNearContainer.appendChild(createEventElement(event));
  });

  events
    .filter((event) => event.type === 'online')
    .forEach((event) => {
      onlineEventsContainer.appendChild(createEventElement(event));
    });
}

function createCategoryElement(category) {
  const { name, icon } = category;
  const el = document.createElement('div');
  el.className = 'category';
  el.innerHTML = `
    <img src="${icon}" alt="${name}" class="category-icon mb-2">
    <h6>${name}</h6>
  `;
  return el;
}

function renderCategories(categories) {
  const container = document.querySelector('#categories');
  container.innerHTML = '';
  categories.forEach((category) => {
    container.appendChild(createCategoryElement(category));
  });
}

function createCityElement(city) {
  const { name, image } = city;
  const el = document.createElement('div');
  el.className = 'city';
  el.innerHTML = `
    <img src="${image}" alt="${name}">
    <h4>${name}</h4>
  `;
  return el;
}

function renderCities(cities) {
  const container = document.querySelector('#cities');
  container.innerHTML = '';
  cities.forEach((city) => {
    container.appendChild(createCityElement(city));
  });
}

function createFriendshipElement(friendship) {
  const { title, description, image } = friendship;
  const el = document.createElement('div');
  el.className = 'friendship';
  el.innerHTML = `
    <img src="${image}" alt="${title}">
    <h4>${title}</h4>
    <p class="text-muted">${description}</p>
    <a href="#" class="link">Read more</a>
  `;
  return el;
}

function renderFriendships(friendships) {
  const container = document.querySelector('#friendships');
  container.innerHTML = '';
  friendships.forEach((friendship) => {
    container.appendChild(createFriendshipElement(friendship));
  });
}

renderEvents(eventsStore);
renderCategories(categoriesStore);
renderCities(citiesStore);
renderFriendships(friendshipsStore);
