const d = document;

export default function darkTheme() {
  const $toggle = d.querySelector(".toggle");
  const $toggleButton = d.querySelector(".toggle-circle");
  let mq = matchMedia("(prefers-color-scheme: dark)");

  function darkTheme() {
    $toggleButton.classList.remove("is-active");
    d.body.classList.remove("dark-theme");
    d.body.classList.add("light-theme");
  }

  function lightTheme() {
    $toggleButton.classList.add("is-active");
    d.body.classList.add("dark-theme");
    d.body.classList.remove("light-theme");
  }

  function changeTheme(e) {
    e.matches ? lightTheme() : darkTheme();
  }

  mq.addEventListener("change", changeTheme);
  changeTheme(mq);

  d.addEventListener("click", (e) => {
    if ($toggle === e.target) {
      if ($toggleButton.classList.contains("is-active")) {
        darkTheme();
      } else {
        lightTheme();
      }
    }
  });
}
