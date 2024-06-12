import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, useColorMode } from '@chakra-ui/react';

const CryptoGraph = () => {
  const [data, setData] = useState([]);
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.coincap.io/v2/assets/bitcoin/history?interval=m1');
        const result = await response.json();
        const formattedData = result.data.map(entry => ({
          time: new Date(entry.time).toLocaleTimeString(),
          priceUsd: parseFloat(entry.priceUsd),
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Fetch new data every minute

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (colorMode !== 'dark') {
      toggleColorMode();
    }
  }, [colorMode, toggleColorMode]);

  return (
    <Box width="100%" height="500px" bg="gray.800" p={4} borderRadius="md">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="priceUsd" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CryptoGraph;