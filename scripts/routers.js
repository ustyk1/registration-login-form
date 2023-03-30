import page from "//unpkg.com/page/page.mjs";

page('/sign-in', () => {
  window.location.href = '/pages/sign-in/sign-in.html'
});

page('/sign-up', () => {
  window.location.href = '/index.html'
});

page('/profile', () => {
  window.location.href = '/pages/profile/profile.html'
});

page('/reset', () => {
  window.location.href = '/pages/reset-password/reset-password.html'
});

page();

export { page }