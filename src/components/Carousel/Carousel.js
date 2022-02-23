import React, { useCallback, useMemo, useEffect, useState } from "react";
import { generateBreakpointWidths } from "../../utils";
import CarouselSlider from "./CarouselSlider";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

const Carousel = ({
  carouselItems,
  itemBreakpoints = { base: 2 },
  fetch = false,
  execFetch = null,
  dataType = null,
  fetchGap = 10,
}) => {
  // Separate classes for image vs text carousels
  const textClassList =
    "w-full inline-flex items-end object-contain p-4 bg-black text-[#36CA94] cursor-pointer";
  const imageClassList = "w-full inline-flex object-contain cursor-pointer";

  const itemBreakpointWidths = generateBreakpointWidths(itemBreakpoints);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(itemBreakpoints.base);
  const [windowWidth, setWindowWidth] = useState();
  const carouselItemRefs = useMemo(
    () =>
      carouselItems &&
      carouselItems.reduce(
        (acc, _, index) => ({ ...acc, [index]: React.createRef() }),
        {}
      ),
    [carouselItems]
  );

  const setItemsInWindow = useCallback(() => {
    const baseItems = itemBreakpoints.base;
    const smItems = itemBreakpoints.sm || baseItems;
    const mdItems = itemBreakpoints.md || smItems;
    const lgItems = itemBreakpoints.lg || mdItems;
    const xlItems = itemBreakpoints.xl || lgItems;

    if (windowWidth <= 640) setVisibleItems(baseItems);
    else if (windowWidth <= 768) setVisibleItems(smItems);
    else if (windowWidth <= 1024) setVisibleItems(mdItems);
    else if (windowWidth <= 1280) setVisibleItems(lgItems);
    else setVisibleItems(xlItems);
  }, [windowWidth, itemBreakpoints]);

  const scrollToIndex = useCallback(
    (nextIndex) => {
      setCurrentIndex(nextIndex);
      const nextItem = carouselItemRefs[nextIndex].current;
      nextItem.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    },
    [carouselItemRefs]
  );

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setItemsInWindow();
  }, [setItemsInWindow]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setItemsInWindow();
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth, setItemsInWindow, currentIndex]);

  function navigateCarousel(direction) {
    const isNext = direction === "next" ? true : false;
    const targetIndex = isNext
      ? currentIndex + visibleItems
      : currentIndex - visibleItems;

    function navigateNext() {
      const isValidNavigation = targetIndex <= carouselItems.length;
      const isBelowFetchLimit = targetIndex + fetchGap > carouselItems.length;
      if (fetch && isBelowFetchLimit) execFetch(dataType);
      if (isValidNavigation) scrollToIndex(targetIndex);
    }

    function navigatePrior() {
      const isValidNavigation = currentIndex !== 0;
      if (isValidNavigation) scrollToIndex(targetIndex > 0 ? targetIndex : 0);
    }

    if (direction === "next") navigateNext(targetIndex);
    if (direction === "prior") navigatePrior(targetIndex);
  }

  return (
    <div className="flex w-full p-2">
      <div className="relative w-full">
        <div className="w-full carousel">
          <CarouselSlider
            direction="left"
            onButtonClick={() => navigateCarousel("prior")}
            icon={MdKeyboardArrowLeft}
            xPosition="-left-4"
          />
          {carouselItems.map((carouselItem, i) => (
            <div
              className={`flex-shrink-0 ${itemBreakpointWidths}`}
              key={`img-${i}`}
              ref={carouselItemRefs[i]}
            >
              <div className="relative mx-2">
                {carouselItem.image ? (
                  <>
                    <img
                      src={carouselItem.image}
                      className={`peer hover:opacity-25 duration-200 ${imageClassList}`}
                      alt={carouselItem.alt || `carousel item-${i}`}
                    />
                    <div className="absolute top-0 left-0 hidden w-full p-2 mt-5 text-center duration-200 cursor-pointer peer-hover:block">
                      {carouselItem.title}
                    </div>
                  </>
                ) : (
                  <span className={`${textClassList} ${carouselItem.height}`}>
                    {carouselItem.text}
                  </span>
                )}
              </div>
            </div>
          ))}
          <CarouselSlider
            direction="right"
            onButtonClick={() => navigateCarousel("next")}
            icon={MdKeyboardArrowRight}
            xPosition="-right-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
