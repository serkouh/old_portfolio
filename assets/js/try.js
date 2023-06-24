$(document).ready(function () {
  //cache our items and containers
  var items = $(".portfolio-item");
  var scrollContainer = $(".offer-pg-cont");

  function fetchItem(container, items, isNext) {
    var i,
      scrollLeft = container.scrollLeft();

    //set isNext default to true if not set
    if (isNext === undefined) {
      isNext = true;
    }

    if (
      isNext &&
      container[0].scrollWidth - container.scrollLeft() <=
        container.outerWidth()
    ) {
      //we reached the last one so return the first one for looping:
      return $(items[0]);
    }

    //loop through items
    for (i = 0; i < items.length; i++) {
      if (isNext && $(items[i]).position().left > 0) {
        //this item is our next item as it's the first one with non-negative "left" position
        return $(items[i]);
      } else if (!isNext && $(items[i]).position().left >= 0) {
        //this is our previous item as it's the one with the smallest negative "left" position
        //if we're at item 0 just return the last item instead for looping
        return i == 0 ? $(items[items.length - 1]) : $(items[i - 1]);
      }
    }

    //nothing found
    return null;
  }

  /**
   * Moves the scrollcontainer to the next/previous item (depending on event.data.direction).
   *
   * @param event
   */
  function moveToItem(event) {
    //fetch the next/previous item:
    var isNext = event.data.direction == "next";
    var item = isNext
      ? fetchItem(scrollContainer, items, true)
      : fetchItem(scrollContainer, items, false);

    if (item) {
      //scroll to item
      scrollContainer.animate(
        { scrollLeft: item.position().left + scrollContainer.scrollLeft() },
        400
      );
    }
  }

  //bind events
  $(".arrow-left").click({ direction: "prev" }, moveToItem);
  $(".arrow-right").click({ direction: "next" }, moveToItem);
});
