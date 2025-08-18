<!-- tabs logic -->
<script>
  function initAnimatedTabs() {
    const tabContainers = document.querySelectorAll('[blx-tab-container]');

    tabContainers.forEach(container => {
      const tabs = container.querySelectorAll('[blx-tab]');
      const links = container.querySelectorAll('[blx-tab-link]');
      const panels = container.querySelectorAll('[blx-tab-panel]');
      const icons = container.querySelectorAll('[blx-tab-icon]');

      // Initialize aria-selected based on active state
      links.forEach(link => {
        link.setAttribute('aria-selected', link.classList.contains('active') ? 'true' : 'false');
      });

      if (window.innerWidth > 991) {
        // Desktop behavior (> 991px)
        function setContainerHeight(panel) {
          const tabContent = container.querySelector('[blx-tab-content]');
          const style = window.getComputedStyle(document.documentElement);
          const rootFontSize = parseFloat(style.fontSize);
          const paddingMedium = parseFloat(style.getPropertyValue('--_spacing---padding--medium')) * rootFontSize || 40; // Convert rem to px, fallback to 40px
          const tabContentHeight = tabContent ? tabContent.offsetHeight : 0;
          const panelHeight = panel ? panel.offsetHeight : 0;

          // Set top offset for all panels
          panels.forEach(p => {
            p.style.top = (tabContentHeight + paddingMedium) + 'px';
          });

          // Set container height
          container.style.height = (tabContentHeight + panelHeight + paddingMedium) + 'px';
        }

        function activateTab(link, panel) {
          if (panel.classList.contains('active')) return;

          links.forEach(l => {
            l.classList.remove('active');
            l.setAttribute('aria-selected', 'false');
          });
          panels.forEach(p => {
            p.classList.remove('active');
            p.style.opacity = '0';
            p.style.pointerEvents = 'none';
            p.style.zIndex = '0';
          });

          link.classList.add('active');
          link.setAttribute('aria-selected', 'true');
          panel.classList.add('active');
          panel.style.opacity = '1';
          panel.style.pointerEvents = 'auto';
          panel.style.zIndex = '1';

          setContainerHeight(panel);
        }

        links.forEach(link => {
          link.addEventListener('click', () => {
            const tab = link.closest('[blx-tab]');
            const panel = tab.querySelector('[blx-tab-panel]');
            activateTab(link, panel);
          });
        });

        const firstLink = links[0];
        const firstPanel = panels[0];
        if (firstLink && firstPanel) {
          activateTab(firstLink, firstPanel);
        }

        window.addEventListener('resize', () => {
          if (window.innerWidth > 991) {
            const activePanel = container.querySelector('[blx-tab-panel].active');
            if (activePanel) setContainerHeight(activePanel);
          } else {
            container.style.height = '';
          }
        });
      } else {
        // Mobile behavior (≤ 991px) — multiple tabs open
        function togglePanel(link, panel, icon) {
          const isActive = panel.classList.contains('active');

          if (isActive) {
            panel.classList.remove('active');
            panel.style.maxHeight = '0';
            panel.style.opacity = '0';
            panel.style.pointerEvents = 'none';
            if (icon) icon.style.transform = 'rotate(0deg)';
            link.setAttribute('aria-selected', 'false');
          } else {
            panel.classList.add('active');
            panel.style.maxHeight = '100%';
            panel.style.opacity = '1';
            panel.style.pointerEvents = 'auto';
            if (icon) icon.style.transform = 'rotate(45deg)';
            link.setAttribute('aria-selected', 'true');
          }
        }

        function setContainerHeight() {
          container.style.height = 'auto'; // Let the container height adapt naturally
        }

        links.forEach(link => {
          const tab = link.closest('[blx-tab]');
          const panel = tab.querySelector('[blx-tab-panel]');
          const icon = tab.querySelector('[blx-tab-icon]');

          link.addEventListener('click', () => {
            togglePanel(link, panel, icon);
            setTimeout(() => setContainerHeight(), 10);
          });
        });

        // Initialize with no panel active (height: 0)
        panels.forEach(panel => {
          panel.classList.remove('active');
          panel.style.maxHeight = '0';
          panel.style.opacity = '0';
          panel.style.pointerEvents = 'none';
        });
        links.forEach(link => link.setAttribute('aria-selected', 'false'));
        setContainerHeight();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', initAnimatedTabs);
</script>
