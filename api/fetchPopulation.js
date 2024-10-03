export default async function handler(req, res) {
  const { placeName } = req.query;
  const apiUrl = `http://openapi.seoul.go.kr:8088/${process.env.VITE_CITY_POP_API_KEY}/json/citydata_ppltn/1/5/${placeName}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    res.status(200).json(data['SeoulRtd.citydata_ppltn'][0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch population data' });
  }
}
