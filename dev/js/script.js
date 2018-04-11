'use sctrict';

function modalShare() {

  var btnShare = document.querySelector('.c-card__share'),
      social = document.querySelector('.c-card__share-toggle'),
      btnClose = document.querySelector('share-close');
      btnShare.addEventListener('click', function(event) {
      social.classList.toggle('toggle-show');
      btnClose.classList.remove('toggle-show');
  });

}

function btnColor() {

  [].forEach.call(document.querySelectorAll(
    '.c-card__color-button  button'), function(el) {
    el.addEventListener('click', function() {

      this.classList.toggle('selected-color')
      for (let sibling of this.parentNode.children) {
        if (sibling !== this) sibling.classList.remove(
          'selected-color');
      }

    })
  });
}

function btnSize() {

  [].forEach.call(document.querySelectorAll(
    '.c-card__size-button  button'), function(el) {
    el.addEventListener('click', function() {

      this.classList.toggle('selected-size')
      for (let sibling of this.parentNode.children) {
        if (sibling !== this) sibling.classList.remove(
          'selected-size');
      }

    })
  });
}

function starRating() {

  [].forEach.call(document.querySelectorAll('.star.rating'), function(el) {
    el.addEventListener('click', function() {

      this.parentNode.dataset.stars = this.dataset.rating;

    })
  });

}

function itemSlider() {

  var width = 265,
      count = 1,
      position = 0;

  var itemSlider = document.querySelector('.l-stack-wrap');
  var itemList = itemSlider.querySelector('.c-stack__item-wrap');
  var itemElement = itemSlider.querySelectorAll('.c-stack__item');

  itemSlider.querySelector('.c-stack__arrow-before').onclick = function() {

    position = Math.min(position + width * count, 0)
    itemList.style.marginLeft = position + 'px';
  };

  itemSlider.querySelector('.c-stack__arrow-next').onclick = function() {

    position = Math.max(position - width * count, -width * (itemElement
      .length - count));
    itemList.style.marginLeft = position + 'px';
  };
}

document.addEventListener('DOMContentLoaded', function() {
  starRating();
  btnSize();
  btnColor();
  modalShare();
  itemSlider();
})