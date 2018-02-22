const sign_in = (userID) => ({
  type: 'sign_in',
  userID,
});
const sign_out = () => ({
  type: 'sign_out',
})

export { sign_in, sign_out};
