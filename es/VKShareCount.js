import jsonp from 'jsonp';

import objectToGetParams from './utils/objectToGetParams';
import shareCountFactory from './utils/shareCountFactory';

function getVKShareCount(shareUrl, callback) {
  if (!window.VK) {
    window.VK = {
      Share: {
        count: function count(index, _count) {
          return window.VK.callbacks[index](_count);
        }
      },
      callbacks: []
    };
  }

  // When we load openapi.js then window.VK is exist but don't has these properties
  if (!window.VK.Share) {
    window.VK.Share = {
      count: function count(index, _count2) {
        return window.VK.callbacks[index](_count2);
      }
    };

    window.VK.callbacks = [];
  }

  var url = 'https://vk.com/share.php';
  var index = window.VK.callbacks.length;

  window.VK.callbacks.push(callback);

  return jsonp(url + objectToGetParams({
    act: 'count',
    index: index,
    url: shareUrl
  }));
}

export default shareCountFactory(getVKShareCount);