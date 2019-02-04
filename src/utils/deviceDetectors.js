/*
 * Device Detectors:
 */
export const iOS =
  /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
export const isIEorEdge =
  /msie\s|trident\/|edge\//i.test(navigator.userAgent) &&
  !!(document.uniqueID || window.MSInputMethodContext);
export const isExtraSmallDevice = window.innerWidth <= 330; /* iphone4 */
export const isSmallDevice = window.innerWidth <= 480;
export const isDesktop = window.innerWidth >= 640;

export const isSmartphone = /android.*mobile|mobile.*android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
);

export const iOSVersion = () => {
  let match = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
    version;

  if (match !== undefined && match !== null) {
    version = [
      parseInt(match[1], 10),
      parseInt(match[2], 10),
      parseInt(match[3] || 0, 10)
    ];
    return parseFloat(version.join('.'));
  }
  return false;
};
