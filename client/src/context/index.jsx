import {
  useAddress,
  useContract,
  useContractWrite,
  useMetamask,
} from '@thirdweb-dev/react';
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

  return (
    <StateContext.Provider
      value={{ address, connect, contract, createCampaign: publishCampaign }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
