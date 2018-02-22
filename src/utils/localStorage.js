export default class LocalStorage {
  static get(key) {
    const origin = localStorage.getItem(key);
    if (origin) {
      const value = JSON.parse(origin);
      if (value.meta.exp <= 0) {
        value.meta.exp = 24 * 60 * 60 * 1000;
      }
      if (value.meta.exp <= 0) {
        return value.data;
      }
      if ((new Date().getTime() - value.meta.time) > value.meta.exp) {
        localStorage.removeItem(key);
        return null;
      }
      return value.data;
    }
    return null;
  }

  static set(key, data, expiration = 0) {
    const value = {
      meta: {
        exp: expiration * 1000,
        time: new Date().getTime(),
      },
      data,
    };
    localStorage.setItem(key, JSON.stringify(value));
  }

  static remove(key) {
    localStorage.removeItem(key);
  }
}
