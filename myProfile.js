// Configuration variables.

const PROFILE_NAME = "Penny Peanut Alves";
const PROFILE_DETAILS = [
  "Likes to roll on top of food she has never tried before.",
  "Hates every fruit.",
  "Very fond of strangers.",
  "A very dramatic performer/dog.",
];
const PROFILE_LOCATION = "Weehawken, NJ";
const PROFILE_PIC_URL = "/its-me-penny.jpeg";
const DANCE_PARTY_TIMERS = {
  background: 200,
  horizontal: 10,
};
const NEXT_BIRTHDAY = new Date("1/6/2021");

// -------

window.addEventListener("DOMContentLoaded", () => {
  const BODY_ELEMENT = document.body;

  // Phase 2A: Creating h1 with my name
  (() => {
    const h1Element = document.createElement("h1");
    const textNode = document.createTextNode(PROFILE_NAME);

    h1Element.appendChild(textNode);

    h1Element.setAttribute("id", "profile-name");

    // Phase 3: CSS classes
    h1Element.className = "name";

    BODY_ELEMENT.appendChild(h1Element);
  })();

  // Phase 2A/B: List of details
  (() => {
    const listElement = document.createElement("ul");

    const liString = PROFILE_DETAILS.map((s) => `<li>${s}</li>`).join("\n");

    listElement.innerHTML = liString;

    BODY_ELEMENT.appendChild(listElement);

    // Phase 3: CSS classes
    listElement.setAttribute("class", "my-details");

    const lis = document.querySelectorAll("li");

    Array.from(lis).forEach((listItemElement) => {
      listItemElement.className = "detail";
    });
  })();

  // Phase 4: Clock list item
  (() => {
    const listElement = document.querySelectorAll(".my-details")[0];

    const newListItemElement = document.createElement("li");
    newListItemElement.className = "detail";

    listElement.append(newListItemElement);

    const setClockValue = () => {
      const date = new Date();
      const dateReadable = date.toString();
      newListItemElement.innerHTML = `I live in ${PROFILE_LOCATION} and it's currently ${dateReadable}`;
    };
    setInterval(setClockValue, 1000);
    setClockValue();
  })();

  // Bonus A: More sections (profile image)
  (() => {
    const listElement = document.querySelectorAll(".my-details")[0];
    const newImageElement = document.createElement("img");

    newImageElement.setAttribute("src", PROFILE_PIC_URL);
    newImageElement.setAttribute("id", "profile-pic");

    BODY_ELEMENT.insertBefore(newImageElement, listElement);
  })();

  // Bonus C: Dance party!!!
  (() => {
    const profilePicElement = document.querySelector("#profile-pic");

    const randomColor = () => {
      const colors = [
        "pink",
        "red",
        "green",
        "blue",
        "yellow",
        "purple",
        "orange",
        "goldenrod",
        "magenta",
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const randomBackground = () => {
      profilePicElement.style.background = randomColor();
    };

    const createBouncingFunction = () => {
      let goingLeft = true;
      return () => {
        if (
          goingLeft &&
          profilePicElement.offsetLeft <
            window.innerWidth - profilePicElement.clientWidth
        ) {
          profilePicElement.style.left = `${
            profilePicElement.offsetLeft + 5
          }px`;
          if (
            profilePicElement.offsetLeft + 5 >
            window.innerWidth - profilePicElement.clientWidth
          ) {
            goingLeft = false;
          }
        } else {
          profilePicElement.style.left = `${
            profilePicElement.offsetLeft - 15
          }px`;
          if (profilePicElement.offsetLeft < 10) {
            goingLeft = true;
          }
        }
      };
    };

    const danceParty = () => {
      profilePicElement.style.position = "relative";

      const backgroundsInterval = setInterval(
        randomBackground,
        DANCE_PARTY_TIMERS.background
      );

      const bounceLeftRight = setInterval(
        createBouncingFunction(),
        DANCE_PARTY_TIMERS.horizontal
      );

      return () => {
        clearInterval(backgroundsInterval);
        clearInterval(bounceLeftRight);
      };
    };

    let partying = false;
    let stopPartying = null;
    profilePicElement.addEventListener("click", () => {
      if (partying === false) {
        stopPartying = danceParty();
        partying = true;
      } else {
        if (stopPartying) stopPartying();
        stopPartying = null;
        partying = false;
      }
    });
  })();

  // Bonus D: Birthday countdown
  (() => {
    const birthdayElement = document.createElement("h2");
    BODY_ELEMENT.prepend(birthdayElement);

    // ...

    const textSegments = ["My birthday is in ", "", ", so don't you FORGET."];
    const spanElements = textSegments.map((s) => {
      const spanElement = document.createElement("span");
      spanElement.innerHTML = s;
      return spanElement;
    });
    spanElements.forEach((se) => birthdayElement.append(se));

    // ...

    const timeUntilSpan = spanElements[1];
    

    const calculateTimeUntilBirthday = () => {
      const nowInMilliseconds = Date.now();
      const birthdayInMilliseconds = NEXT_BIRTHDAY.getTime();
      const untilBirthday = birthdayInMilliseconds - nowInMilliseconds;

      const timeString = msToTime(untilBirthday);

      return timeString;
    };

    timeUntilSpan.innerText = calculateTimeUntilBirthday();
    setInterval(() => {
      timeUntilSpan.innerText = calculateTimeUntilBirthday();
    }, 1000);
  })();
});

// Copied from Stackoverflow
// https://stackoverflow.com/questions/19700283/how-to-convert-time-milliseconds-to-hours-min-sec-format-in-javascript
function msToTime(duration) {
  var seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
    days = Math.floor((duration / (1000 * 60 * 60 * 24)) % 365);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return days + ":" + hours + ":" + minutes + ":" + seconds;
}
