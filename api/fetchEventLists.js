export default async function handler(req, res) {
  const { areaName } = req.query;
  const apiUrl = `http://openapi.seoul.go.kr:8088/${process.env.VITE_CITY_DATA_API_KEY}/json/citydata/1/5/${areaName}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    res.status(200).json(data['CITYDATA']);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch event lists' });
  }
}
