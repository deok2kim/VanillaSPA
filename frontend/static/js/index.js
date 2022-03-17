// frontend/static/js/index.js
import Dashboard from "./view/Dashboard.js";
import Posts from "./view/Posts.js";
import Settings from "./view/Settings.js";

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    // path는 url 의 끝 주소, view 는 렌더링할 페이지
    // 현재는 페이지가 없으므로 임시로 console.log를 찍어 잘 불러오는 지 확인
    { path: "/", view: Dashboard },
    { path: "/posts", view: Posts },
    { path: "/settings", view: Settings },
  ];

  // location.pathname 은 기본 url 뒤에 붙는 주소
  // 주소와 일치하면 isMatch 를 true 로 바꿔준다.
  const potentialMatches = routes.map((route) => {
    return {
      route,
      isMatch: route.path === location.pathname,
    };
  });

  let match = potentialMatches.find(
    (potentialMatches) => potentialMatches.isMatch
  );

  if (!match) {
    match = {
      route: route[0], // 최초 페이지 아무거나
      isMatch: true,
    };
  }

  const view = new match.route.view();

  document.querySelector("#app").innerHTML = await view.getHtml();

  // console.log(match.route.view());
};

window.addEventListener("popstate", router);

// 돔이 로딩될 때 router 함수를 실행
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
      router();
    }
  });
  router();
});
