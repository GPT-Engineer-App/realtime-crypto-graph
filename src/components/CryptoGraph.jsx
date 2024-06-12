import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, useColorMode } from '@chakra-ui/react';

const CryptoGraph = () => {
  const [data, setData] = useState([]);
  const { colorMode } = useColorMode();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.coincap.io/v2/assets/bitcoin/history?interval=m1');
        const result = await response.json();
        const formattedData = result.data.map(item => ({
          time: new Date(item.time).toLocaleTimeString(),
          priceUsd: parseFloat(item.priceUsd),
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <Box width="100%" height="500px" bg={colorMode === 'dark' ? 'gray.800' : 'white'} p={4} borderRadius="md" boxShadow="lg">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" stroke={colorMode === 'dark' ? 'white' : 'black'} />
          <YAxis stroke={colorMode === 'dark' ? 'white' : 'black'} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="priceUsd" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CryptoGraph;