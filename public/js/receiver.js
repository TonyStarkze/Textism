//To copy the text
function copyText() {
  var textarea = document.getElementsByClassName("text-box")[0];
  textarea.select();
  document.execCommand("copy");
  alert("Text copied to clipboard!");
}

function timeLeft(date) {
  const now = new Date();
  const elapsedMilliseconds = date - now.getTime();

  console.log(elapsedMilliseconds);

  // Define time intervals in milliseconds
  const second = 1000;
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30.44 * day;
  const year = 365.25 * day;

  if (elapsedMilliseconds < 0) {
    return "expired";
  }

  if (elapsedMilliseconds < second) {
    return "done";
  }
  if (elapsedMilliseconds < minute) {
    const seconds = Math.floor(elapsedMilliseconds / 1000);
    return `${seconds} second${seconds !== 1 ? "s" : ""} left`;
  } else if (elapsedMilliseconds < hour) {
    const fraction = elapsedMilliseconds / minute;
    const minutes = Math.floor(fraction);
    const seconds = Math.floor((fraction - minutes) * 60);
    return `${minutes} minute${
      minutes !== 1 ? "s" : ""
    } ${seconds} seconds left`;
  } else if (elapsedMilliseconds < day) {
    const hours = Math.floor(elapsedMilliseconds / hour);
    return `${hours} hour${hours !== 1 ? "s" : ""} left`;
  } else if (elapsedMilliseconds < week) {
    const days = Math.floor(elapsedMilliseconds / day);
    return `${days} day${days !== 1 ? "s" : ""} left`;
  } else if (elapsedMilliseconds < month) {
    const weeks = Math.floor(elapsedMilliseconds / week);
    return `${weeks} week${weeks !== 1 ? "s" : ""} left`;
  } else if (elapsedMilliseconds < year) {
    const months = Math.floor(elapsedMilliseconds / month);
    return `${months} month${months !== 1 ? "s" : ""} left`;
  } else {
    const years = Math.floor(elapsedMilliseconds / year);
    return `${years} year${years !== 1 ? "s" : ""} left`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const expiryDt = document.querySelector("#code-expiry-dt");
  const expiryEpoh = expiryDt?.value ? parseInt(expiryDt.value) : null;
  const showExpiryEl = document.querySelector("#show-expiry");
  console.log(expiryEpoh);
  if (expiryEpoh) {
    const intervalId = setInterval(() => {
      const remaining = timeLeft(expiryEpoh);
      if (remaining === "expired") {
        clearInterval(intervalId);
        window.location.reload();
      } else {
        showExpiryEl.innerHTML = remaining;
      }
    }, 1000);
  }
});
