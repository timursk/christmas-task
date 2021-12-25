const Utils = {
  parseURL: () => {
    const url = location.hash.slice(1).toLowerCase() || '/';
    return url;
  }
}

export default Utils;