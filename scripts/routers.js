import page from "//unpkg.com/page/page.mjs";

page('/sign-in', () => {
  window.location.href = '/registration-login-form/pages/sign-in/sign-in.html'
});

page('/sign-up', () => {
  window.location.href = '/registration-login-form/index.html'
});

page('/profile', () => {
  window.location.href = '/registration-login-form/pages/profile/profile.html'
});

page('/reset', () => {
  window.location.href = '/registration-login-form/pages/reset-password/reset-password.html'
});

page();

export { page }