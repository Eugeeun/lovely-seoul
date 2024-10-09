export const haversineDistance = (coords1, coords2) => {
  const toRad = value => (Math.PI * value) / 180;

  const lat1 = toRad(coords1.x);
  const lon1 = toRad(coords1.y);
  const lat2 = toRad(coords2.x);
  const lon2 = toRad(coords2.y);

  const R = 6371; // 지구의 반지름 (킬로미터)
  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // 거리 (킬로미터)
};
