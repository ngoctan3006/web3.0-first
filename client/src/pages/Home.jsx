import React, { useEffect, useState } from 'react';
import { useStateContext } from '../context';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    console.log(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (address) fetchCampaigns();
  }, [address, contract]);

  return <div>Home</div>;
};

export default Home;
