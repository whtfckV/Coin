import { el } from 'redom';
import WorkApi from './WorkApi';

export default class Banks {
  constructor() {
    <div this='el' class='banks' id='map'>
    </div>
  };

  set load(bool) {
    this._load = bool;
  };

  get load() {
    return this._load;
  };

  onmount() {
    this.fetch();
  };

  async fetch() {
    this.load = true;
    try {
      const { payload, error } = await WorkApi.getBanksLocations();

      if (error) {
        throw new Error(error);
      };
      this.data = payload;
      ymaps.ready(this.init.bind(this));
    } catch (error) {
      throw new Error(error);
    } finally {
      this.load = false;
    };
  };

  init() {
    const myMap = new ymaps.Map("map", {
      center: [55.758468, 37.601088],
      zoom: 15,
      controls: []
    });
    const SearchControl = new ymaps.control.SearchControl();
    const TrafficControl = new ymaps.control.TrafficControl();
    const TypeSelector = new ymaps.control.TypeSelector();

    myMap.controls.add(TrafficControl);
    myMap.controls.add(TypeSelector);
    myMap.controls.add(SearchControl);

    this.data.forEach(({ lat, lon }) => {
      const myPlacemark = new ymaps.Placemark([lat, lon], {}, {
        preent: 'islands#icon',
        iconColor: '#0095B6',
      });
      myMap.geoObjects.add(myPlacemark);
    })
  };
};
