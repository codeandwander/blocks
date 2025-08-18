<!-- Rotating tabs logic -->
window.Webflow ||= [];
window.Webflow.push(function () {
  const tabContainers = document.querySelectorAll('[blx-tabs-container]');
  const rotationIntervals = {};

  function activateTabInContainer(container, index) {
    const tabs = container.querySelectorAll('[blx-tabs-tab]');
    const tabContents = container.querySelectorAll('[blx-tabs-content]');
    const tabInnerContents = container.querySelectorAll('.tab_inner-content'); // SELECT ALL inner contents

    tabs.forEach((tab, i) => {
      const progressBar = tab.querySelector('[blx-tabs-progress]');
      const plusIcon = tab.querySelector('.tab_plus');
      const contentHideItems = tab.querySelectorAll('.tab_content_hide');
      const isHorizontal = tab.closest('[data-wf--tabs---item--tabs-direction="horizontal"]') !== null;

      if (i === index) {
        tab.classList.add('active');
        tabContents[i].style.display = 'block';

        if (plusIcon) plusIcon.classList.remove('active');
        contentHideItems.forEach(el => el.classList.add('active'));
        if (tabInnerContents[i]) tabInnerContents[i].classList.add('active');

        if (progressBar) {
          progressBar.style.transition = 'none';
          if (isHorizontal) {
            progressBar.style.width = '0';
            progressBar.style.height = '';
          } else {
            progressBar.style.height = '0';
            progressBar.style.width = '';
          }

          setTimeout(() => {
            const rotationInterval = container.dataset.rotationInterval || 3000;
            progressBar.style.transition = `all ${rotationInterval / 1000}s linear`;
            if (isHorizontal) {
              progressBar.style.width = '100%';
            } else {
              progressBar.style.height = '100%';
            }
          }, 10);
        }
      } else {
        tab.classList.remove('active');
        tabContents[i].style.display = 'none';

        if (plusIcon) plusIcon.classList.add('active');
        contentHideItems.forEach(el => el.classList.remove('active'));
        if (tabInnerContents[i]) tabInnerContents[i].classList.remove('active');

        if (progressBar) {
          progressBar.style.transition = 'none';
          if (isHorizontal) {
            progressBar.style.width = '0';
          } else {
            progressBar.style.height = '0';
          }
        }
      }
    });

    // Optional: remove border from last .tab_item
    const tabItems = container.querySelectorAll('.tab_item');
    if (tabItems.length > 0) {
      tabItems.forEach(item => item.style.borderBottom = '');
      tabItems[tabItems.length - 1].style.borderBottom = '0';
    }
  }

  tabContainers.forEach((container, containerIndex) => {
    let currentTabIndex = 0;
    const rotationIntervalTime = parseInt(container.getAttribute('blx-tabs-time')) || 3000;
    container.dataset.rotationInterval = rotationIntervalTime;

    function startRotation() {
      rotationIntervals[containerIndex] = setInterval(() => {
        const totalTabs = container.querySelectorAll('[blx-tabs-tab]').length;
        currentTabIndex = (currentTabIndex + 1) % totalTabs;
        activateTabInContainer(container, currentTabIndex);
      }, rotationIntervalTime);
    }

    activateTabInContainer(container, currentTabIndex);
    startRotation();

    const tabs = container.querySelectorAll('[blx-tabs-tab]');
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', (e) => {
        if (index !== currentTabIndex) {
          clearInterval(rotationIntervals[containerIndex]);
          activateTabInContainer(container, index);
          currentTabIndex = index;
          startRotation();
        } else {
          e.preventDefault();
        }
      });
    });
  });

  window.addEventListener('resize', () => {
    Object.keys(rotationIntervals).forEach(containerIndex => {
      clearInterval(rotationIntervals[containerIndex]);
    });

    tabContainers.forEach((container, containerIndex) => {
      activateTabInContainer(container, 0);
      let currentTabIndex = 0;
      const rotationIntervalTime = parseInt(container.getAttribute('blx-tabs-time')) || 3000;

      rotationIntervals[containerIndex] = setInterval(() => {
        const totalTabs = container.querySelectorAll('[blx-tabs-tab]').length;
        currentTabIndex = (currentTabIndex + 1) % totalTabs;
        activateTabInContainer(container, currentTabIndex);
      }, rotationIntervalTime);
    });
  });
});
