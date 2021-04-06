import { IFilterObject, ISortObject } from '../realty/realty.service';

export function filterMaker(filter: IFilterObject) {
  const result = {
    type: { $eq: filter.type || 'Квартира' },
    price: { $gte: filter.minPrice ?? null, $lte: filter.maxPrice || null },
    rooms: { $eq: filter.rooms ?? null },
    area: { $gte: filter.area ?? null },
    district: { $eq: filter.district || null },
    street: { $eq: filter.street || null },
    encumbranceType: { $eq: filter.encumbranceType || 0 },
  };
  if (!filter.minPrice && !filter.maxPrice) delete result.price;
  if (!filter.rooms) delete result.rooms;
  if (!filter.area) delete result.area;
  if (!filter.district) delete result.district;
  if (!filter.street) delete result.street;
  return result;
}

export function sortMaker(sort: ISortObject) {
  const result = {
    price: sort.price || null,
    rooms: sort.rooms || null,
    area: sort.area || null,
  };
  if (!sort.price) delete result.price;
  if (!sort.rooms) delete result.rooms;
  if (!sort.area) delete result.area;
  return result;
}

export function infrastructureRatingMaker(array: Array<any>) {
  const result = {};
  array.forEach((item) => {
    result[item.type] = item.rating;
  });
  result['created_at'] = Date.now();
  return result;
}

export function ratingObjectMaker(realties: Array<any>, filters: any) {
  const filtersKeys = Object.keys(filters);
  const filterObject = {};
  for (const item of filtersKeys) {
    filterObject[item] = true;
  }
  const fil = {
    filters: {
      est_type: filters.type['$eq'].toLowerCase(),
    },
  };
  const filt = Object.assign(fil, filterObject);
  const request = {
    ...filt,
    collection: realties,
  };
  return request;
}
