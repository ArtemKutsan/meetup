const eventsStore = [
  {
    title: 'INFJ Personality Type - Coffee Shop Meet & Greet',
    description: 'Being an INFJ',
    date: new Date(2024, 2, 23, 15),
    image:
      'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1037&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%201037w ',
    type: 'offline',
    attendees: 99,
    category: 'Hobbies and Passions',
    distance: 50,
  },
  {
    title: 'NYC AI Users - AI Tech Talks, Demo & Social: RAG Search and Customer Experience',
    description: 'New York AI Users',
    date: new Date(2024, 2, 23, 11, 30),
    image:
      'https://images.unsplash.com/photo-1696258686454-60082b2c33e2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ',
    type: 'offline',
    attendees: 43,
    category: 'Technology',
    distance: 25,
  },
  {
    title: 'Book 40+ Appointments Per Month Using AI and Automation',
    description: 'New Jersey Business Network',
    date: new Date(2024, 2, 16, 14),
    image:
      'https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'online',
    category: 'Technology',
    distance: 10,
  },
  {
    title: 'Dump writing group weekly meetup',
    description: 'Dump writing group',
    date: new Date(2024, 2, 13, 11),
    image:
      'https://plus.unsplash.com/premium_photo-1678453146992-b80d66df9152?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'online',
    attendees: 77,
    category: 'Business',
    distance: 100,
  },
  {
    title: 'Over 40s, 50s, & 60s Senior Singles Chat, Meet & Dating Community',
    description: 'Over 40s, 50s, 60s Singles Chat, Meet & Dating Community',
    date: new Date(2024, 2, 14, 11),
    image:
      'https://plus.unsplash.com/premium_photo-1706005542509-a460d6efecb0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'online',
    attendees: 140,
    category: 'Social Activities',
    distance: 74,
  },
  {
    title: 'All Nations - Manhattan Missions Church Bible Study',
    description: 'Manhattan Bible Study Meetup Group',
    date: new Date(2024, 2, 14, 11),
    image:
      'https://plus.unsplash.com/premium_photo-1679488248784-65a638a3d3fc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'offline',
    category: 'Health and Wellbeing',
    distance: 15,
  },
  {
    title: 'All Nations - Manhattan Missions Church Bible Study',
    description: 'Manhattan Bible Study Meetup Group',
    date: new Date(2024, 2, 14, 11),
    image:
      'https://plus.unsplash.com/premium_photo-1679488248784-65a638a3d3fc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'offline',
    category: 'Health and Wellbeing',
    distance: 15,
  },
  {
    title: 'Book 40+ Appointments Per Month Using AI and Automation',
    description: 'New Jersey Business Network',
    date: new Date(2024, 2, 16, 14),
    image:
      'https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'online',
    category: 'Technology',
    distance: 10,
  },
];

const filters = [
  {
    type: 'day',
    options: [
      'Any date',
      new Date(2024, 2, 13, 11),
      new Date(2024, 2, 14, 11),
      new Date(2024, 2, 14, 20),
      new Date(2024, 2, 16, 14),
      new Date(2024, 2, 16, 14),
      new Date(2024, 2, 23, 11, 30),
      new Date(2024, 2, 23, 14),
      new Date(2024, 2, 28, 20),
      new Date(2024, 2, 30, 14),
      new Date(2024, 3, 11, 20),
      new Date(2024, 3, 25, 20),
    ],
  },
  { type: 'type', options: ['Any type', 'offline', 'online'] },
  { type: 'distance', options: ['Any distance', 25, 50, 75, 100] },
  {
    type: 'category',
    options: [
      'Any category',
      'Health and Wellbeing',
      'Social Activities',
      'Business',
      'Technology',
    ],
  },
];

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
    ${
      type === 'online'
        ? `<div class="badge"><span class="icon-cam text-muted"></span>
           <span class="text-muted text-xs font-medium">Online Event</span></div>
          `
        : ''
    }
    <h4>${title}</h4>
    <p class="font-medium text-sm text-muted my-2">${category} (${distance} km)</p>
    <div class="flex items-center gap-1">
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
      <div class="flex items-center gap-1">
        <span class="icon-ticket text-muted"></span><span>Free</span>
      </div>
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

renderEvents(eventsStore);
