const createElement = (tagName, className) => {
  const $element = document.createElement(tagName);

  if (className) {
    if (Array.isArray(className)) {
      className.forEach((item) => {
        $element.classList.add(item);
      });
    } else {
      $element.classList.add(className);
    }
  }

  return $element;
};

export default createElement;
