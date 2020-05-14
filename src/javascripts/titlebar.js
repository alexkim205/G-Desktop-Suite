const createTitleBar = () => {
  // Create titlebar
  var titleBar = document.createElement("div");
  titleBar.setAttribute("id", "titlebar-wrapper");

  titleBarHTML = `
  <div id="titlebar">
    <div id="leftmenu"></div>
    <div id="title">${document.title.split(" - ")[0]}</div>
    <div id="rightmenu"></div>
  </div>
  `;
  titleBar.innerHTML = titleBarHTML;

  return titleBar;
};

module.exports = createTitleBar;
