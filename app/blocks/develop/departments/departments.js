/* global ymaps */
document.addEventListener(`DOMContentLoaded`, () => {
  let map;
  let objectManager;
  const mapContainer = document.querySelector(`#map`);

  const init = () => {
    const departments =
      mapContainer && JSON.parse(mapContainer.dataset.departments);
    const russiaCoords = [61.698653, 99.505405];
    map = new ymaps.Map(
        mapContainer,
        {
          center: russiaCoords,
          zoom: [9],
          controls: []
        },
        {
          autoFitToViewport: `always`
        }
    );

    objectManager = new ymaps.ObjectManager({
      clusterize: true,
      gridSize: 32,
      clusterDisableClickZoom: true
    });

    objectManager.objects.options.set({
      iconLayout: `default#image`,
      iconImageHref: `./static/departments/map_marker.svg`,
      iconImageSize: [35, 40],
      iconImageOffset: [-17, -20]
    });

    fetch(`./static/departments/departments.json`)
      .then((response) => response.json())
      .then((data) => {
        objectManager.add(
            (data[`features`] = data[`features`].filter((item) =>
              departments.includes(item.group)
            ))
        );
        map.geoObjects.add(objectManager);
        const bounds = objectManager.getBounds();
        if (bounds) {
          map.setBounds(objectManager.getBounds());
        }
      });

    map.behaviors.disable(`scrollZoom`);
  };

  const handleChange = ({currentTarget}) => {
    const names = Array.from(currentTarget.elements.department)
      .map((department) => {
        if (department.checked) {
          const [, name] = department.id.split(`-`);
          return name;
        }
        return false;
      })
      .filter((name) => name);
    if (mapContainer) {
      mapContainer.dataset.departments = JSON.stringify(names);
    }
    if (map) {
      map.destroy();
    }
    ymaps.ready(init);
  };

  document
    .querySelector(`#departments-form`)
    .addEventListener(`change`, handleChange);

  window.addEventListener(`resize`, () => {
    if (map && objectManager) {
      map.setBounds(objectManager.getBounds());
      map.container.fitToViewport();
    }
  });

  ymaps.ready(init);
});
