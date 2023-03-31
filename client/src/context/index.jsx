import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
  useMetamask,
} from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { createContext, useContext } from 'react';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    '0xf59A1f8251864e1c5a6bD64020e3569be27e6AA9',
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    'createCampaign',
  );
  const { data } = useContractRead(contract, 'getCampaigns');

  console.log(data);
  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address,
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        form.image,
      ]);
      console.log('success', data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const getCampaigns = async () => {
    const campaigns = await contract.call('getCampaigns');

    return campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString(),
      ),
      image: campaign.image,
      pId: i,
    }));
  };

  return (
    <StateContext.Provider
      value={{
        address,
        connect,
        contract,
        getCampaigns,
        createCampaign: publishCampaign,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
